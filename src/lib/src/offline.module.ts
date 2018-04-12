import { NgModule, ModuleWithProviders } from '@angular/core';

import { OFFLINE_CONFIG_ROUTE_OFFLINE, OFFLINE_CONFIG_ROUTE_UNAVAILABLE, OFFLINE_CONFIG_GUARDS_REDIRECT } from './tokens';
import { OfflineConfig } from './offline-config';

/**
 * This module must be imported only once in your AppModule (do NOT re-import it in submodules).
 * Just import OfflineModule for default configuration, or use OfflineModule.forRoot({}) for custom configuration.
 */
@NgModule()
export class OfflineModule {

  static forRoot(userConfig: OfflineConfig = {}): ModuleWithProviders {

    return {
      ngModule: OfflineModule,
      providers: [
        { provide: OFFLINE_CONFIG_ROUTE_OFFLINE, useValue: userConfig.routeOffline },
        { provide: OFFLINE_CONFIG_ROUTE_UNAVAILABLE, useValue: userConfig.routeUnavailable },
        { provide: OFFLINE_CONFIG_GUARDS_REDIRECT, useValue: userConfig.guardsRedirect },
      ]
    };

  }

}
