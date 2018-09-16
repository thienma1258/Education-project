import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FrontRoutingModule } from './front-routing-module';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import {enableProdMode} from '@angular/core';
import {TestService} from './../services/test.service';
import {AuthService} from './../services/auth.service';

@NgModule({
  declarations: [

   ],
  imports: [
    HttpModule,
   FrontRoutingModule,
FormsModule
  ],
  providers: [AuthService,TestService],
  
  bootstrap: []
})
export class FrontModule { }
