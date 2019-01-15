import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainModule } from './main/main.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ScrollTopService } from './scroll-top.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, MainModule, AuthModule, SharedModule,
  ],
  providers: [ScrollTopService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
