# Angular Offline

RxJS operator and other utils catching offline errors in Angular apps.

## Angular onsite training

The author of this library organizes Angular courses (based in Paris, France, but open to travel). You can find [my bio here](https://www.cyrilletuzi.com/en/web/) (in English) and [course details here](https://formationjavascript.com/formation-angular/) (in French).

## Why this lib?

You know the [Angular `async` pipe](https://angular.io/guide/pipes#the-impure-asyncpipe), right? Amazing tool, but there is one big issue with it:
by letting Angular automatically subscribing and unsubscribing your `Observable` or `Promise`, you can't handle the error callback.

Problem is: in a web app, especially in a Progressive Web App (PWA),
a lot of your `Observable` or `Promise` are about HTTP requests,
and they will inevitably fail when the user is offline (or the server is inaccessible).

So if you want to get the benefice of the `async` pipe without breaking your app, you need to catch offline errors on every page. Painful.

So here it is: a RxJS operator catching offline errors for you, so you can use the `async` pipe everywhere!

There are also other tools for offline management, like guards.

## Getting started

During beta, Angular 5 is required (Angular 4 LTS support will be available when final).

**Install with npm** or another package manager:

```bash
npm install angular-offline
```

Then **import the `OfflineModule` module in your app root module** (just once, do *NOT* re-import it in your submodules).

```typescript
import { OfflineModule } from 'angular-offline';

@NgModule({
  imports: [
    BrowserModule,
    OfflineModule,
    ...
  ]
  ...
})
export class AppModule {}
```

Then you just have to **inject the `Offline` service *just once* in `AppComponent`** :

```typescript
import { Offline } from 'angular-offline';

@Component()
export class AppComponent {

  constructor(protected offline: Offline) {}

}
```

You won't use the service itself, but this step is required to setup the service. If you have an idea to avoid this step, feel free to contribute in [the related issue](https://github.com/cyrilletuzi/angular-offline/issues/1).

## Catching offline errors

### RxJS operator

Just **use the `catchOffline` RxJS operator**:

```typescript
import { catchOffline } from 'angular-offline';

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

### Redirecting

By default, `catchOffline` will redirect to:

- `/offline` if the user is offline (no Internet connection),
- `/unavailable` if the service is inaccessible (5xx HTTP errors).

If you want to change the redirection URLs, just configure the module:

```typescript
@NgModule({
  imports: [
    OfflineModule.forRoot({ routeOffline: '/oops/offline', routeUnavailable: '/oops/unavailable' })
  ]
})
export class AppModule {}
```

You need to provide the full URL, so *the leading `/` is required*.

## Guards

Guards catching offline errors are also available, for `CanActivate`, `CanActivateChild` and `CanLoad`. For example:

```typescript
import { OfflineGuard } from 'angular-offline';

const routes: Routes = [
  { path: 'some-page', component: SomePageComponent, canActivate: [OfflineGuard] }
];
```

By default, guards will redirect to the `/offline` page. If you just want to block the navigation, you can configure the module:
```typescript
@NgModule({
  imports: [
    OfflineModule.forRoot({ guardsRedirect: false })
  ]
})
export class AppModule {}
```

## Angular support

This lib major version is aligned to the major version of Angular. Meaning for Angular 4 you need version 4,
for Angular 5 you need version 5, and so on.

When final, this lib will follow [Angular LTS support](https://github.com/angular/angular/blob/master/docs/RELEASE_SCHEDULE.md),
meaning we support Angular 4 minimum, until October 2018.

This module supports [AoT pre-compiling](https://angular.io/guide/aot-compiler).

This module supports [Universal server-side rendering](https://github.com/angular/universal).

## Changelog

[Changelog available here](https://github.com/cyrilletuzi/angular-offline/blob/master/CHANGELOG.md).

## License

MIT
