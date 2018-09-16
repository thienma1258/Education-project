const crypto=require('crypto').randomBytes(256).toString('hex');
var port=process.env.PORT||8080;
module.exports=
{
	uri:'mongodb://127.0.0.1:27017/project',
	secret:crypto,
	Port:port,
	db:'Meanangular2'
}
