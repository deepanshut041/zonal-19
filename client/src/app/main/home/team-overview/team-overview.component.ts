import { Component, OnInit } from '@angular/core';
import { ASSETS } from 'src/app/shared/assets';

@Component({
  selector: 'app-home-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.css']
})
export class TeamOverviewComponent implements OnInit {

  IMG = ASSETS + '/Events.svg';
  IMG_4 = ASSETS + '/developer(deepanshu).jpg';
  IMG_5 = ASSETS + '/developer(sarthak).jpg';
  IMG_6 = ASSETS + '/developer(prabhanshu).jpg';
  BACKGROUND_IMG = ASSETS + '/teamBg.svg';
  BACKGROUND_MOBILE_IMG = ASSETS + '/aboutBackgroundMobile.svg';

  constructor() { }

  ngOnInit() {
  }

}
