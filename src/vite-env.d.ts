/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_FORM_ENDPOINT?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  /** Cloudflare Turnstile site key (public). Leave unset to keep Turnstile off. */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}
