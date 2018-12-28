import { Component, OnInit } from '@angular/core';
import { LandingPageService } from './landing-page.service';
import * as THREE from 'three';
import { ASSETS } from 'src/app/shared/assets';

@Component({
  selector: 'app-home-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private _landingPage:LandingPageService) { }

  MOUNTAINS_IMG = ASSETS + '/mountains.svg';
  MOBILE_MOUNTAINS_IMG = ASSETS + '/mobileMountains.svg';

  ngOnInit() {
    var scene3d = document.getElementById("scene3d");
    this._landingPage.threeActivator(scene3d)
  }


}
