import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpModule} from '@angular/http';
import {AuthService} from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
