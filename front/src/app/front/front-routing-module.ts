import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HomeComponent} from './component/home/home.component';
import { ReversePipe } from './pipe/reverse.pipe';
import {OrderByPiPe} from './pipe/orderby.pipe';
import {LimitPipe} from './pipe/limit.pipe';
import {TestdetailComponent} from './component/testdetail/testdetail.component';
import {MaketestComponent} from './component/maketest/maketest.component';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import {AuthGuard} from '../guard/auth-guard.service';
import {PipeModule} from '../Pipe.module';
import {NavbarComponent} from './component/navbar/navbar.component';
import {FooterComponent} from './component/footer/footer.component';
const appRoutes: Routes = [
     { path: '' , component: NavbarComponent, outlet: 'header'},
     { path: '' , component: FooterComponent, outlet: 'footer'},
   { path: '', component: HomeComponent },
   {path :'testdetail/:id',component:TestdetailComponent,canActivate:[AuthGuard]},
   {path :'maketest/:id',component:MaketestComponent,canActivate:[AuthGuard]},
    {path :'login',component:LoginComponent},
      {path :'register',component:RegisterComponent},

   {path:'**' ,redirectTo:'/'}

];
@NgModule({
  declarations: [
  HomeComponent,  
  TestdetailComponent,
  MaketestComponent,
  LoginComponent,
  RegisterComponent,
NavbarComponent,
FooterComponent
  ],
  imports: [RouterModule.forChild(appRoutes),CommonModule,FormsModule,ReactiveFormsModule,PipeModule],
  providers: [],
  bootstrap: [],
  exports:[RouterModule]
})
export class FrontRoutingModule{ }