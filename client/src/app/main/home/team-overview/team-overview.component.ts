import { Component, OnInit } from '@angular/core';
import { ASSETS } from 'src/app/shared/assets';

@Component({
  selector: 'app-home-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.css']
})
export class TeamOverviewComponent implements OnInit {

  IMG = ASSETS + '/parashar_sir.jpg';
  IMG_1 = ASSETS + '/Eeshank Karanwal.jpg';
  IMG_2 = ASSETS + '/Kunal Rajpoot.jpg';
  IMG_3 = ASSETS + '/yash_saxena.jpg';
  IMG_4 = ASSETS + '/developer(deepanshu).jpg';
  IMG_5 = ASSETS + '/developer(sarthak).jpg';
  IMG_6 = ASSETS + '/developer(prabhanshu).jpg';
  BACKGROUND_IMG = ASSETS + '/teamBg.svg';
  BACKGROUND_MOBILE_IMG = ASSETS + '/aboutBackgroundMobile.svg';

  constructor() { }

  ngOnInit() {
  }

}
