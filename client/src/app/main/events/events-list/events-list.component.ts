import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  events:any[]

  constructor(private _mainService:MainService) { }

  ngOnInit() {
    this._mainService.getEvents().subscribe((events)=>{
      this.events = events
      console.log(events)
    }, (err)=>{
      console.log(err)
    })
  }

}
