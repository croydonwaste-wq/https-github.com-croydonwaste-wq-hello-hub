import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Cloudflare Turnstile for the quote forms (bot check without picture puzzles).
 *
 * - Off until VITE_TURNSTILE_SITE_KEY is set, so nothing changes before it's configured.
 * - The script loads only when a visitor first interacts with a form, so page speed is unaffected.
 * - "interaction-only": invisible for almost everyone; a checkbox appears only if Cloudflare
 *   needs the visitor to confirm. The token is verified on the server (send-quote function).
 */
const SITE_KEY = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) || "";
const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let loading: Promise<Turnstile> | null = null;
function loadScript(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise<Turnstile>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    s.defer = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile_missing")));
    s.onerror = () => {
      loading = null; // allow a later retry
      reject(new Error("turnstile_blocked"));
    };
    document.head.appendChild(s);
  });
  return loading;
}

export const turnstileEnabled = Boolean(SITE_KEY);

export function useTurnstile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const token = useRef("");
  const waiters = useRef<((t: string) => void)[]>([]);
  const started = useRef(false);
  /** True only while Cloudflare is showing the "verify you are human" checkbox. */
  const [visible, setVisible] = useState(false);

  const settle = (t: string) => {
    token.current = t;
    waiters.current.splice(0).forEach((w) => w(t));
  };

  /** Load and render the (normally invisible) widget. Safe to call repeatedly. */
  const start = useCallback(() => {
    if (!SITE_KEY || started.current) return;
    started.current = true;
    loadScript()
      .then((ts) => {
        if (!containerRef.current || widget.current) return;
        widget.current = ts.render(containerRef.current, {
          sitekey: SITE_KEY,
          action: "quote",
          appearance: "interaction-only",
          theme: "light",
          size: "flexible",
          "response-field": false,
          "refresh-expired": "auto",
          callback: (t: string) => settle(t),
          "before-interactive-callback": () => setVisible(true),
          "after-interactive-callback": () => setVisible(false),
          "expired-callback": () => (token.current = ""),
          "error-callback": () => {
            settle("");
            return false; // let Turnstile retry by itself
          },
        });
      })
      .catch(() => {
        started.current = false;
        settle(""); // script blocked: the server will ask the visitor to retry or call
      });
  }, []);

  /** Resolves with a token, or "" if none arrives within `timeoutMs` (the server then explains). */
  const getToken = useCallback(
    (timeoutMs = 12000) => {
      if (!SITE_KEY) return Promise.resolve("");
      if (token.current) return Promise.resolve(token.current);
      start();
      return new Promise<string>((resolve) => {
        const timer = setTimeout(() => resolve(""), timeoutMs);
        waiters.current.push((t) => {
          clearTimeout(timer);
          resolve(t);
        });
      });
    },
    [start],
  );

  /** Tokens are single-use: get a fresh one after every submission attempt. */
  const reset = useCallback(() => {
    token.current = "";
    if (widget.current && window.turnstile) window.turnstile.reset(widget.current);
  }, []);

  useEffect(
    () => () => {
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    },
    [],
  );

  return { enabled: turnstileEnabled, visible, containerRef, start, getToken, reset };
}
