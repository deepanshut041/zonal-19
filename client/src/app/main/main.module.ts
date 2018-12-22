import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { EventsOverviewComponent } from './home/events-overview/events-overview.component';
import { TeamOverviewComponent } from './home/team-overview/team-overview.component';
import { EventsComponent } from './events/events.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventsDetailsComponent } from './events/events-details/events-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LandingPageComponent,
    EventsOverviewComponent,
    TeamOverviewComponent,
    EventsComponent,
    EventsListComponent,
    EventsDetailsComponent
  ]
})
export class MainModule { }
