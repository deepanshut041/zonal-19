import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './admin/home/home.component';
import { EventsComponent } from './admin/events/events.component';


const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'events', component: EventsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
