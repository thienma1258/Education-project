import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing-module';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {TestService} from './../services/test.service';
@NgModule({
  declarations: [

   ],
  imports: [
    HttpModule,
   AdminRoutingModule,
FormsModule
  ],
  providers: [AuthService,TestService],
  bootstrap: []
})
export class AdminModule { }
