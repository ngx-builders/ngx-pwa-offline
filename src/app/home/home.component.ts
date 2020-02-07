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

  movies: unknown;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get<unknown[]>('/api/cinema/movies').pipe(catchOffline()).subscribe((data) => {
      this.movies = data;
    });

  }

}
