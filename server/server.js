//Initialise express
var express = require("express");
var app = express();
//var stormpath = require('express-stormpath'); //sorry i couldnt make this work yet
//var pg = require('pg'); //server js could be as simple possible

//Morgan
// var morgan = require("morgan");
// app.use(morgan());
//Log every request

//Body parser, allows json in req
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//

//all routers minified
app.use(require('./routers/all.js'));

// new client-side repo moved to ./public
app.use(express.static("./public"));
app.use('/admin', express.static("./admin"));
// app to be deprecated
app.use(express.static("./app"));

var port = Number(process.env.PORT || 8002);;
app.listen(port, function() {
		console.log("Listening on " + port);
	});