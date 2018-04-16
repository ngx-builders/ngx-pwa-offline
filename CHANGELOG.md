# Changelog

## 6.0.0-beta.4 (2018-04-16)

Same as v5.0.0-beta.7, plus:

### Breaking change

- Distribution files and directories of non-UMD packages have changed from official Angular Package Format v5 to APF v6. It should not affect your code, as building tools like webpack know where to find the new packages.

## 5.0.0-beta.7 (2018-04-12)

### Features

- `catchOffline` RxJS operator
- `OnlineGuard` for `canActivate`, `canActivateChild` and `canLoad`
- `online` to check online status with `Network` service
- `onlineChanges` to observe when online status changes with `Network` service
