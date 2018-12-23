import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatSelectModule, MatOptionModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule, RecaptchaModule,
    MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatSelectModule,
    MatOptionModule, MatFormFieldModule, AdminRoutingModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
