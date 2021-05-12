import { Component } from '@angular/core';
import { Network } from '@ngx-pwa/offline';

@Component({
  selector: 'app-root',
  template: `
    <p>
      <ng-container *ngIf="online$ | async; else offline">Online</ng-container>
      <ng-template #offline>Offline</ng-template>
    </p>
    <router-outlet></router-outlet>
    <p><a routerLink="/">Back home</a></p>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  online$ = this.network.onlineChanges;

  constructor(private network: Network) {}

}
