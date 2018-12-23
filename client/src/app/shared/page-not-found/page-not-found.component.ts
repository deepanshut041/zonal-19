import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  PAGENOTFOUND = '/assets/404 Error-02.svg';

  constructor() { }

  ngOnInit() {
  }

}
