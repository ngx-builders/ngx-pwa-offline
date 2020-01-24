import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unavailable',
  template: `
    <p>
      unavailable works!
    </p>
  `,
  styleUrls: ['./unavailable.component.css']
})
export class UnavailableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
