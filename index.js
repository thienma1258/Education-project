//express 
const express=require('express');
const app=express();
const router=express.Router();
const config=require('./config/config.js');
const path=require('path');
const http=require('http').Server(app);
//socket.io
const io = require('socket.io')(http);
//Mongoose
const mongoose=require('mongoose');
var options={useMongoClient: true};
//cors
const cors=require('cors');

var options={
	origin:"http://localhost:4200"};
//bodyParser
const bodyParser=require('body-parser');

//app configuration
mongoose.Promise=global.Promise;
mongoose.connect(config.uri,options,(err)=>{
	if(err) console.log(err);
	else{

		console.log("Connected to database");
	}
});
//test router
var testRouter=require('./api/test/test')(router);
//authentication router
const authentication=require('./api/authentication/authentication')(router);
app.use(cors(options));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));

app.use('/authentication',authentication);
app.use('/Test',testRouter);

http.listen(config.Port, () => {
    console.log('Server started on port :'+config.Port);
});
app.get('*',(req,res)=>{
	// res.send("asdads");
	res.sendFile(path.join(__dirname,"public/index.html"));
});
require('./socket.io/socket.io.js')(app,io);
//Upp load image;
require('./api/multer.js')(app);
