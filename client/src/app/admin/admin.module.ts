import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatListModule, MatTreeModule, MatProgressBarModule, MatNativeDateModule, } from '@angular/material';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { FooterComponent } from './admin/footer/footer.component';
import { HomeComponent } from './admin/home/home.component';
import { CoordinatorsComponent } from './admin/coordinators/coordinators.component';
import { CoordinatorsListComponent } from './admin/coordinators/coordinators-list/coordinators-list.component';
import { CoordinatorDetailsComponent } from './admin/coordinators/coordinator-details/coordinator-details.component';
import { AddCoordinatorComponent } from './admin/coordinators/add-coordinator/add-coordinator.component';
import { EventsComponent } from './admin/events/events.component';
import { EventsListComponent } from './admin/events/events-list/events-list.component';
import { EventDetailsComponent } from './admin/events/event-details/event-details.component';
import { AddEventComponent } from './admin/events/add-event/add-event.component';
import { CdkTreeModule } from '@angular/cdk/tree';

@NgModule({
  imports: [
    CommonModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule, RecaptchaModule,
    MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatNativeDateModule, MatSelectModule, MatListModule,
    MatOptionModule, MatFormFieldModule, AdminRoutingModule, MatTreeModule, MatProgressBarModule, CdkTreeModule
  ],
  declarations: [AdminComponent, NavbarComponent, FooterComponent, HomeComponent, CoordinatorsComponent, CoordinatorsListComponent, CoordinatorDetailsComponent, AddCoordinatorComponent, EventsComponent, EventsListComponent, EventDetailsComponent, AddEventComponent]
})
export class AdminModule { }
