import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { ASSETS } from '../../../shared/assets';
import { EventListBgAnimationService } from './events-list.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  EVENT_BG_IMG = ASSETS + '/Events.svg'
  ID = '1'

  events:any[]

  constructor(private _mainService:MainService, private _evenListSevice:EventListBgAnimationService) { }

  ngOnInit() {
    var scene3d = document.getElementById("scene3d");
    this._evenListSevice.threeActivator(scene3d);

    this._mainService.getEvents().subscribe((events) => {
      this.events = events["results"]
      console.log(events)
    }, (err) => {
      console.log(err)
    })

  }

}
