

// multer
const multer=require('multer');
const uppload=multer({storage: multer.memoryStorage(),  limits: { fileSize: 1024*1024 }});
const fs = require('fs');
const Jimp = require("jimp");
const jwt=require('jsonwebtoken');
const config=require('../config/config');
const User=require('../models/user.js');
const async = require('async');
module.exports=function(app){
var MAGIC_NUMBERS = {
    jpg: 'ffd8ffe0',
    jpg1: 'ffd8ffe1',
    png: '89504e47',
    gif: '47494638'
}

 app.use(['/userchange-image'],(req,res,next)=>{ 
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

// for parsing multipart/form-data
function checkMagicNumbers(magic) {
    if (magic == MAGIC_NUMBERS.jpg || magic == MAGIC_NUMBERS.jpg1 || magic == MAGIC_NUMBERS.png || magic == MAGIC_NUMBERS.gif) return true
}
app.post('/uppload-image',uppload.single('file'),(req,res)=>{
    	var buffer = req.file.buffer;
        var magic = buffer.toString('hex', 0, 4);
        var filename = Date.now() + req.file.originalname;
        if (checkMagicNumbers(magic)) {
            fs.writeFile('./public/images/' + filename, buffer, 'binary', function(err) {
                if (err) throw err
                else{
            
                	res.json({success:true,message:"Upp load success",image:filename});
                }
            });
        } else {
            res.json({success:false,message:"File is not valid"});
        }

});

function uppimage(req,res,callback){
    var buffer = req.file.buffer;
        var magic = buffer.toString('hex', 0, 4);
        var filename = Date.now() + req.file.originalname;
        if (checkMagicNumbers(magic)) {
            fs.writeFile('./public/images/' + filename, buffer, 'binary', function(err) {
                if (err) console.log(err);
                else{
      Jimp.read("./public/images/"+filename).then(function (lenna) {
            lenna.resize(256, 256)            // resize 
         .quality(100)                 // set JPEG quality           
         .write("./public/images/resize/"+filename); // save 
        }).catch(function (err) {
                
                callback(null,2,req,res);
            });
           
            callback(null,filename,req,res);
                }
            })
        } else {
            
            callback(null,1,req,res);
        }
};
function callback(err,filename,req,res){
  
    if(filename==1){
       res.json({success:false,message:"File is not valid"});
    }
    else if(filename==2){

 res.json({success:false,message:"Upp image doesn't success"});
    } else{  
   User.findOne({_id:req.decoded.user.id},(err,user)=>{
if(err) res.json({success:false,message:"Upp image doesn't success"});
else{

    user.image="images/resize/"+filename;
    user.save();
  res.json({success:true,message:filename});
  }
   });
 }


}
function titlechange(err,filename,req,res){
  res.json({success:true,message:filename});
}
app.post('/userchange-image',uppload.single('file'),(req,res)=>{
  uppimage(req,res,callback);

});
app.post('/titleimage',uppload.single('file'),(req,res)=>{
  uppimage(req,res,titlechange);

})










            
           

			





	return app;
}