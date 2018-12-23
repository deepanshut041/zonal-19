import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {DOMAIN, ASSETS} from "./assets"
import { ConnectionErrorComponent } from './connection-error/connection-error.component';
import { LoaderComponent } from './loader/loader.component';
import { FormResultComponent } from './form-result/form-result.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PageNotFoundComponent, ConnectionErrorComponent, LoaderComponent, FormResultComponent]
})
export class SharedModule { }
