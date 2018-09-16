import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loading=true;
  constructor(public authServices:AuthService) { 
  
  	}

  ngOnInit() {
  this.loading=false;
  }
  logOut(){
    this.loading=true;
  	this.authServices.logout();
    setTimeout(()=>{
      this.loading=false;

  }    ,2000);
  

}
}