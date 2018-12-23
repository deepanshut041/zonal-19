import { Component, OnInit } from '@angular/core';
import { MainService } from "../../main.service";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})
export class EventsDetailsComponent implements OnInit {
  event: any
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
