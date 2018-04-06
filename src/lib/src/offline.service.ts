import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { catchError, filter, mapTo, startWith } from 'rxjs/operators';

import { OfflineConfig, OFFLINE_CONFIG_DEFAULT } from './offline-config';
import { OFFLINE_CONFIG_ROUTE_OFFLINE, OFFLINE_CONFIG_ROUTE_UNAVAILABLE, OFFLINE_CONFIG_GUARDS_REDIRECT } from './tokens';

@Injectable()
export class Offline implements CanActivate, CanActivateChild, CanLoad {

  static instance: Offline | null = null;
  connectionChanges: Observable<boolean>;

  get isOnline(): boolean {
    return isPlatformBrowser(this.platformId) ? navigator.onLine : true;
  }

  static catch<T>() {

    return catchError<T, T>(Offline.catchCallback);

  }

  protected static catchCallback<T>(error: any, caught: Observable<T>): Observable<T> {

    if (!Offline.instance) {

      console.log('You need to import OfflineModule in your AppModule AND to inject the Offline service in your AppComponent constructor.');

      throw error;

    } else {

      const cancel = caught.pipe(filter(() => false));

      if (!Offline.instance.isOnline) {

        Offline.instance.router.navigate([Offline.instance.routeOffline]);

        return cancel;

      } else if (error.status && (error.status >= 500 && error.status < 600)) {

        Offline.instance.router.navigate([Offline.instance.routeUnavailable]);

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
    @Inject(OFFLINE_CONFIG_GUARDS_REDIRECT) public guardsRedirect = OFFLINE_CONFIG_DEFAULT.guardsRedirect,
  ) {

    /* Store instance in a static property to allow access to injected services in the RxJS static operator */
    Offline.instance = this;

    this.initConnectionObservable();

  }

  canActivate() {
    return this.guard();
  }

  canActivateChild() {
    return this.guard();
  }

  canLoad() {
    return this.guard();
  }

  protected initConnectionObservable() {

    this.connectionChanges = !isPlatformBrowser(this.platformId) ? of(true) : merge(
      startWith(this.isOnline),
      fromEvent(document, 'online').pipe(mapTo(true)),
      fromEvent(document, 'offline').pipe(mapTo(false)),
    );

  }


  protected guard(): boolean {

    if (!this.isOnline) {

      if (this.guardsRedirect) {
        this.router.navigate([this.routeOffline]);
      }

      return false;

    }

    return true;

  }

}

export const catchOffline = Offline.catch;
