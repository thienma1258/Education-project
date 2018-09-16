import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';  
import {TestService} from '../../services/test.service';

@Component({
  selector: 'app-newtest',
  templateUrl: './newtest.component.html',
  styleUrls: ['./newtest.component.css']
})
export class NewtestComponent implements OnInit {
	form:FormGroup;
	level;
	category;
	defaultimage="http://localhost:8080/images/resize/1501911354652testdefault.jpg";
	rules;
	type;
  message;
  messageClass;
	testquestion:any;	
  constructor(private formBuilder:FormBuilder,private testServices:TestService) { }

  ngOnInit() {
  	this.CreateForm();
  }
onSubmitForm(){

if(!this.form.valid)
return alert("please fill about information we need");
else{

  let test={
    title:this.form.get('title').value,
    category:this.form.get('typecategory').value,
    rules:this.form.get('typerules').value===0?false:this.form.get('typerules').value,
    questions:this.form.get('questions').value,
    level:this.form.get('typelevel').value,
    Time:this.form.get('times').value,
    image:this.form.get('titleimage').value,
  }
  console.log(test);
  this.testServices.addnewtest(test).subscribe(data=>{
     if(data.success){
       this.message=data.message;
       this.messageClass="alert alert-success";
     }
     else{
   this.message=data.message;
       this.messageClass="alert alert-danger";
     }


  })
}


}
  onChange(event){
  	const file=event.srcElement.files[0];
  	this.testServices.uppimage(file).subscribe(data=>{

  		if(data.success){

  			setTimeout(()=>{
  				 this.form.get('titleimage').setValue("http://localhost:8080/images/resize/"+data.message);
  			},1000);
  		}
  		else{
  			alert("Upp image fail");
  		}

  	});

  }
generateanswer(){

	this.testquestion.answers=new Array();
	this.testquestion.rightanswer=0;
	let totalquestion=this.testquestion.countanswer;
	if( totalquestion==undefined) {
		return alert("Please choose how many answer you want");
	}
	
	for (var i = 1;i<=totalquestion ; i++) {
		this.testquestion.answers.push(" ");
	}
	

}

  validatetitle(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9  \u0080-\u9fff]+$/);
    // Test title against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid title
    } else {
      return { 'validatetitle': true } // Return as invalid title
    }
  }


validatenumber(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[0-9]+$/);
    // Test title against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid title
    } else {
      return { 'validatenumber': true } // Return as invalid title
    }
  }
ChangeTypequestion(event){
this.type=event.srcElement.value;


}
typetimechange(){
	this.form.get('times').setValue(0);
}
AddnewQuestion(){
	
		var fromBuildergroup=this.formBuilder.group({
    typequestion:[this.type,Validators.required],
    question:[this.testquestion.question,Validators.required],
    rightanswer:[this.testquestion.rightanswer,Validators.required],
    answers:[this.testquestion.answers,Validators.required]


  });
   
	if(fromBuildergroup.valid){
	this.questions.push(fromBuildergroup);

	this.testquestion=new Object();
	//this.answerarray=new Array();
}
else{
  return alert("Please fill all the information");
}
}
get questions(){
	return <FormArray>this.form.get("questions");
}
config(){
	 this.form.get('titleimage').setValue(this.defaultimage);
	 this.type=0;
	this.testquestion=new Object();
	
	this.testquestion.answers=new Array();
}
trackByFn(index: any, item: any) {
   return index;
}
checkrightanswer(answer,rightanswer){
  if(answer==rightanswer) return true;
  return false;
}
  CreateForm(){

  	this.level=new Array();
  	this.level.push("Easy");
  	this.level.push("Normal");
  	this.level.push("Hard");
  	this.category=new Array();
  	this.category.push("History");
  	this.category.push("LOL");
  	this.category.push("FO3");
  	this.category.push("Math");
  	this.rules=new Array();
	this.rules.push("Do any time your want and we will track your highest score");
  	this.rules.push("Just can only change to do test ");
    this.form = this.formBuilder.group({
      title: ['',Validators.compose([Validators.required,this.validatetitle,
      	Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(50), // Maximum length is 30 characters

      	])],
      typelevel:["",Validators.required],
      typecategory:["",Validators.required],
      titleimage:["",Validators.required],
      time:["",Validators.required],
  	typerules:["",Validators.required],
  	times:["",Validators.compose([this.validatenumber,Validators.required])],
  	questions :this.formBuilder.array([],Validators.required),

  });
   this.config();
}

     
  

}
