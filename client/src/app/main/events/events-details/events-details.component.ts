import { Component, OnInit } from '@angular/core';
import { MainService } from "../../main.service";
import { ActivatedRoute } from '@angular/router';
import { ASSETS } from 'src/app/shared/assets';


@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})
export class EventsDetailsComponent implements OnInit {
  event: any;
  EVENT_BG_IMG = ASSETS + '/event-list-bg.svg'
  EVENT_PG_IMG = ASSETS + '/Rules.svg'
  constructor(private _mainService: MainService, private activeRoute: ActivatedRoute) {

  }
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this._mainService.getEvent(params['id'])
          .subscribe((event) => {
            this.event = event;
            console.log(event);
          }, (err) => {
            console.log(err);
          });
      }
    })
  }
}
