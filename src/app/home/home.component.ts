import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchOffline } from '@ngx-pwa/offline';

@Component({
  selector: 'app-home',
  template: `
    {{movies | json}}
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get<any[]>('/api/cinema/movies').pipe(catchOffline()).subscribe((data) => {
      this.movies = data;
    });

  }

}
