import { Component, OnInit } from '@angular/core';
import { ASSETS } from 'src/app/shared/assets';

@Component({
  selector: 'app-general-rules',
  templateUrl: './general-rules.component.html',
  styleUrls: ['./general-rules.component.css']
})
export class GeneralRulesComponent implements OnInit {

  EVENT_BG_IMG = ASSETS + '/event-list-bg.svg';

  constructor() { }

  ngOnInit() {
  }

}
