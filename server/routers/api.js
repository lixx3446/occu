var app = module.exports = require('express').Router();
var token = require("../auth/token.js")
var user = require("../database/user.js");
var underscore = require('underscore'); //useful for filter req attributes
var apply = require("../database/apply.js");
var mail = require("../utils/sendemail.js");

// get /user
app.get('/', function(req,res){
    user.getMentorList(req.query, function(users, err) {
        res.json(err || users.rows);
    });
});

app.get('/getMentorList', function(req,res){
    user.getMentorList(req.query, function(users, err) {
        res.json(err || users.rows);
    });
});


app.get('/:username', function(req, res) {
    user.getUser({where: {username: req.params.username}},
        function(users, err) {
        if (err) return res.status(400).json(err);
        if (users.rowCount == 0)
            res.status(404).json({error: 'Not found'});
        else
            res.json(users.rows[0])
    });  
})

//Add auth and change url
app.put('/:username', token.express, function(req, res) {
    console.log(req.token.username);
    console.log(req.params.username);
    if (req.token.username == req.params.username) {
        delete req.body.token;
        delete req.body.username;

        // this logic should probably be put into database instead of controller
        var profile = underscore.pick(req.body, 'nickname', 'email', 'phone', 'firstname', 'lastname', 'icon', 'gender');
        var mentor_profile = underscore.pick(req.body, 'education', 'interview', 'job',
            'self_description_detail', 'self_description_simple', 'availability', 'service_price');

        var postProfile = function() {
            if (underscore.keys(profile).length > 0) {
                user.updateUser(
                    {where: {username: req.params.username},
                    values : profile}, function(users, err) {
                    if (err)
                        res.status(400);
                    res.json(err || {success: true});
                });
                return true;
            }
            return false;
        }

        var postMentor = function(users, err) {
            if (underscore.keys(mentor_profile).length > 0) {
                user.updateUserMentor(
                    {where: {username: req.params.username},
                    values: mentor_profile}, function(users, err) {
                        if (err)
                            res.status(400).json(err);
                        else
                            postProfile() || (res.json({success:true}));
                    });
                return true;
            }
            return false;
        }

        postMentor() || postProfile() || res.status(400).json({error: 'no key'});
    } else {
        res.status(401).json({error: 'Unauthorized'});
    }
});


//To Deprecate
//To move to PUT /user/:username
app.put('/update/:username', function(req, res) {
    user.updateUser({where: {username: req.params.username},
            values : req.body},
        function(users, err) {
            res.json(err || users.rows);
        });
});


//To Deprecate
//To move to PUT /user/:username
app.put('/updateMentor/:username', function(req, res) {
    user.updateUserMentor({where: {username: req.params.username},
            values : req.body},
        function(users, err) {
            res.json(err || users.rows);
        });
});


//To Deprecate
app.put('/applyMentor/:username', function(req, res) {
    user.applyMentor({where: {username: req.params.username},
            values : req.body},
        function(users, err) {
            res.json(err || users.rows);
        });
});

//more logic to have post for creating new instances
app.post('/:username/applyMentor/', token.express, function(req, res) {
    if (req.token.username == req.params.username) {
        var obj = underscore.pick(req.body,
            'username',
            'firstname',
            'lastname',
            'phone',
            'education',
            'job',
            'filename'
        );
        apply.insert({where: {username: req.params.username},
                values : obj},
            function(users, err) {
                if (err)
                    res.status(400);
                else {
                    var m = new mail({
                        to: req.params.username, //email or username both email right
                        template: 'apply_mentor', variables: {
                        username: req.params.username, time: new Date()
                    }});
                    m.send();
                }
                res.json(err || users.rows);
            });
    } else {
        res.status(401).json({error: 'Unauthorized'});
    }
});