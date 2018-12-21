import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AuthComponent, SignInComponent, SignUpComponent]
})
export class AuthModule { }
