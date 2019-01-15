import { Component } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { ScrollTopService } from './scroll-top.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  constructor(private router: Router, private scrollTopService:ScrollTopService) {
  }
  ngOnInit() {
    this.scrollTopService.setScrollTop();
  }
}
