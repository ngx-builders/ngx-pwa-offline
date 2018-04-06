export interface OfflineConfigFinal {
  routeOffline: string;
  routeUnavailable: string;
  guardsRedirect: boolean;
}

export interface OfflineConfig extends Partial<OfflineConfigFinal> {}

export const OFFLINE_CONFIG_DEFAULT: OfflineConfigFinal = {
  routeOffline: '/offline',
  routeUnavailable: '/unavailable',
  guardsRedirect: true
};
