module.exports=function(app,io){
	io.on("connection",(socket)=>{
		console.log(socket.handshake.query.testid);



	});


}