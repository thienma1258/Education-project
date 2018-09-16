import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
 import { tokenNotExpired } from 'angular2-jwt';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
@Injectable()
export class AuthService {
	doamin="http://localhost:8080";
  authToken;
  user;
  options;

  constructor(private http:Http) { 
  this.checkpermission();
  }
  createAuthentiocationHeaders(){
    this.loadToken();
    this.options=new RequestOptions({
      headers:new Headers({
        // 'content-type':'application/json',
        'authorization':this.authToken
      })
    });

   
  }
   loggedIn() {
  return tokenNotExpired();
}
  loadToken(){
  const token=  localStorage.getItem('token');
  this.authToken=token;
  }
  
  logout(){
    this.authToken=null;
     localStorage.clear();
  }
  registerUser(user){
  	return this.http.post(this.doamin+"/authentication/register",user).map(res=> res.json());
  	
  }
  loginUser(user){
    return this.http.post(this.doamin+"/authentication/login",user).map(res=> res.json());
  }
 checkusername(username){
  	return this.http.get(this.doamin+"/authentication/checkUsername/"+username).map(res=> res.json());
  }
   checkEmail(email){
  	return this.http.get(this.doamin+"/authentication/checkEmail/"+email).map(res=> res.json());
  }
  storeUserData(token,user){
    localStorage.setItem('token',token);
     this.authToken=token;
  }
  getProfile(){
    this.createAuthentiocationHeaders();
    return this.http.get(this.doamin+"/authentication/profile",this.options).map(res=>res.json());
  }
  upploadimage(image){
  this.options=new RequestOptions({
      headers:new Headers({
        // 'content-type':'multipart/form-data',
        'authorization':this.authToken
      })
    });

    var formData = new FormData();
     formData.append("file",  image);
  return this.http.post(this.doamin+"/userchange-image",formData,this.options).map(res=>res.json());
  }

  checkpermission():Observable<boolean>{

    this.createAuthentiocationHeaders();
    return this.http.get(this.doamin+'/authentication/checkpermission',this.options).map(res=>res.json());

  }
}





