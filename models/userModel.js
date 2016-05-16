var mongoose=require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var User=mongoose.Schema({
	firstName:{
		type:String
	},
	lastName:{
		type:String
	},
admin:{
	type:Boolean,
	default:false
},
username:{
	type:String,
	required:true

},
password:{
	type:String
},
college:{
	type:String
},
degree:{
	type:String
}
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);