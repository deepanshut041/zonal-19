import { Component, OnInit } from '@angular/core';
import { ASSETS } from 'src/app/shared/assets';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  SI_LOGO = ASSETS + '/silogo.svg';

  constructor() { }

  ngOnInit() {
  }

}
