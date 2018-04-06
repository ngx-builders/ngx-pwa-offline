import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';

import { OFFLINE_CONFIG_ROUTE_OFFLINE, OFFLINE_CONFIG_GUARDS_REDIRECT } from './tokens';
import { OFFLINE_CONFIG_DEFAULT } from './offline-config';

@Injectable()
export class OfflineGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    protected router: Router,
    @Inject(PLATFORM_ID) protected platformId: string,
    @Inject(OFFLINE_CONFIG_ROUTE_OFFLINE) public routeOffline = OFFLINE_CONFIG_DEFAULT.routeOffline,
    @Inject(OFFLINE_CONFIG_GUARDS_REDIRECT) public guardsRedirect = OFFLINE_CONFIG_DEFAULT.guardsRedirect,
  ) {}

  protected isOffline(): boolean {

    if (isPlatformBrowser(this.platformId) && !navigator.onLine) {

      if (this.guardsRedirect) {
        this.router.navigate([this.routeOffline]);
      }

      return false;

    }

    return true;

  }

  canActivate() {
    return this.isOffline();
  }

  canActivateChild() {
    return this.isOffline();
  }

  canLoad() {
    return this.isOffline();
  }

}
