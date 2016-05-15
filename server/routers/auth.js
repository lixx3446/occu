var app = module.exports = require('express').Router();
var auth = require("../auth/auth.js");
var token = require("../auth/token.js");
var account = require("../database/account.js");
var profile = require("../database/profile.js");
var mail = require("../utils/sendemail.js");

app.post('/login', function(req, res) {
	var password = req.body.password;
	var username = req.body.username || "";

	account.find({where: {username: username}}, function(result, err){
		if (!err && result.rowCount == 1) {
			var user = result.rows[0];
			if (auth.verify(password, user.salt, user.hashed_password)) {
				// can add more info to token
				var obj = {
					username: username,
					time: new Date()
				};

				return res.json({success: true, token: token.sign(obj)});				
			}
		}
		console.log(result);
		res.status(400).json({error: {}, message: 'Invalid username or password'});
	});
});

// to be complete with token etc...
app.post('/validate', token.express, function(req, res){
	var password = req.token.password;
	var username = req.token.username;
	var email = req.token.username;
	// Email get deprecated apparently
	// Tho i still would like to store it in profile just for legacy, why not
	var mobile = req.token.mobile;

	if (!username || !password)
		return (res.status(400).json({error: {}, message: 'missing field'}));

	var p = auth.generate(password);

	// logic to be changed so that email validation... erk

	account.insert({values: {
		username: username, hashed_password: p.hashed_password,
		salt: p.salt}},
		function(result, err) {
			if (err)
				return res.status(400).json({error: err});

				profile.insert({values: {
				username: username, email: email}
				},	function(result, err) {
					if (err)
					  return res.status(400).json({error: err});
					var obj = {
					username: username,
					time: new Date()
					};

					var t = token.sign(obj);

					return res.json({success: true, token: t});
				});
		});
});



app.post('/register', function(req, res) {
	var password = req.body.password;
	var username = req.body.username;
	var email = req.body.username;
	// Email get deprecated apparently
	// Tho i still would like to store it in profile just for legacy, why not
	var mobile = req.body.mobile;

	if (!username || !password)
		return (res.status(400).json({error: {}, message: 'missing field'}));

	var t = token.sign({username:username, password:password,
		email:email, mobile:mobile});

	var m = new mail({
		to: email || username, //email or username both email right
		subject: 'occu registration',
		template: 'register_link', variables: {
		username: username, time: new Date(),
		link: req.protocol + '://' + req.get('host') + '/#/validate?token=' + t
	}});
	m.send();
	res.json({success: true});
});

app.post('/:username/forgot', function(req, res){
	var username = req.params.username;

	account.find({where: {username: username}}, function(result, err){
		if (!err && result.rowCount == 1) {
			var u = result.rows[0];
			var t = token.sign({password:u.hashed_password});
			var m = new mail({
				to: username, //email or username both email right
				template: 'password_forgot', variables: {
				username: username, time: new Date(),
				link: req.protocol + '://' + req.get('host') + '/#/' +username+ '/reset?token=' + t
			}});
			m.send();
			res.json({success:true, token: t});
		} else {
			res.status(404).json({error:{}, })
		}
	});
});

app.post('/:username/reset', token.express, function(req, res){
	var new_password = req.body.new_password;
	var password = req.token.password;
	var username = req.params.username;


	//Caution this might be unsafe if their password and salt collides,
	//but thats very little possibility
	account.find({where: {username: username, hashed_password: password}}, function(result, err){
		if (!err && result.rows.length == 1) {
			var user = result.rows[0];
				// can add more info to token
					var p = auth.generate(new_password);
					account.update({
						where: {username: username, hashed_password: user.hashed_password},
						values: {hashed_password: p.hashed_password, salt: p.salt}
					}, function(r, e){
						if (e)
						  return res.status(400).json({error: e});

						var t = token.sign({password:password,
							});
						var m = new mail({
							to: username, //email or username both email right
							template: 'password_reset', variables: {
							username: username, time: new Date(),
							link: req.protocol + '://' + req.get('host') + '/#/' +username+ '/reset?token=' + t
						}});
						m.send();

						var obj = {
						username: username,
						time: new Date()
						};
						var t = token.sign(obj);
						res.json({success: true, token: t});
					});
		}
		else{
			res.status(400).json({error: err, message: 'Invalid username or password'});
		}
	});
});