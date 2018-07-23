import { InjectionToken, Provider } from '@angular/core';

export const OFFLINE_ROUTE_OFFLINE = new InjectionToken<string>('offline-config-route-offline', {
  providedIn: 'root',
  factory: () => '/offline'
 });
export const OFFLINE_ROUTE_UNAVAILABLE = new InjectionToken<string>('offline-config-route-unavailable', {
  providedIn: 'root',
  factory: () => '/unavailable'
 });
export const OFFLINE_GUARDS_REDIRECT = new InjectionToken<boolean>('offline-config-guards-redirect', {
  providedIn: 'root',
  factory: () => true
 });

export interface OfflineProvidersConfig {
  /** Full URL of the page to redirect to when Internet connection is unavailable (default: '/offline') */
  routeOffline?: string;
  /** Full URL of the page to redirect to when the server is unavailable (default: '/unavailable') */
  routeUnavailable?: string;
  /**
   * Tells guards to redirect to the offline page when Internet connection is unavailable (default: true)
   * or to just block the navigation
   */
  guardsRedirect?: boolean;
}

export function offlineProviders(config: OfflineProvidersConfig): Provider[] {

  return [
    config.routeOffline ? { provide: OFFLINE_ROUTE_OFFLINE, useValue: config.routeOffline }  : [],
    config.routeUnavailable ? { provide: OFFLINE_ROUTE_UNAVAILABLE, useValue: config.routeUnavailable } : [],
    config.guardsRedirect === false ? { provide: OFFLINE_GUARDS_REDIRECT, useValue: false } : [],
  ];

}
