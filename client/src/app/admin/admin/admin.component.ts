import { Component, OnInit } from '@angular/core';
import { ASSETS } from 'src/app/shared/assets';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  BG_IMG = ASSETS + '/admin-bg.svg';
  opened: boolean;

  constructor() { }

  ngOnInit() {
    this.opened = true;
  }

}
