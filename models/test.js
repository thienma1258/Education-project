

const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let titleLengthchecker = (title) => {
  // Check if e-mail exists
  if (!title) {
    return false; // Return error
  } else {
    // Check the length of e-mail string
    if (title.length < 5 || title.length > 50) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid e-mail
    }
  }
};
let alphanumberChecker=(value)=>{
	if(!value){
		return false;
	}
	else{
		const regExp=new RegExp('/^[a-zA-Z0-9_]+$');
		return regExp.text(value);
	}
}


const Alphanumbercheck=[
{
	validator:alphanumberChecker,
	message:"That mustn't have any special characters"
}
]

const validatatitle=[

{
	validator:titleLengthchecker,
	message:"Title at least 5 characters but no more than 50"

},
{
	validator:alphanumberChecker,
	message:"Title mustn't have any special characters"
}
];



const testSchema=new Schema({
	title:{type:String,required:true,validator:validatatitle},
	image:{type:String},
	createBy:{type:String,required:true},
	createAt:{type:String,required:true},
	level:{type:Number,default:0},

	questions:[
	{
		question:{type:String,required:true},
		typequestion:{type:Number,default:0},
		answers:[{type:String,validator:Alphanumbercheck}],
		rightanswer:[{type:String,validator:Alphanumbercheck,required:true}]
	}
	],
	totaljoin:{type:Number,default:0},
	rules:{type:Schema.Types.Mixed,default:false},
	joinBys:[
	{
	
	User:{type:Schema.Types.Mixed},
	Score:{type:String,default:0},
	answer:{type:Number,default:0}
	}
	],
	category:{type:Number,default:0},
	Time:{type:Schema.Types.Mixed,default:false},
	state:{type:Number,default:0}

});
module.exports=mongoose.model('Test',testSchema);