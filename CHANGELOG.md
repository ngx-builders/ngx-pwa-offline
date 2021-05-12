# Changelog

## 12.0.0 (2021-05-12)

### Feature

Supports and **requires** Angular 12.

No lib change.

## 11.1.0 (2021-01-21)

No code change, just rebuilt with Angular 11.1.

## 11.0.0 (2020-11-12)

### Feature

Supports and **requires** Angular 11.

No lib change.

## 10.0.0 (2020-06-25)

### Feature

Supports and **requires** Angular 10.

No lib change.

## 9.1.0 (2020-03-10)

### Feature

Add a new and more standard way to change lib options:

Now in version >= 9.1:
```typescript
import { OfflineModule } from '@ngx-pwa/offline';

@NgModule({
  imports: [
    OfflineModule.forRoot({
      routeOffline: '/oops/offline',
      routeUnavailable: '/oops/unavailable',
    })
  ]
})
export class AppModule {}
```

Previously in version < 9.1:
```typescript
import { offlineProviders } from '@ngx-pwa/offline';

@NgModule({
  providers: [
    offlineProviders({
      routeOffline: '/oops/offline',
      routeUnavailable: '/oops/unavailable',
    })
  ]
})
export class AppModule {}
```

The old way is still available but is now deprecated and will be removed in v10.

### Documentation

Fix an issue with `catchOffline` operator documentation where the wrong JSDoc
was displayed, wrongly indicating to not use it.

## 9.0.0 (2020-02-07)

To update: `npm install @ngx-pwa/offline@9`

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
