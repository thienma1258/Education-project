import { Component, OnInit,Inject } from '@angular/core';
import {HomeComponent} from '../home/home.component';
import {AuthService} from '../../services/auth.service';
import {Router,ActivatedRoute,RouterStateSnapshot} from '@angular/router';
import {AuthGuard} from '../../guard/auth-guard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { DOCUMENT } from '@angular/platform-browser';
import * as $ from 'jquery';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	form:FormGroup;
	image="http://localhost:8080/images/undefined.png";
	user;
	message;
	messageClass;
  loading=false;
  constructor(private auth:AuthService,private router:Router,private activirouter:ActivatedRoute,private guard:AuthGuard) { }
	onChange(event){
  			 const file=event.srcElement.files[0];
  			 this.auth.upploadimage(file).subscribe(data=>{
  			 	if(data.success){
  			 		setTimeout(()=>{
this.image="http://localhost:8080/images/resize/"+data.message;
  			 		},1000);
  			 		
  			 	}
  			 	else{

  			 	}

  			 });
  	}
        
  ngOnInit() {
  	  this.auth.getProfile().subscribe(data=>{
  	  	if(data.success){
           this.loading=true;
  	this.user=data.user;
  	this.image="http://localhost:8080/"+this.user.image;
  }
  else{


 this.guard.redirectUrl=this.router.routerState.snapshot.url;
 		this.router.navigate(['/login']);

  }
  	});

  }
 
    
  }


