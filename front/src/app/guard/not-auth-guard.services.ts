import { Injectable }     from '@angular/core';
import { CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot }    from '@angular/router';
import {AuthService} from '../services/auth.service';
@Injectable()
export class NotAuthGuard implements CanActivate {
	
  canActivate() {
   if(!this.auth.loggedIn()) return true;
   else{
  
   this.router.navigate(['/']);
   	 return false;
   }
  }
  constructor(private auth:AuthService,private router:Router){

  }
}