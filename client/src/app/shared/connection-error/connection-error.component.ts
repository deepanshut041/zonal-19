import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connection-error',
  templateUrl: './connection-error.component.html',
  styleUrls: ['./connection-error.component.css']
})
export class ConnectionErrorComponent implements OnInit {

  CONNECTION_ERROR = '/assets/500 Eror-01.svg';

  constructor() { }

  ngOnInit() {
  }

}
