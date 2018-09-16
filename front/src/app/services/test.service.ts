import { Injectable } from '@angular/core';
import {Http,RequestOptions,Headers} from '@angular/http';
import {AuthService} from './auth.service';
import "rxjs/add/operator/map";
@Injectable()
export class TestService {
	domain="http://localhost:8080/";

 
  constructor(public http:Http,private auth:AuthService) { }
  getalltest(){
   
  	return this.http.get(this.domain+"Test/alltestinformation").map(res=>res.json());
  }
  addnewtest(test){
    this.auth.createAuthentiocationHeaders();
    return this.http.post(this.domain+"Test/newtest",test,this.auth.options).map(res=>res.json());
  }
  getdetailtest(id){
     this.auth.createAuthentiocationHeaders();
  	return this.http.get(this.domain+"Test/testdetail/"+id,this.auth.options).map(res=>res.json());
  }
	getquestion(id){
    this.auth.createAuthentiocationHeaders();
   let req={
     id:id

   }
    return this.http.put(this.domain+"Test/testquestion",req,this.auth.options).map(res=>res.json());
  }
  submitanswer(answer,id){
    this.auth.createAuthentiocationHeaders();
    let req={
      answer:answer,
      id:id
    }
    return this.http.post(this.domain+"Test/submitanswer",req,this.auth.options).map(res=>res.json());
  }

  jointest(id){
    this.auth.createAuthentiocationHeaders();
   return this.http.get(this.domain+"Test/jointest/"+id,this.auth.options).map(res=>res.json());
    
  }
  uppimage(image){
 this.auth.options=new RequestOptions({
      headers:new Headers({
        // 'content-type':'multipart/form-data',
        'authorization':this.auth.authToken
      })
    });

    var formData = new FormData();
     formData.append("file",  image);
    return this.http.post(this.domain+"titleimage",formData,this.auth.options).map(res=>res.json());
  }


}
