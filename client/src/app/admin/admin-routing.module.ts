import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './admin/home/home.component';
import { CoordinatorsComponent } from './admin/coordinators/coordinators.component';
import { CoordinatorsListComponent } from './admin/coordinators/coordinators-list/coordinators-list.component';
import { CoordinatorDetailsComponent } from './admin/coordinators/coordinator-details/coordinator-details.component';
import { EventsComponent } from './admin/events/events.component';
import { EventDetailsComponent } from './admin/events/event-details/event-details.component';
import { EventsListComponent } from './admin/events/events-list/events-list.component';
import { AddCoordinatorComponent } from './admin/coordinators/add-coordinator/add-coordinator.component';
import { AddEventComponent } from './admin/events/add-event/add-event.component';


const routes: Routes = [
  { path: '', component: AdminComponent, children : [
    {path: '', component: HomeComponent},
    { path: 'coordinator', component: CoordinatorsComponent, children: [
      {path: '', component: CoordinatorsListComponent},
      {path: ':id', component: CoordinatorDetailsComponent}
    ]},
    {path: 'add-coordinator', component: AddCoordinatorComponent},
    {path: 'events', component: EventsComponent, children: [
      {path: '', component: EventsListComponent},
      {path: ':id', component: EventDetailsComponent}
    ]},
    {path: 'add-event', component: AddEventComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
