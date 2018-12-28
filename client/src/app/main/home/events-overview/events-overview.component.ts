import { Component, OnInit } from '@angular/core';
import { ASSETS } from 'src/app/shared/assets';

@Component({
  selector: 'app-home-events-overview',
  templateUrl: './events-overview.component.html',
  styleUrls: ['./events-overview.component.css']
})
export class EventsOverviewComponent implements OnInit {

  EVENT_IMG = ASSETS + '/Events.svg';

  constructor() { }

  ngOnInit() {
  }
  
}
