import { NgModule, ModuleWithProviders } from '@angular/core';

import { Network } from './network.service';
import { OFFLINE_ROUTE_OFFLINE, OFFLINE_ROUTE_UNAVAILABLE, OFFLINE_GUARDS_REDIRECT } from './tokens';
import { OnlineGuard } from './online.guard';

/**
 * This module must be imported only once in your AppModule (do NOT re-import it in submodules).
 */
@NgModule({
  providers: [
    { provide: OFFLINE_ROUTE_OFFLINE, useValue: '/offline' },
    { provide: OFFLINE_ROUTE_UNAVAILABLE, useValue: '/unavailable' },
    { provide: OFFLINE_GUARDS_REDIRECT, useValue: true },
    Network,
    OnlineGuard,
  ]
})
export class OfflineModule {}
