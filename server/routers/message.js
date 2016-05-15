var app = module.exports = require('express').Router();
var token = require("../auth/token.js")
var message = require("../database/message.js");
var underscore = require('underscore'); //useful for filter req attributes

// /message router
// Un comment token express to have auth access control
app.get('/:other_user?', token.express,  function(req,res){
	var username = (req.token && req.token.username) || req.params.username || req.query.username;
	var other_user = req.params.other_user || null;

	if (other_user == null) {
		message.getUserMessages({username: username}, function(result, err){
			if (err)
				res.status(400);
			res.json(err || result.rows);
		});	
	} else
		message.getConversation({user1: username, user2: other_user}, function(result, err){
			if (err)
				res.status(400);
			res.json(err || result.rows);
		});
});

//post {to_username: , message: }
app.post('/',  token.express,  function(req, res){
	var username = (req.token && req.token.username) || req.body.username;
	var msg = underscore.pick(req.body, 'from_username', 'to_username', 'message');

	msg.from_username = username;
	msg.read = false;
	message.insert({values: msg}, function (result, err){
		if (err)
			res.status(400);
		res.json(err || msg);
	});
});



app.put('/:other_user', token.express,  function(req,res) {
    var username = (req.token && req.token.username) || req.params.username || req.query.username;
    var other_user = req.params.other_user || null;

    message.markRead({fromUser: other_user, toUser: username}, function (result, err) {
        if (err)
            res.status(400);
        res.json(err || {success: true});
    });
});