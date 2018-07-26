# Changelog

## 6.0.0 (2018-07-26)

### Features

- `catchOffline` RxJS operator
- `OnlineGuard` for `canActivate`, `canActivateChild` and `canLoad`
- `online` to check online status with `Network` service
- `onlineChanges` to observe when online status changes with `Network` service

## 6.0.0-rc.2 (2018-07-23)

### Feature

- Full support of official [Angular Package Format v6](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit)

### Breaking change

- Distribution files and directories have been changed to match
official [Angular Package Format v6](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit).
It affects your code only if you were manually loading UMD bundles,
otherwise building tools like Angular CLI / webpack know where to find the files.

## 5.0.0-beta.10 (2018-04-21)

As Angular 6 is now released, we'll drop the developement of the v5 branch. But the lib should still work in Angular 5 by doing:
- `npm install @ngx-pwa/offline@5.0.0-beta.10`
- import `OfflineModule` in your `AppModule`
