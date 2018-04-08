export interface OfflineConfigFinal {
  /** Full URL of the page to redirect to when Internet connection is unavailable (default: '/offline') */
  routeOffline: string;
  /** Full URL of the page to redirect to when the server is unavailable (default: '/unavailable') */
  routeUnavailable: string;
  /**
   * Tells guards to redirect to the offline page when Internet connection is unavailable (default: true)
   * or to just block the navigation
   */
  guardsRedirect: boolean;
}

export interface OfflineConfig extends Partial<OfflineConfigFinal> {}

export const OFFLINE_CONFIG_DEFAULT: OfflineConfigFinal = {
  routeOffline: '/offline',
  routeUnavailable: '/unavailable',
  guardsRedirect: true
};
