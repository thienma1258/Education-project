import { Component, OnInit } from '@angular/core';
import {TestService} from '../../../services/test.service';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	domain="http://localhost:8080/";
	tests;
	timezone;
	start;
	end;
  loading=false;
  populartest
  constructor(private Tests:TestService) {
  	this.timezone=moment;
  	this.start=0;
  	this.end=5;
	   }
checkundefined(value){
 
  if(typeof value== "undefined"){
return true;


  } 
    return false;


}
  ngOnInit() {
  	this.Tests.getalltest().subscribe(res=>{
  		
  		if(!res.success){
  			console.log(res.message);
        this.loading=false;
  		}
  		else{
  		this.tests=res.tests;
      this.populartest=new Array();
      this.populartest.push(this.tests[0])
       for (var i =1; i<this.tests.length; i++) {
        this.populartest.push(this.tests[i]);

     }   
     this.populartest.sort(function(a,b){
       return b.totaljoin-a.totaljoin;
     })
     this.loading=true;
		}
  	});




  }

}
