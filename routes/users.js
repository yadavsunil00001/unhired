var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/userModel');
var Verify    = require('./verify');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({},function(err,users) {
  	// body...
  	if(err)
  		throw err;
  	res.send(users);
  })
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username,firstName:req.body.firstName,lastName:req.body.lastName,college:req.body.college,degree:req.body.degree}),
      req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({status: 'Registration Successful!'});
        });
    });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
        
      var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = router;