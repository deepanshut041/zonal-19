import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  updateForm: FormGroup
  events:any[]


  constructor(private _adminService: AdminService) { }

  ngOnInit() {
    this._adminService.getEvents().subscribe((events)=>{
      this.events = events["results"]
      console.log(events)
    }, (err)=>{
      console.log(err)
    })
  }

}
