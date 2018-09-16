const User=require('../../models/user.js');
const jwt=require('jsonwebtoken');
const config=require('../../config/config');
module.exports=function(router){
	 router.post('/register', (req, res) => {
    // Check if email was provided
    if (!req.body.email) {
      res.json({ success: false, message: 'You must provide an e-mail' }); // Return error
    } else {
      // Check if username was provided
      if (!req.body.username) {
        res.json({ success: false, message: 'You must provide a username' }); // Return error
      } else {
        // Check if password was provided
        if (!req.body.password) {
          res.json({ success: false, message: 'You must provide a password' }); // Return error
        } else {
          // Create new user object and apply user input
          let user = new User({
            email: req.body.email.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password: req.body.password
          });
          // Save user to database
          user.save((err) => {
            // Check if error occured
            if (err) {
              // Check if error is an error indicating duplicate account
              if (err.code === 11000) {
                res.json({ success: false, message: 'Username or e-mail already exists' }); // Return error
              } else {
                // Check if error is a validation rror
                if (err.errors) {
                  // Check if validation error is in the email field
                  if (err.errors.email) {
                    res.json({ success: false, message: err.errors.email.message }); // Return error
                  } else {
                    // Check if validation error is in the username field
                    if (err.errors.username) {
                      res.json({ success: false, message: err.errors.username.message }); // Return error
                    } else {
                      // Check if validation error is in the password field
                      if (err.errors.password) {
                        res.json({ success: false, message: err.errors.password.message }); // Return error
                      } else {
                        res.json({ success: false, message: err }); // Return any other error not already covered
                      }
                    }
                  }
                } else {
                  res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
                }
              }
            } else {
              res.json({ success: true, message: 'Acount registered!' }); // Return success
            }
          });
        }
      }
    }
  });


   router.get('/checkEmail/:email', (req, res) => {
    // Check if email was provided in paramaters
    if (!req.params.email) {
      res.json({ success: false, message: 'E-mail was not provided' }); // Return error
    } else {
      // Search for user's e-mail in database;
      User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if user's e-mail is taken
          if (user) {
            res.json({ success: false, message: 'E-mail is already taken' }); // Return as taken e-mail
          } else {
            res.json({ success: true, message: 'E-mail is available' }); // Return as available e-mail
          }
        }
      });
    }
  });

  /* ===============================================================
     Route to check if user's username is available for registration
  =============================================================== */
  router.get('/checkUsername/:username', (req, res) => {
    // Check if username was provided in paramaters
    if (!req.params.username) {
      res.json({ success: false, message: 'Username was not provided' }); // Return error
    } else {
      // Look for username in database
      User.findOne({ username: req.params.username }, (err, user) => {
        // Check if connection error was found
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if user's username was found
          if (user) {
            res.json({ success: false, message: 'Username is already taken' }); // Return as taken username
          } else {
            res.json({ success: true, message: 'Username is available' }); // Return as vailable username
          }
        }
      });
    }
  });
  //domain//authentication/login
  router.post('/login',(req,res)=>{
     if (!req.body.username) {
        res.json({ success: false, message: 'You must provide an username' }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({ success: false, message: 'You must provide a password' }); // Return error
      }
      else{
        const usernamet=req.body.username;
        const passwordt=req.body.password;
        User.findOne({username: usernamet},(err,user)=>{
          if(err) {throw err;}
          if(!user) res.json({success:false ,message:"Cannt find user"});
          else{
            if(user.comparePassword(passwordt)){
           
              let permissionuser=user.permission?user.permission:0;

          var token=
  jwt.sign({
   user:{
    id:user.id,
    email:user.email,
    image:user.image,
    username:user.username,
    exp:user.exp,
    permission:permissionuser
   }
    },config.secret , { expiresIn: '1h' });
      res.json({success:true,message:"Success",token:token});
            }

            else{
              res.json({success:false,message:"Password wrong"});
            }
          }
          }) 
      }
    }

  
  });
  router.use((req,res,next)=>{
      
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
  router.get('/profile',(req,res)=>{
    User.findOne({_id:req.decoded.user.id}).select('username email image exp').exec((err,user)=>{
      if(err)
{
   res.json({success:false,message:err});
}
else{
  if(!user){
       res.json({success:false,message:"user not found"});
  }
  else{
         res.json({success:true,message:"Success",user:user });
  }
  }

    })
  

  });




router.get('/checkpermission',(req,res,next)=>{

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
       
        if(decoded.user.permission==1) {
        req.decoded=decoded;
        res.json({success:true,message:"You have permission"});
    }
    else{
      res.json({success:false,message:"You don't have permission to go to this page"});
      }
    }

    });
   }

  });



   
	return router;
};