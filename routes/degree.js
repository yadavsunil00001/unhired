var express = require('express');
var router = express.Router();
var college=require('../models/college');
var verify=require('./verify');
/* GET home page. */

//verify Admin user

router.route('/').get(verify.verifyAdminUser,function (req,res) {
	// body...
	college.find({},function(err,data) {
		// body...
	if(err)
		throw err;
	res.send(data);
	})
})
.post(verify.verifyAdminUser, function(req, res) {
	var degree=req.body.degree;
  var newcollege=new college({
  	name:req.body.name,
  	degree:degree
  });
  newcollege.save(function(err,data) {
  	// body...
  	if(err)
  		throw err;
  	res.send("Added");
  })
});

module.exports = router;
