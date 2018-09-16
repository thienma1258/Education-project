const Test=require('../../models/test');
const moment=require('moment-timezone');
const now=moment.tz('Asia/Ho_Chi_Minh');
const jwt=require('jsonwebtoken');
const config=require('../../config/config');
const algorthim=require('../../models/algorthim');

module.exports=function(router){
//Add new test
router.get('/alltestinformation',(req,res)=>{
	
		Test.find({state:0}).sort({createAt:1}).select("_id title createBy createAt Time category rules image totaljoin").exec((err,tests)=>{

			if(err) res.json({success:false,message:err});
			else{
				if(!tests) res.json({success:false,message:err});
				else{
						res.json({success:true,tests:tests});
				}
			}

		});


	});

router.use(['/newtest'],(req,res,next)=>{ 
   const token= req.headers['authorization'];

   if(!token){
    res.json({success:false ,message:"No Token provide"});
   }
   else{
  
        jwt.verify(token,config.secret,(err,decoded)=>{
      if(err) {
        res.json({success:false,message:"Token invalid"+err});
      }
      else{
      	if(decoded.permission===1) {
        req.decoded=decoded;
        next();
    }
    else{
    	res.json({success:false,message:"You don't have permission to go to this page"});
      }
    }

    });
   }
  });


	







	 router.use(['/jointest/:id','/testquestion','/submitanswer'],(req,res,next)=>{ 
   const token= req.headers['authorization'];

   if(!token){
    res.json({success:false ,message:"No Token provide"});
   }
   else{
  
        jwt.verify(token,config.secret,(err,decoded)=>{
      if(err) {
        res.json({success:false,message:"Token invalid"+err});
      }
      else{

        req.decoded=decoded;
        next();
      }

    });
   }
  });

	router.post("/newtest",function(req,res){
		//console.log(req.body);
		if(!req.body.title){
		//title
			res.json({success:false,message:"Please provided title"});

		}
		else if(!req.decoded.user){
//author
				res.json({success:false,message:"Please login and your must have permission"});
		}
		else if(!req.body.questions){
			
//provide the question for the test
			res.json({success:false,message:"You must provide the question for the tests"});
		}

		else{
		
			
			// if(!req.body.questions.question||!req.body.questions.answers||!req.body.questions.rightanswer){
			// res.json({success:false,message:"Please provide all information about question"});
			// }
			// else{
			const testtitle=req.body.title;
			const testcreate=req.decoded.user.username;
			console.log(req.decoded);
			let category1=0;
			let createAtnow=now.format();
			let startAt=false;
			if(req.body.startAt)
				startAt=req.body.startAt;
			if(req.body.category)
				category1=req.body.category;
			let time1=false;
			if(req.body.Time)
				time1=req.body.Time;
			let Rules=false;
			if(req.body.rules)
				Rules=req.body.rules;


			const test=new Test({
				title:testtitle,
				createBy:testcreate,
				questions:req.body.questions,
				category:category1,
				Time:time1,
				createAt:createAtnow,
				image:req.body.image,
				rules:Rules

							});
			
			
			test.save((err)=>{

				if(err) res.json({success:false,message:"Can't add new test because :"+err});
				else{
					 res.json({success:true,message:"ADD NEW TEST SUCCESS "});
				}

			})

		}



	});	
	
	router.get('/testdetail/:id',(req,res)=>{
		if(!req.params.id){
			res.json({success:false,message:"Please provide id"});
		}
		else{

			Test.findOne({_id:req.params.id}).select('_id title createBy createAt Time category rules level totaljoin joinBys image').exec((err,test)=>{

				if(err){
					res.json({success:false,message:err});
				}
				else{
					res.json({success:true,test:test});
				}

			});
		}	
	});
	router.put('/testquestion',(req,res)=>{
		if(!req.decoded.user){
res.json({success:false,message:"please login again"});
		}
		else{
Test.findOne({_id:req.body.id}).select('-joinBys -questions.rightanswer').exec((err,test)=>{
res.json({success:true,test:test});

		});
	}
})
	//join  test
	router.get('/jointest/:id',(req,res)=>{
		
		 if(!req.params.id){
res.json({success:false,message:"provide id your test"});
		}
		else{
Test.findOne({_id:req.params.id},(err,test)=>{
	if(err) res.json({success:false,message:"Cann't find your test you want"});
	if(test){
	var checkuser=null;
	if(test.joinBys.length!==0)
	 checkuser=algorthim.binarysearch(test.joinBys,req.decoded.user.id,0,test.joinBys.length);
	// Rules 1
	if(test.rules==false||test.rules==0){
		// Test can do any time
		
	if(checkuser===null){
		const user={
			User:req.decoded.user,
			
			_id:req.decoded.user.id
			};
	test.totaljoin+=1;
	
	test.joinBys.push(user);
		test.joinBys.sort(function (a, b)
    {
    	  return a._id === b._id ? 0 : a._id > b._id ? 1 : -1; 
    });
	test.save();
	res.json({success:true,message:"Success",user:user});
}

else{
	res.json({success:true,message:"Success",user:checkuser});
}
}
// Rules 2
else{
// TH: test just can do 1 time
// User never join test
if(checkuser===null){
		const user={
			User:req.decoded.user,
			
			_id:req.decoded.user.id
			};
	test.totaljoin+=1;
	
	test.joinBys.push(user);
		test.joinBys.sort(function (a, b)
    {
    	  return a._id === b._id ? 0 : a._id > b._id ? 1 : -1; 
    });
	test.save();
	res.json({success:true,message:"Success",user:user});
}
else{
	// User have join test 
		res.json({success:false,message:"You have join this test before"});
}
	}
	}
	// End find test
else{
	res.json({success:false,message:"Cann't find your test you want"});
}
		});

	}
});




	router.post('/submitanswer',(req,res)=>{

		if(!req.decoded.user){
res.json({success:false,message:"Please login again"});
		}
		else if(!req.body.id){
res.json({success:false,message:"provide id your test"});
		}
		else if(!req.body.answer){
res.json({success:false,message:"provide answer"});
		}
		else{

				Test.findOne({_id:req.body.id},(err,test)=>{
					if(err) res.json({success:false,message:err});

					let checkuser=null;
				
if(test.joinBys.length!==0){
  // check user already register

	 checkuser= algorthim.binarysearch(test.joinBys,req.decoded.user.id,0,test.joinBys.length);
	}
	//check see user has register to test
	 if(checkuser===null) res.json({success:false,message:"You must register in a previous page"});
					else{

						
					// Check and answer the score
						let score=0;
						let answer=[];
						let testanswer=req.body.answer;
						
						let totalright=0;
						for (var i = 0 ; i < test.questions.length; i++) {
							if(test.questions[i].typequestion===0){
								if(testanswer[i][test.questions[i].rightanswer]===true){
									score=score+(1/test.questions.length)*100;
									totalright++;
									answer[i]=true;
								}					
								else{
									answer[i]=test.questions[i].rightanswer;
								}			
							}
							else{


							}
						}
						
					score=Math.round(score*100)/100;
					res.json({success:true,score:score,user:checkuser,totalright:totalright,answer:answer});
					if(score>checkuser.Score||checkuser.Score==="false"){
					checkuser.Score=score;
						checkuser.answer=totalright;
					}
						test.save();
					
					
					}



				});

			
		}


	});

	return router;
}