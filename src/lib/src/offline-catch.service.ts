import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError, filter } from 'rxjs/operators';

import { OfflineConfig, OFFLINE_CONFIG_DEFAULT } from './offline-config';
import { OFFLINE_CONFIG_ROUTE_OFFLINE, OFFLINE_CONFIG_ROUTE_UNAVAILABLE } from './tokens';

@Injectable()
export class OfflineCatch {

  static instance: OfflineCatch = null;

  static catch<T>() {

    return catchError<T, T>(OfflineCatch.catchCallback);

  }

  protected static catchCallback<T>(error: any, caught: Observable<T>) {

    if (!OfflineCatch.instance) {

      console.log('You need to import OfflineModule in your AppModule AND to inject the Offline service in your AppComponent constructor.');

      throw error;

    } else {

      const cancel = caught.pipe(filter(() => false));

      if (isPlatformBrowser(OfflineCatch.instance.platformId) && !navigator.onLine) {

        OfflineCatch.instance.router.navigate([OfflineCatch.instance.routeOffline]);

        return cancel;

      } else if (error.status && (error.status >= 500 && error.status < 600)) {

        OfflineCatch.instance.router.navigate([OfflineCatch.instance.routeUnavailable]);

        return cancel;

      } else {

        throw error;

      }

    }

  }

  constructor(
    public router: Router,
    @Inject(PLATFORM_ID) public platformId: string,
    @Inject(OFFLINE_CONFIG_ROUTE_OFFLINE) public routeOffline = OFFLINE_CONFIG_DEFAULT.routeOffline,
    @Inject(OFFLINE_CONFIG_ROUTE_UNAVAILABLE) public routeUnavailable = OFFLINE_CONFIG_DEFAULT.routeUnavailable,
  ) {
    OfflineCatch.instance = this;
  }

}

export const catchOffline = OfflineCatch.catch;
