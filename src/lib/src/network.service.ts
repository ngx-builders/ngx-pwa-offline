import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, fromEvent, of, merge, OperatorFunction } from 'rxjs';
import { catchError, filter, mapTo, startWith } from 'rxjs/operators';

import { OFFLINE_CONFIG_DEFAULT } from './offline-config';
import { OFFLINE_CONFIG_ROUTE_OFFLINE, OFFLINE_CONFIG_ROUTE_UNAVAILABLE } from './tokens';

@Injectable()
export class Network {

  static instance: Network | null = null;

  /** Observable to listen when Internet connection availability changes */
  onlineChanges: Observable<boolean>;

  /** Check if Internet connection is available */
  get online(): boolean {
    return isPlatformBrowser(this.platformId) ? navigator.onLine : true;
  }

  /** Do not use this method, use `catchOffline` function directly */
  static catch<T>() {

    return catchError<T, T>(Network.catchCallback);

  }

  protected static catchCallback<T>(error: any, caught: Observable<T>): Observable<T> {

    if (!Network.instance) {

      console.log(`You need to import OfflineModule in your AppModule
      AND to inject the Network service at least once, for example in your AppComponent constructor.`);

      throw error;

    } else {

      const cancel = caught.pipe(filter(() => false));

      if (!Network.instance.online) {

        Network.instance.router.navigate([Network.instance.routeOffline]);

        return cancel;

      } else if (error.status && (error.status >= 500 && error.status < 600)) {

        Network.instance.router.navigate([Network.instance.routeUnavailable]);

        return cancel;

      } else {

        throw error;

      }

    }

  }

  constructor(
    protected router: Router,
    @Inject(PLATFORM_ID) protected platformId: string,
    @Inject(OFFLINE_CONFIG_ROUTE_OFFLINE) protected routeOffline = OFFLINE_CONFIG_DEFAULT.routeOffline,
    @Inject(OFFLINE_CONFIG_ROUTE_UNAVAILABLE) protected routeUnavailable = OFFLINE_CONFIG_DEFAULT.routeUnavailable,
  ) {

    /* Store instance in a static property to allow access to injected services in the RxJS static operator
     * Should be done only once */
    if (!Network.instance) {

      Network.instance = this;

    }

    this.initOnlineObservable();

  }

  protected initOnlineObservable() {

    this.onlineChanges = !isPlatformBrowser(this.platformId) ? of(true) : merge(
      startWith(this.online),
      fromEvent(document, 'online').pipe(mapTo(true)),
      fromEvent(document, 'offline').pipe(mapTo(false)),
    );

  }

}

/**
 * Catch offline errors (no Internet connection) and server errors (HTTP status 5xx)
 * and redirect to /offline or /unavailable page (routes can be changed in the OfflineModule)
 */
export const catchOffline = Network.catch;
