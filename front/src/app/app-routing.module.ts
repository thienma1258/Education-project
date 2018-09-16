import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AdminGuard} from './guard/admin-guard.services';

import {AuthGuard} from './guard/auth-guard.service';
const appRoutes: Routes = [
     {path:'admin' ,loadChildren:'app/admin/admin.module#AdminModule'},
    {path:'' ,loadChildren:'app/front/front.module#FrontModule'},
   
             
 
];
@NgModule({
  declarations: [

  ],
  imports: [RouterModule.forRoot(appRoutes),BrowserModule],
  providers: [AuthGuard,AdminGuard],
  bootstrap: [],
  exports:[RouterModule]
})
export class AppRoutingModule{ }