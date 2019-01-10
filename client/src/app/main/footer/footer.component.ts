import { Component, OnInit } from '@angular/core';
import { ASSETS } from 'src/app/shared/assets';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  LOGO = ASSETS + '/akg-logo.png';

  constructor() { }

  ngOnInit() {
  }

}
