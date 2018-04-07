import { NgModule, ModuleWithProviders } from '@angular/core';

import { Network } from './network.service';
import { OFFLINE_CONFIG_ROUTE_OFFLINE, OFFLINE_CONFIG_ROUTE_UNAVAILABLE, OFFLINE_CONFIG_GUARDS_REDIRECT } from './tokens';
import { OfflineConfig, OFFLINE_CONFIG_DEFAULT } from './offline-config';
import { OnlineGuard } from "./online.guard";

@NgModule({
  providers: [
    { provide: OFFLINE_CONFIG_ROUTE_OFFLINE, useValue: OFFLINE_CONFIG_DEFAULT.routeOffline },
    { provide: OFFLINE_CONFIG_ROUTE_UNAVAILABLE, useValue: OFFLINE_CONFIG_DEFAULT.routeOffline },
    { provide: OFFLINE_CONFIG_GUARDS_REDIRECT, useValue: OFFLINE_CONFIG_DEFAULT.guardsRedirect },
    Network,
    OnlineGuard,
  ]
})
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
