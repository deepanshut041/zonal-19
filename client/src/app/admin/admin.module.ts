import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatListModule, MatTreeModule, MatProgressBarModule, MatNativeDateModule, MatSidenavModule, MatExpansionModule, MatDatepickerModule, MatDialogModule, } from '@angular/material';
import { HomeComponent } from './admin/home/home.component';
import { CoordinatorsComponent } from './admin/coordinators/coordinators.component';
import { EventsComponent } from './admin/events/events.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MenuComponent } from './admin/menu/menu.component';
import { AdminService } from './admin.service';

@NgModule({
  imports: [
    CommonModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule, RecaptchaModule,
    MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatNativeDateModule, MatSelectModule, MatListModule,
    MatOptionModule, MatFormFieldModule, AdminRoutingModule, MatTreeModule, MatProgressBarModule, CdkTreeModule, MatSidenavModule,
    MatExpansionModule, MatDatepickerModule, MatDialogModule
  ],
  declarations: [AdminComponent, HomeComponent, CoordinatorsComponent, EventsComponent, MenuComponent],
  providers: [AdminService]
})
export class AdminModule { }
