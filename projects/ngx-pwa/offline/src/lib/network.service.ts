import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, fromEvent, of, merge, OperatorFunction, EMPTY } from 'rxjs';
import { catchError, mapTo, startWith } from 'rxjs/operators';

import { OFFLINE_ROUTE_OFFLINE, OFFLINE_ROUTE_UNAVAILABLE } from './tokens';

@Injectable({ providedIn: 'root' })
export class Network {

  static instance: Network | null = null;

  /** Observable to listen when Internet connection availability changes */
  onlineChanges: Observable<boolean>;

  /** Check if Internet connection is available */
  get online(): boolean {
    return isPlatformBrowser(this.platformId) ? navigator.onLine : true;
  }

  /** Do not use this method, use `catchOffline` function directly */
  static catchOffline<T>(): OperatorFunction<T, T> {

    return catchError<T, T>(Network.catchCallback);

  }

  protected static catchCallback<T>(error: any): Observable<T> {

    if (!Network.instance) {

      console.log(`You need to inject the Network service at least once, for example in your AppComponent constructor.`);

      throw error;

    } else if (!Network.instance.router) {

      console.log(`You need to import RouterModule.forRoot([]) in your application.`);

      throw error;

    } else {

      if (!Network.instance.online) {

        Network.instance.router.navigate([Network.instance.routeOffline]);

        return EMPTY;

      } else if (error.status && (error.status >= 500 && error.status < 600)) {

        Network.instance.router.navigate([Network.instance.routeUnavailable]);

        return EMPTY;

      } else {

        throw error;

      }

    }

  }

  constructor(
    @Optional() protected router: Router,
    @Inject(PLATFORM_ID) protected platformId: string,
    @Inject(OFFLINE_ROUTE_OFFLINE) protected routeOffline: string,
    @Inject(OFFLINE_ROUTE_UNAVAILABLE) protected routeUnavailable: string,
  ) {

    /* Store instance in a static property to allow access to injected services in the RxJS static operator
     * Should be done only once */
    if (!Network.instance) {

      Network.instance = this;

    }

    this.onlineChanges = !isPlatformBrowser(this.platformId) ? of(true) : merge(
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false)),
    )
    .pipe(startWith(this.online));

  }

}

/**
 * Catch offline errors (no Internet connection) and server errors (HTTP status 5xx)
 * and redirect to /offline or /unavailable page (routes can be changed via offlineProviders())
 */
export const catchOffline = Network.catchOffline;
