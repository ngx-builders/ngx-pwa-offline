import { Component } from '@angular/core';
import { Offline } from '@ngx-pwa/offline';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  meaning: number;
  constructor(offline: Offline) {
  }
}
