import { Component, OnInit } from '@angular/core';
import { ASSETS } from 'src/app/shared/assets';

@Component({
  selector: 'app-home-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

    CONTACT_US = ASSETS + '/ContactUs.svg';
    CONTACT_BG_IMG = ASSETS + '/map-bg.png';

  constructor() { }

  ngOnInit() {
  }

}
