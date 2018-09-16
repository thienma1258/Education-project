import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {TestService} from '../../../services/test.service';
import {AuthService} from '../../../services/auth.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-testdetail',
  templateUrl: './testdetail.component.html',
  styleUrls: ['./testdetail.component.css']
})
export class TestdetailComponent implements OnInit {
	id;
	detailtest;
	messageClass;
message;
timezone;
  constructor(private auth:AuthService,private activiRouter:ActivatedRoute,private testservices:TestService,private router:Router) {

this.timezone=moment;

   }
  jointest(){

  	this.testservices.jointest(this.id).subscribe(data=>{
  		if(data.success){
  			this.messageClass="alert alert-success";
  			this.message="Please wait 2s to test";
  			setTimeout(()=>{
  				this.router.navigate(['/maketest/'+this.id]);
  			},2000)
  		}
  		else{
  			this.messageClass="alert alert-danger";
  			this.message=data.message;
  		}
  	});


  }
  ngOnInit() {
	this.id=this.activiRouter.snapshot.params['id'];
	if(!this.id){
		this.router.navigate(['/']);
	}
	else{
	
	this.testservices.getdetailtest(this.id).subscribe(data=>{
		if(data.success){

			this.detailtest=data.test;
			console.log(this.detailtest);
			console.log(this.detailtest.image);
			if(typeof this.detailtest.image =="undefined")
			this.detailtest.image="http://localhost:8080/images/resize/1501911354652testdefault.jpg";
			this.detailtest.joinBys.sort(function(a,b){
					return b.Score-a.Score;
			});
			if(this.detailtest.category===0){

			}
			else if(this.detailtest.category===1){

			}
			else if(this.detailtest.category===2){

			}
			else if(this.detailtest.category===3){
				this.detailtest.category="Math";
			}
			if(this.detailtest.level===0){
				this.detailtest.level="Easy";
			}
			else if(this.detailtest.level===1){
				this.detailtest.level="Normal";
			}
			else if(this.detailtest.level===2){
					this.detailtest.level="Hard";
			}
			if(this.detailtest.rules===false||this.detailtest.rules==0){
				this.detailtest.rules="Do any time you want and we will track your highscore";
			}
			else if(this.detailtest.rules==1)
			{
				this.detailtest.rules="You just have only change to do test";
			}
			
		}
		else{
		this.auth.logout();
		
		this.router.navigate(['/login']);

		}

	});
}
  }

}
