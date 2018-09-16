import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {TestService} from '../../../services/test.service';

import * as $ from 'jquery';
import * as clock from 'angular-flipclock';
@Component({
  selector: 'app-maketest',
  templateUrl: './maketest.component.html',
  styleUrls: ['./maketest.component.css']
})
export class MaketestComponent implements OnInit {
id;
test;
allyouranswer;
messageclass;
message;
timeout;
title;
score;
time;
showscript;
lastScore;
user;
modal;
loading;
totalright;
rightanswer;
finish;
  constructor(private activiRouter:ActivatedRoute,private testservices:TestService,private router:Router ) { 


  }
clickcheck(i,j){
	// this.allyouranswer[i][h] check xem if ai chon se bat len thanh true va chuyen ve server so sanh vs dap an
	if(this.allyouranswer[i][j]!==true)
		if(this.test.questions[i].typequestion===0){
			this.allyouranswer[i]=new Array();
	this.allyouranswer[i][j]=true;
}
	else{
		this.allyouranswer[i][j]=false;
	}
}
goback(){
	this.router.navigate(['/testdetail/'+this.id]);
}
isUndefined(){

	return typeof this.rightanswer==='undefined';

}
checkanswer(i){
	if(!this.isUndefined()){
		return  this.rightanswer[i]===true? true:false;
	}

}
typeanswer(i,j){
	//check xem if your question is right return true or return false;
	if(!this.isUndefined()){
		if(this.rightanswer[i]===true) return true;
	for (var m =  0; m <this.rightanswer[i].length; m++) {
		if(this.rightanswer[i][m]==j){ 
			return true;
		}
	}
	return false;
}
}
javascript(){




}
submit(){
	if(this.finish===true) return alert("Your has finish your test");
	this.loading=true;
	this.testservices.submitanswer(this.allyouranswer,this.id).subscribe(data=>{
		if(data.success){
			
			this.messageclass="alert alert-success";
			this.message="Submit answer success please wait a minutes to get your point";
		 
		 	this.user=data.user.User;
		 	this.score=data.score;
		 	this.lastScore=data.user.Score;
		 	this.totalright=data.totalright;
		 	this.rightanswer=data.answer;
		 	//console.log(this.rightanswer);
		 	clearInterval(this.timeout);
		 	$('#showbutton').click();
		 	this.loading=false;
		 	this.finish=true;
		 	
		}
		else{
			this.messageclass="alert alert-danger";
			this.message=data.message;
			this.router.navigate(['/login']);
			this.loading=false;
		}
	});
	


}
  ngOnInit() {
  	this.finish=false;


  	this.id=this.activiRouter.snapshot.params['id'];
	if(!this.id){
		this.router.navigate(['/']);

	}
	else{
	this.loading=true;
	this.testservices.getquestion(this.id).subscribe(data=>{
		if(data.success){
			this.test=data.test;
			
			
			this.allyouranswer=new Array();
			for (var i =0 ; i < this.test.questions.length; i++) {
					this.allyouranswer[i]=new Array();	

					}
						this.loading=false;
						this.time=new Array();
						if(this.test.Time===false){

							this.time[0]=0;
							this.time[1]=0;
							this.time[2]=0;
							
							this.timeout=setInterval(()=>{
								this.time[0]++;
								if(this.time[0]===60){
									this.time[1]++;
									this.time[0]=0;
								}
								if(this.time[1]===60){
									this.time[2]++;
									this.time[1]=0;
								
								}
								

							},1000);
						}
					else{
						setTimeout(()=>{

					alert("Your out off time");
					this.submit();
						},1000*60*this.test.Time)

							let time=parseInt(this.test.Time);
							this.time[2]=this.test.Time/60;
							this.time[2]=parseInt(this.time[2]);
							//console.log(this.time[2]);
							this.time[1]=this.test.Time%60;
							this.time[0]=0;
							this.timeout=setInterval(()=>{
								this.time[0]--;
								if(this.time[0]===-1){
									this.time[1]--;
									this.time[0]=59;

								}
								if(this.time[1]===-1){
									this.time[2]--;
									this.time[1]=59;
								}



							},1000);








						}





				}
			
		else{
			this.messageclass="alert alert-danger";
			this.message=data.message;
			
			this.loading=false;
		}

	});

  }

}
}
