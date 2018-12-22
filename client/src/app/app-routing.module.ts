import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { EventsComponent } from './main/events/events.component';
import { EventsListComponent } from './main/events/events-list/events-list.component';
import { EventsDetailsComponent } from './main/events/events-details/events-details.component';
import { ScheduleComponent } from './main/schedule/schedule.component';
import { TeamsComponent } from './main/teams/teams.component';
import { AuthComponent } from './auth/auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    {
      path: '', component: MainComponent, children: [
        {path: '', component: HomeComponent},
        {path: 'events', component: EventsComponent, children: [
          {path: '', component: EventsListComponent},
          {path: 'id', component: EventsDetailsComponent}
        ]},
    ]},
    { path: 'auth', component: AuthComponent, children: [
      {path: 'sign-in', component: SignInComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: '', redirectTo: 'sign-in', pathMatch: 'full'}
    ]},
    { path: '**', component: PageNotFoundComponent},
    { path: 'test', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
