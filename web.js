// web.js
var express = require("express");
var stormpath = require('express-stormpath');
var app = express();
var pg = require('pg');
var dbOperations = require("./dbOperations.js");
var emailOperations = require("./emailOperations.js");
var bodyParser = require('body-parser');
var path = require('path');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static("" + __dirname + "/app"));

//to tell where template file located
//app.set('views', __dirname + '/app/views');
//app.set('view engine', 'jade');

app.use(stormpath.init(app, {
	web: {
		register: {
			//view: path.join(__dirname,'app/views','register.jade'), // My custom login view
			fields: {
				givenName: {
					enabled: false
				},
				surname: {
					enabled: false
				}
			},
			autoLogin: true
			//nextUri: '/applyForMentor'
		},
		login: {
			//view: path.join(__dirname,'app/views','login.jade') // My custom login view
		}
	},
	apiKeyId:     process.env.STORMPATH_API_KEY_ID,
	apiKeySecret: process.env.STORMPATH_API_KEY_SECRET,
	secretKey:    process.env.STORMPATH_SECRET_KEY,
	application:  process.env.STORMPATH_URL,
	website: true
}));


/*
app.set('view engine', 'ejs');
app.use(express.static("" + __dirname + "/app"));
app.set('views', __dirname + '/app/views');
app.get('/db', function (request, response) {
  var client = new pg.Client({
	    user: "xbwimqyoderpce",
	    password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
	    database: "d8fmtsmf5sv52f",
	    port: 5432,
	    host: "ec2-54-204-12-25.compute-1.amazonaws.com",
	    ssl: true
	});

  client.connect(function(err, client, done) {
    if (err)
      	{ console.error(err); response.send("Error " + err); client.end(); }
    else
    	{ client.query('SELECT * FROM test_table', function(err, result) {
    	    if (err)
    	     { console.error(err); response.send("Error " + err); }
    	    else
    	     { response.render('pages/db', {results: result.rows} ); }
    	    client.end();
    	  });
    	}
  });
});
*/




//test for database read, insert
app.get('/db/getRecordByUsername', function(req,res){
	dbOperations.getRecordByUsername(req,res);
});
app.get('/db/readRecords', function(req,res){
	dbOperations.getRecords(req,res);
});
app.get('/db/addRecord', function(req,res){
	dbOperations.addRecord(req,res);
});
app.get('/db/delRecord', function(req,res){
	dbOperations.delRecord(req,res);
});
app.get('/db/updRecord', function(req,res){
	dbOperations.updRecord(req,res);
});
app.post('/db/addRecord', function(req,res){
	dbOperations.addRecordPost(req,res);
});
app.post('/db/updRecordApply', stormpath.loginRequired, function(req,res){
	dbOperations.updRecordApplyPost(req,res);
});
app.post('/db/updRecordProfile', stormpath.loginRequired, function(req,res){
	dbOperations.updRecordProfilePost(req,res);
});

app.post('/email/sendNotification', function(req,res){
	emailOperations.sendNotification(req,res);
})




//not in use
app.get('/user', function(req, res) {
    var username = req.user ? req.user.username : null;
    res.send(username);
    //res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.write(username);
    // res.end();
});

/*
//not in use
app.get('/dashboard', stormpath.loginRequired, function(req, res) {
	req.user.getCustomData(function(err, data) {
		data.birthday = '6/28/1988';
		data.accountBalance = 100.00;
		data.address = {
			address1: '217 South B Street Suite #1',
			city: 'San Mateo',
			state: 'CA',
			zip: 94401
		};

		// Calling data.save() will persist your changes.
		data.save(function() {
			//res.send(JSON.stringify(req.user) + ' Your information has been updated!');
			res.send(req.user.username + ' your info has been updated');
		});
	});
});

//not in use
app.post('/dashboard', stormpath.loginRequired, function(req, res) {
	req.user.addToGroup('https://api.stormpath.com/v1/groups/6qwpphn4D4vOraGKYBaLM2', function(err, membership) {
		console.log(membership);
	});

	req.user.getCustomData(function(err, data) {
		data.isMentor = true;
		data.name = req.body['name'];
		data.birthday = '6/28/1988';
		data.accountBalance = 100.00;
		data.address = {
			address1: '217 South B Street Suite #1',
			city: 'San Mateo',
			state: 'CA',
			zip: 94401
		};

		// Calling data.save() will persist your changes.
		data.save(function() {
			console.log(req.body['name']);
			res.send('Your information has been updated!');
		});
	});
});
*/


var port = Number(process.env.PORT || 5000);
app.on('stormpath.ready', function () {
	app.listen(port, function() {
		console.log("Listening on " + port);
	});
});