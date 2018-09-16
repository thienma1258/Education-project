import { Injectable }     from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot,
  RouterStateSnapshot }    from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	redirectUrl;
  canActivate( router:ActivatedRouteSnapshot, previous:RouterStateSnapshot):boolean {
   if(this.auth.loggedIn()) return true;
   else {
   	this.redirectUrl=previous.url;
   	this.router.navigate(['/login']);
   	return false;

   }
  }
  constructor(private auth:AuthService,private router:Router){

  }

  
}