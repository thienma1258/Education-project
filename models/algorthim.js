

var algorthim=class Algorthim{

	static binarysearch(a,keyword,start,end){
	let middle=Math.floor((start+end)/2);
	
	if(a[middle].User.id==keyword) {
	
		return a[middle];
	}
	else if(start>=end) return null;
	else if(keyword>a[middle].User.id) {
		return this.binarysearch(a,keyword,middle,end);
	}
	else if(keyword<a[middle].User.id){ this.binarysearch(a,keyword,start,middle);
	}
	return null;
	}
	



}
module.exports=algorthim;