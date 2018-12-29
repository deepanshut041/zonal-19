import { Component, OnInit } from '@angular/core';
import { ASSETS } from 'src/app/shared/assets';

@Component({
  selector: 'app-home-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  ABOUT_IMG = ASSETS + '/about.svg';
  BACKGROUND_IMG = ASSETS + '/aboutBackground.svg';
  BACKGROUND_MOBILE_IMG = ASSETS + '/aboutBackgroundMobile.svg';
  constructor() { }

  ngOnInit() {
  }

}
