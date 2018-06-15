import { Component } from '@angular/core';
import { Network } from '@ngx-pwa/offline';

@Component({
  selector: 'demo-app',
  template: `test`
})
export class AppComponent {
  constructor(protected network: Network) {

    this.network.onlineChanges.subscribe((online) => {
      console.log(online);
    });

  }
}
