import { Component } from '@angular/core';
import { Offline } from '@ngx-pwa/offline';

@Component({
  selector: 'integration-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  meaning: number;
  constructor(offline: Offline) {
  }
}
