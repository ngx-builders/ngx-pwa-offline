import { InjectionToken } from '@angular/core';

import { OFFLINE_CONFIG_DEFAULT } from './offline-config';

export const OFFLINE_CONFIG_ROUTE_OFFLINE = new InjectionToken<string>('offline-config-route-offline', {
  providedIn: 'root',
  factory: () => OFFLINE_CONFIG_DEFAULT.routeOffline
 });
export const OFFLINE_CONFIG_ROUTE_UNAVAILABLE = new InjectionToken<string>('offline-config-route-unavailable', {
  providedIn: 'root',
  factory: () => OFFLINE_CONFIG_DEFAULT.routeUnavailable
 });
export const OFFLINE_CONFIG_GUARDS_REDIRECT = new InjectionToken<boolean>('offline-config-guards-redirect', {
  providedIn: 'root',
  factory: () => OFFLINE_CONFIG_DEFAULT.guardsRedirect
 });
