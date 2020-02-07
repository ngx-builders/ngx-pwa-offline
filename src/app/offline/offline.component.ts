import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offline',
  template: `
    <p>
      offline works!
    </p>
  `,
  styleUrls: ['./offline.component.css']
})
export class OfflineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
