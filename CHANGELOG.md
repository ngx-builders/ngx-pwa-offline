# Changelog

## 6.0.0-rc.1 (2018-06-15)

Note: we are confident with this release to be used with Angular 6 final. But as we may switch to the new official CLI library generation, we're staying in Release Candidate until then to avoid any unexpected breaking change.
Additionally, tests must be added before a final release.

### Bug fix

- `onlineChanges` now works (fixes [#3](https://github.com/cyrilletuzi/ngx-pwa-offline/issues/3))

## 6.0.0-rc.0 (2018-05-04)

### Features

- `catchOffline` RxJS operator
- `OnlineGuard` for `canActivate`, `canActivateChild` and `canLoad`
- `online` to check online status with `Network` service
- `onlineChanges` to observe when online status changes with `Network` service

## 5.0.0-beta.10 (2018-04-21)

As Angular 6 is now released, we'll drop the developement of the v5 branch. But the lib should still work in Angular 5 by doing:
- `npm install @ngx-pwa/offline@5.0.0-beta.10`
- import `OfflineModule` in your `AppModule`
