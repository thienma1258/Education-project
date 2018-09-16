import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import {HomeComponent} from './home/home.component';
import {AuthGuard} from '../guard/auth-guard.service';
import {AdminGuard} from '../guard/admin-guard.services';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {NewtestComponent} from './newtest/newtest.component';
const appRoutes: Routes = [
     { path: '' , component: NavbarComponent, outlet: 'header'},
     { path: '' , component: FooterComponent, outlet: 'footer'},
      { path: '' , component: HomeComponent,canActivate:[AuthGuard]},
      { path: 'newtest' , component: NewtestComponent,canActivate:[AdminGuard,AuthGuard]},
];
@NgModule({
  declarations: [
HomeComponent,
NavbarComponent,
FooterComponent,
NewtestComponent


  ],
  imports: [RouterModule.forChild(appRoutes),CommonModule,FormsModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [],
  exports:[RouterModule]
})
export class AdminRoutingModule{ }