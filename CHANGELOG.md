# Changelog

## 6.0.0-beta.7 (2018-04-21)

Same as v5.0.0-beta.10, plus:

### Breaking change

- `OfflineModule` no longer required and so removed (delete the import in your `AppModule`).

- Distribution files and directories of non-UMD packages have changed from official [Angular Package Format v5](https://docs.google.com/document/d/1tdgcvdLKsYPHlgNBppGFrsaA1eINLxJi9C8KkyrH2sI) to [APF v6](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs). It should not affect your code, as building tools like webpack know where to find the new packages.

## 5.0.0-beta.10 (2018-04-21)

- New config system: `offlineProviders` instead of `OfflineModule.forRoot()`, to be consistent with changes in v6. See README.

## 5.0.0-beta.7 (2018-04-12)

### Features

- `catchOffline` RxJS operator
- `OnlineGuard` for `canActivate`, `canActivateChild` and `canLoad`
- `online` to check online status with `Network` service
- `onlineChanges` to observe when online status changes with `Network` service
