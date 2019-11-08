# Changelog

## 9.0.0-rc.1 (2019-11-09)

To update: `npm install @ngx-pwa/offline@next`

### Feature

- Support for Angular 9

### Bug fix

- Typing issue related to RxJS

## 6.2.0 (2019-05-29)

### Feature

- Allow Angular 8 in `peerDependencies`

## 6.1.0 (2018-10-19)

### Feature

- Allow Angular 7 in `peerDependencies`

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
