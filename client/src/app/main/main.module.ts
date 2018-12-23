import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatSelectModule, MatOptionModule, MatFormFieldModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Core components
import { MainComponent } from './main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

// HomeComponents
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { EventsOverviewComponent } from './home/events-overview/events-overview.component';
import { TeamOverviewComponent } from './home/team-overview/team-overview.component';

// Events Component
import { EventsComponent } from './events/events.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventsDetailsComponent } from './events/events-details/events-details.component';

// Register Components
import { RegsiterComponent } from "./register/register.component";

import { MainService } from "./main.service";


@NgModule({
  imports: [
    CommonModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule,
     MatButtonModule, MatCheckboxModule, MatInputModule, BrowserAnimationsModule, MatIconModule, MatSelectModule, MatOptionModule, MatFormFieldModule
  ],
  declarations: [
    MainComponent, NavbarComponent, FooterComponent, HomeComponent, LandingPageComponent, EventsOverviewComponent,
    TeamOverviewComponent, EventsComponent, EventsListComponent, EventsDetailsComponent, RegsiterComponent
  ],
  providers:[MainService,]
})
export class MainModule { }
