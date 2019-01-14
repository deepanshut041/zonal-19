import { Component } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  constructor(private router:Router){
  }
  ngOnInit() {
}
}
