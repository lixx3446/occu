var app = module.exports = require('express').Router();

//Kept db test operations
var db = require("./db.js");
app.use('/db', db);

//Test email operations
var email = require("./email.js");
app.use('/email', email);

app.use('/auth', require("./auth.js"));

app.use('/user', require("./api.js"));

app.use('/message', require("./message.js"));

// for example, /admin/apply, handle backend admin staffs here
app.use('/admin', require("./admin.js"));