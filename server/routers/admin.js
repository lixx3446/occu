var app = module.exports = require('express').Router();
var admin = require("../auth/admin.js"); //admin to handle admin login
var user = require("../database/user.js");
var apply = require("../database/apply.js");
var underscore = require('underscore'); //useful for filter req attributes
var mail = require('../utils/sendemail.js');
// to be used as /admin router

// admin express for handle admin auth and security protection
app.use(admin.express);

app.post('/login', function(req, res) {
	res.json({success: true});
});

// get lists of mentor applies
app.get('/apply', function(req, res){
	apply.get({}, function(r, err){
		if (err)
			res.status(400);
		res.json(err || r.rows);
	});
});

app.get('/apply/:username', function(req, res){
	apply.get({where: {username: req.params.username}}, function(r, err){
		if (err)
			res.status(400);
		res.json(err || r.rows);
	});
});

//validate
app.post('/apply/:username/validate', function(req, res){
	var _apply = req.body.apply || {};
	var username = req.params.username;
	// later may add more staff to post, like who validated the request etc etc
	// either get apply from post or just from database?
	var app_to_insert = underscore.pick(_apply, 'education', 'job', 'interview');
	apply.validateApply({
		where: {username: username}
	}, function(r, err){		
			res.json(err || {success:true});
			// send email here
			if (!err) {
		    var m = new mail({
		      to: username, //email or username both email right
		      template: 'apply_mentor_success', variables: {
		      username: username, time: new Date(),
                    link: req.protocol + '://' + req.get('host') + '/#/profileForm/' + username
                }});
		    m.send();
				apply.delete({where: {username: username}});
			}
	});
});

// delete or unvalidate an apply
app.delete('/apply/:username/', function(req, res){
	var username = req.params.username;
	apply.delete({where: {username: apply.username}}, function(r, err){
		if (err)
			res.status(400);
		res.json(err || {success:true});

		// send email to user here
		var m = new mail({
	        to: username, //email or username both email right
	        template: 'apply_mentor_fail', variables: {
	        username: username, time: new Date()
        }});
        m.send();
	});
});

