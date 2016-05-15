/**
 * Created by outman on 1/7/16.
 * Splitted by epienriz on 21 Feb/16
 */

var app = module.exports = require('express').Router();

var user = require("../database/user.js");

app.use('/help', function(req, res) {
    res.json({success: true, text: "test for db"});
});

//test for database read, insert
app.get('/getRecordByUsername/:username', function(req,res){
    user.getUser({where: {username: req.params.username || req.body["username"]}}, function(users, err) {
        res.json(err || users.rows);
    });
});
app.get('/readRecords', function(req,res){
    user.getUser({}, function(users, err) {
        res.json(err || users.rows);
    });
});

//to be change to post /user or /mentor
app.use('/addRecord', function(req,res){
    user.addUser(req.body, function(users, err) {
        res.json(err || users.rows);
    });
});

//to be changed to put
app.use('/updateRecord/:username', function(req, res) {
    user.updateUser({where: {username: req.params.username}, 
                    values : req.body},
        function(users, err) {
            res.json(err || users.rows);
    });
});

//to be change to del
//but should not delete real data
app.use('/delRecord', function(req,res){
    //dbOperations.delRecord(req,res);
});
// app.get('/updRecord', function(req,res){
//     dbOperations.updRecord(req,res);
// });
// app.post('/addRecord', function(req,res){
//     dbOperations.addRecordPost(req,res);
// });
// app.post('/updRecordApply', /*stormpath.loginRequired, */function(req,res){
//     dbOperations.updRecordApplyPost(req,res);
// });
// app.post('/updRecordProfile', /*stormpath.loginRequired, */function(req,res){
//     dbOperations.updRecordProfilePost(req,res);
// });

// module.exports = {
//     getRecordByUsername: function(req, res) {
//         var pg = require('pg');
//         var client = new pg.Client({
//             user: "xbwimqyoderpce",
//             password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
//             database: "d8fmtsmf5sv52f",
//             port: 5432,
//             host: "ec2-54-204-12-25.compute-1.amazonaws.com",
//             ssl: true
//         });

//         client.connect();

//         var query = client.query("select * from mentor where username='" + req.query.username + "'");

//         query.on("row", function (row, result) {
//             result.addRow(row);
//         });

//         query.on("end", function (result) {
//             client.end();
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.write(JSON.stringify(result.rows, null, "    ") + "\n");
//             res.end();
//         });
//     },

//     //not in use
//     getRecords: function(req, res) {
//         var pg = require('pg');
//         var client = new pg.Client({
//             user: "xbwimqyoderpce",
//             password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
//             database: "d8fmtsmf5sv52f",
//             port: 5432,
//             host: "ec2-54-204-12-25.compute-1.amazonaws.com",
//             ssl: true
//         });

//         client.connect();

//         var query = client.query("select * from mentor");

//         query.on("row", function (row, result) {
//             result.addRow(row);
//         });

//         query.on("end", function (result) {
//             client.end();
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.write(JSON.stringify(result.rows, null, "    ") + "\n");
//             res.end();
//         });
//     },

//     addRecord : function(req, res){
//         var pg = require('pg');
//         var client = new pg.Client({
//             user: "xbwimqyoderpce",
//             password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
//             database: "d8fmtsmf5sv52f",
//             port: 5432,
//             host: "ec2-54-204-12-25.compute-1.amazonaws.com",
//             ssl: true
//         });

//         client.connect();
//         var query = client.query("insert into mentor (username,firstName,lastName,email) "+
//             "values ('"+req.query.username+"','"+req.query.fName+"','"+req.query.lName+"','"+
//             req.query.email+"')");

//         query.on("end", function (result) {
//             client.end();
//             res.write('Success');
//             res.end();
//         });
//     },

//     //not in use
//     addRecordPost : function(req, res){
//         var pg = require('pg');
//         var client = new pg.Client({
//             user: "xbwimqyoderpce",
//             password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
//             database: "d8fmtsmf5sv52f",
//             port: 5432,
//             host: "ec2-54-204-12-25.compute-1.amazonaws.com",
//             ssl: true
//         });
//         client.connect();
//         //use each to get element in body
//         var query = client.query("insert into mentor (username,firstName,lastName,email) "+
//             "values ('"+req.body.username+"','"+req.body.fName+"','"+req.body.lName+"','"+
//             req.body.email+"')");

//         query.on("end", function (result) {
//             client.end();
//             res.write('Success');
//             res.end();
//         });
//     },

//     //not in use
//     delRecord : function(req, res){
//         var pg = require('pg');
//         var client = new pg.Client({
//             user: "xbwimqyoderpce",
//             password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
//             database: "d8fmtsmf5sv52f",
//             port: 5432,
//             host: "ec2-54-204-12-25.compute-1.amazonaws.com",
//             ssl: true
//         });
//         client.connect();

//         var query = client.query( "Delete from mentor Where username='" + req.query.username + "'");

//         query.on("end", function (result) {
//             client.end();
//             res.write('Success');
//             res.end();
//         });
//     },

//     //not in use
//     updRecord : function(req, res) {
//         var pg = require('pg');
//         var client = new pg.Client({
//             user: "xbwimqyoderpce",
//             password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
//             database: "d8fmtsmf5sv52f",
//             port: 5432,
//             host: "ec2-54-204-12-25.compute-1.amazonaws.com",
//             ssl: true
//         });

//         client.connect();
//         var query = client.query("update mentor "+
//             "set firstname='"+req.query.fName+"', lastname='"+req.query.lName+"', email='"+
//             req.query.email+"' where username='"+req.query.username+"'");

//         query.on("end", function (result) {
//             client.end();
//             res.write('Success');
//             res.end();
//         });
//     },

//     updRecordApplyPost : function(req, res){
//         var pg = require('pg');
//         var client = new pg.Client({
//             user: "xbwimqyoderpce",
//             password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
//             database: "d8fmtsmf5sv52f",
//             port: 5432,
//             host: "ec2-54-204-12-25.compute-1.amazonaws.com",
//             ssl: true
//         });

//         client.connect();
//         var query = client.query("update mentor "+
//             "set firstname='"+req.body['fName']+"', lastname='"+req.body['lName']+"', education='"+
//             req.body['education']+"', workingExp='"+req.body['workingExp'] + "'where username='"+req.user.username+"'");

//         query.on("end", function (result) {
//             client.end();
//             res.write('Success');
//             res.end();
//         });
//     },


//     updRecordProfilePost : function(req, res){
//         var pg = require('pg');
//         var client = new pg.Client({
//             user: "xbwimqyoderpce",
//             password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
//             database: "d8fmtsmf5sv52f",
//             port: 5432,
//             host: "ec2-54-204-12-25.compute-1.amazonaws.com",
//             ssl: true
//         });

//         client.connect();
//         var query = client.query("update mentor "+
//             "set firstname='" + req.body['fName'] +
//             "', lastname='" + req.body['lName'] +
//             "', education='"+ req.body['education'] +
//             "', workingExp='"+req.body['workingExp'] +
//             "', availability='"+req.body['availability'] +
//             "', nickname='"+req.body['nickname'] +
//             "', interviewExp='"+req.body['interviewExp'] +
//             "', seldescdetail='"+req.body['seldescdetail'] +
//             "', seldescsimple='"+req.body['seldescsimple'] +
//             "', serviceprice='"+req.body['servicePrice'] +
//             "'where username='"+req.user.username+"'");

//         query.on("end", function (result) {
//             client.end();
//             res.write('Success');
//             res.end();
//         });
//     },




//     //not in use
//     createTable : function(req, res){
//         var pg = require('pg');

//         var conString = process.env.DATABASE_URL ||  "postgres://xbwimqyoderpce:8T_OD4wJ2ilkt8ylH9W9lqlGlG@ec2-54-204-12-25.compute-1.amazonaws.com:5432/d8fmtsmf5sv52f";
//         var client = new pg.Client(conString);

//         client.connect();

//         var query = client.query( "CREATE TABLE employee"+
//             "("+
//             "firstname character varying(50),"+
//             "lastname character varying(20),"+
//             "email character varying(30),"+
//             "mobile character varying(12),"+
//             "id serial NOT NULL"+
//             ")");

//         query.on("end", function (result) {
//             client.end();
//             res.write('Table Schema Created');
//             res.end();
//         });

//     },

//     //not in use
//     dropTable : function(req, res){
//         var pg = require('pg');

//         var conString = process.env.DATABASE_URL || "postgres://xbwimqyoderpce:8T_OD4wJ2ilkt8ylH9W9lqlGlG@ec2-54-204-12-25.compute-1.amazonaws.com:5432/d8fmtsmf5sv52f";
//         var client = new pg.Client(conString);

//         client.connect();

//         var query = client.query( "Drop TABLE employee");

//         query.on("end", function (result) {
//             client.end();
//             res.write('Table Schema Deleted');
//             res.end();
//         });

//     }
// };

module.exports = app;