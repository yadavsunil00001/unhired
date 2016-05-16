var mongoose=require('mongoose');
var collegeSchema=mongoose.Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	degree:[String]
});
module.exports=mongoose.model('degree',collegeSchema);