# Angular PWA Offline
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

RxJS operator and other utils catching offline errors in Angular apps and PWA.

# FORK

This repo is maintained beacause the author of https://github.com/cyrilletuzi/ngx-pwa-offline decided to remove the code.

## Why this lib?

You know the [Angular `async` pipe](https://angular.io/guide/pipes#the-impure-asyncpipe), right? Amazing tool, but there is one big issue with it:
by letting Angular automatically subscribing and unsubscribing your `Observable` or `Promise`, you can't handle the error callback.

Problem is: in a web app, especially in a Progressive Web App (PWA),
a lot of your `Observable` or `Promise` are about HTTP requests,
and they will inevitably fail when the user is offline (or the server is inaccessible).

So if you want to get the benefice of the `async` pipe without breaking your app, you need to catch offline errors on every page. Painful.

So here it is: a RxJS operator catching offline errors for you, so you can use the `async` pipe everywhere!

There are also other tools for offline management, like online status helpers and guards.

## Getting started

**Install with npm** or another package manager:

```bash
npm i @ngx-builders/pwa-offline
# Angular 13
npm install @ngx-pwa/offline@13

```

Then you just have to **inject the `Network` service *at least once***, for example in `AppComponent`:

```typescript
import { Network } from '@ngx-builders/pwa-offline';

@Component()
export class AppComponent {

  constructor(protected network: Network) {}

}
```

Note: you may not use the service itself and just the RxJS operator, but an injection is required in all cases to setup the service.

## Catching offline errors

### RxJS operator

Just **use the `catchOffline` RxJS operator**:

```typescript
import { catchOffline } from '@ngx-builders/pwa-offline';

@Component({
  selector: 'some-page',
  template: `
    <presentation-component [data]="data$ | async"></presentation-component>
  `
})
export class SomePageComponent implements OnInit {

  data$: Observable<Data>;

  constructor(protected someService: SomeService) {}

  ngOnInit() {

    this.data$ = this.someService.getData().pipe(catchOffline());

  }

}
```

As it may cause a redirection, your app must use Angular router (`RouterModule.forRoot()`).

### Redirecting

By default, `catchOffline` will redirect to:

- `/offline` if the user is offline (no Internet connection),
- `/unavailable` if the service is inaccessible (5xx HTTP errors).

Note: creating the corresponding routes and components in your app is up to you,
as the lib can't decide the content and design of these pages for you.

If you want to change the redirection URLs:

```typescript
import { OfflineModule } from '@ngx-builders/pwa-offline';

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

Note: you need to provide the full URL, so *the leading `/` is required*.

## Online status

### Static check

To check online status at some point:

```typescript
import { Network } from '@ngx-builders/pwa-offline';

@Component({
  template: `
    <online-component *ngIf="online"></online-component>
    <offline-component *ngIf="!online"></offline-component>
  `
})
export class SomePageComponent implements OnInit {

  online = this.network.online;

  constructor(protected network: Network) {}

}
```

### Observable check

To observe when online status changes:

```typescript
import { Network } from '@ngx-builders/pwa-offline';

@Component({
  template: `
    <online-component *ngIf="online$ | async; else offline"></online-component>
    <ng-template #offline>
      <offline-component></offline-component>
    </ng-template>
  `
})
export class SomePageComponent implements OnInit {

  online$ = this.network.onlineChanges;

  constructor(protected network: Network) {}

}
```

Notes:
- as usual in Angular, do *not* use the `async` pipe twice on the same `Observable`. The example above shows you how to manage those situations in the proper way,
- this `Observable` does *not* auto-complete. Then you should either use the `async` pipe as above for automatic unsubscription, either you should unsubscribe manually (in `ngOnDestroy` method in most cases),
- be aware the online status is provided by the browser and it is not always reliable: for example,
if your computer is connected to a network but with no Internet access,
the browser will still says it's online.

## Guards

Guards catching offline errors are also available, for `CanActivate`, `CanActivateChild` and `CanLoad`. For example:

```typescript
import { OnlineGuard } from '@ngx-builders/pwa-offline';

const routes: Routes = [
  { path: 'some-page', component: SomePageComponent, canActivate: [OnlineGuard] }
];
```

By default, guards will redirect to the `/offline` page (so your app must use Angular router: `RouterModule.forRoot()`).
If you just want to block the navigation:

```typescript
import { OfflineModule } from '@ngx-builders/pwa-offline';

@NgModule({
  imports: [
    OfflineModule.forRoot({ guardsRedirect: false })
  ]
})
export class AppModule {}
```

## Angular support

This lib supports the last stable version of Angular.

This module supports [AoT pre-compiling](https://angular.io/guide/aot-compiler) and Ivy.

This module supports [Universal server-side rendering](https://github.com/angular/universal).


## License

MIT

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://omkark.bio.link"><img src="https://avatars.githubusercontent.com/u/88308267?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Omkar kulkarni</b></sub></a><br /><a href="https://github.com/ngx-builders/ngx-pwa-offline/commits?author=Omkar0114" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!