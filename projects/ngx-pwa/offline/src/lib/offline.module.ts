import { NgModule, ModuleWithProviders } from '@angular/core';

import { OfflineProvidersConfig, OFFLINE_ROUTE_OFFLINE, OFFLINE_ROUTE_UNAVAILABLE, OFFLINE_GUARDS_REDIRECT } from './tokens';

/**
 * This module does not contain anything, it's only useful to provide options via `.forRoot()`.
 */
@NgModule()
export class OfflineModule {

  /**
   * Only useful to provide options, otherwise it does nothing.
   * **Must be used at initialization, ie. in `AppModule`, and must not be loaded again in another module.**
   *
   * @example
   * NgModule({
   *   imports: [OfflineModule.forRoot({
   *     routeOffline: '/custom/offline',
   *     routeUnavailable: '/custom/unavailable',
   *   })]
   * })
   * export class AppModule
   */
  static forRoot(config: OfflineProvidersConfig): ModuleWithProviders<OfflineModule> {
    return {
      ngModule: OfflineModule,
      providers: [
        config.routeOffline ? { provide: OFFLINE_ROUTE_OFFLINE, useValue: config.routeOffline }  : [],
        config.routeUnavailable ? { provide: OFFLINE_ROUTE_UNAVAILABLE, useValue: config.routeUnavailable } : [],
        config.guardsRedirect === false ? { provide: OFFLINE_GUARDS_REDIRECT, useValue: false } : [],
      ],
    };
  }

}
