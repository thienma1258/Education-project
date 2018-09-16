import { Injectable }     from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot,
  RouterStateSnapshot }    from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
	redirectUrl;
  permission=false;
  canActivate( next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
return this.auth.checkpermission().map(e=>{

if(e['success']) return true;
else{
  alert("Your don't have permission");
  this.router.navigate(['/']);
}
})
  }
  constructor(private auth:AuthService,private router:Router){

  }

  
}