import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatStepperModule, MatCardModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SharedModule } from "../shared/shared.module";

// Recpatcha
import { RecaptchaModule } from 'ng-recaptcha';

// Core components
import { MainComponent } from './main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

// HomeComponents
import { HomeComponent } from './home/home.component';
import { EventsOverviewComponent } from './home/events-overview/events-overview.component';
import { TeamOverviewComponent } from './home/team-overview/team-overview.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { ScheduleOverviewComponent } from './home/schedule-overview/schedule-overview.component';

// Events Component
import { EventsComponent } from './events/events.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventsDetailsComponent } from './events/events-details/events-details.component';

// Register Components
import { RegisterComponent } from './register/register.component';

import { MainService } from './main.service';
import { LandingPageService } from './home/landing-page/landing-page.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgwWowModule } from 'ngx-wow';



@NgModule({
  imports: [
    CommonModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule, RecaptchaModule, FontAwesomeModule,
     MatButtonModule, MatCheckboxModule, MatInputModule, BrowserAnimationsModule, MatIconModule, MatStepperModule, MatCardModule,
     MatSelectModule, MatOptionModule, MatFormFieldModule, SharedModule, NgwWowModule
  ],
  declarations: [
    MainComponent, NavbarComponent, FooterComponent, HomeComponent, LandingPageComponent, EventsOverviewComponent,
    TeamOverviewComponent, EventsComponent, EventsListComponent, EventsDetailsComponent, RegisterComponent, ScheduleOverviewComponent
  ],
  providers:[MainService,LandingPageService]
})
export class MainModule { }
