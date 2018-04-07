import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, CanActivateChild, CanLoad } from '@angular/router';

import { OFFLINE_CONFIG_DEFAULT } from './offline-config';
import { OFFLINE_CONFIG_ROUTE_OFFLINE, OFFLINE_CONFIG_GUARDS_REDIRECT } from './tokens';
import { Network } from './network.service';

@Injectable()
export class OnlineGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    protected router: Router,
    protected network: Network,
    @Inject(OFFLINE_CONFIG_ROUTE_OFFLINE) protected routeOffline = OFFLINE_CONFIG_DEFAULT.routeOffline,
    @Inject(OFFLINE_CONFIG_GUARDS_REDIRECT) protected guardsRedirect = OFFLINE_CONFIG_DEFAULT.guardsRedirect,
  ) {}

  canActivate() {
    return this.guard();
  }

  canActivateChild() {
    return this.guard();
  }

  canLoad() {
    return this.guard();
  }


  protected guard(): boolean {

    if (!this.network.online) {

      if (this.guardsRedirect) {
        this.router.navigate([this.routeOffline]);
      }

      return false;

    }

    return true;

  }

}
