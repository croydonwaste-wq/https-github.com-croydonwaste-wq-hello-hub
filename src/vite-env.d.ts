/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_FORM_ENDPOINT?: string;
  /** Google Tag Manager container, e.g. "GTM-XXXXXXX". Unset = no tag manager, no consent banner. */
  readonly VITE_GTM_ID?: string;
}
