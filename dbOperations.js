/**
 * Created by outman on 1/7/16.
 */
module.exports = {
    getRecordByUsername: function(req, res) {
        var pg = require('pg');
        var client = new pg.Client({
            user: "xbwimqyoderpce",
            password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
            database: "d8fmtsmf5sv52f",
            port: 5432,
            host: "ec2-54-204-12-25.compute-1.amazonaws.com",
            ssl: true
        });

        client.connect();

        var query = client.query("select * from mentor where username='" + req.query.username + "'");

        query.on("row", function (row, result) {
            result.addRow(row);
        });

        query.on("end", function (result) {
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();
        });
    },

    //not in use
    getRecords: function(req, res) {
        var pg = require('pg');
        var client = new pg.Client({
            user: "xbwimqyoderpce",
            password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
            database: "d8fmtsmf5sv52f",
            port: 5432,
            host: "ec2-54-204-12-25.compute-1.amazonaws.com",
            ssl: true
        });

        client.connect();

        var query = client.query("select * from mentor");

        query.on("row", function (row, result) {
            result.addRow(row);
        });

        query.on("end", function (result) {
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();
        });
    },

    addRecord : function(req, res){
        var pg = require('pg');
        var client = new pg.Client({
            user: "xbwimqyoderpce",
            password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
            database: "d8fmtsmf5sv52f",
            port: 5432,
            host: "ec2-54-204-12-25.compute-1.amazonaws.com",
            ssl: true
        });

        client.connect();
        var query = client.query("insert into mentor (username,firstName,lastName,email) "+
            "values ('"+req.query.username+"','"+req.query.fName+"','"+req.query.lName+"','"+
            req.query.email+"')");

        query.on("end", function (result) {
            client.end();
            res.write('Success');
            res.end();
        });
    },

    //not in use
    addRecordPost : function(req, res){
        var pg = require('pg');
        var client = new pg.Client({
            user: "xbwimqyoderpce",
            password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
            database: "d8fmtsmf5sv52f",
            port: 5432,
            host: "ec2-54-204-12-25.compute-1.amazonaws.com",
            ssl: true
        });
        client.connect();
        //use each to get element in body
        var query = client.query("insert into mentor (username,firstName,lastName,email) "+
            "values ('"+req.body.username+"','"+req.body.fName+"','"+req.body.lName+"','"+
            req.body.email+"')");

        query.on("end", function (result) {
            client.end();
            res.write('Success');
            res.end();
        });
    },

    //not in use
    delRecord : function(req, res){
        var pg = require('pg');
        var client = new pg.Client({
            user: "xbwimqyoderpce",
            password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
            database: "d8fmtsmf5sv52f",
            port: 5432,
            host: "ec2-54-204-12-25.compute-1.amazonaws.com",
            ssl: true
        });
        client.connect();

        var query = client.query( "Delete from mentor Where username='" + req.query.username + "'");

        query.on("end", function (result) {
            client.end();
            res.write('Success');
            res.end();
        });
    },

    //not in use
    updRecord : function(req, res) {
        var pg = require('pg');
        var client = new pg.Client({
            user: "xbwimqyoderpce",
            password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
            database: "d8fmtsmf5sv52f",
            port: 5432,
            host: "ec2-54-204-12-25.compute-1.amazonaws.com",
            ssl: true
        });

        client.connect();
        var query = client.query("update mentor "+
            "set firstname='"+req.query.fName+"', lastname='"+req.query.lName+"', email='"+
            req.query.email+"' where username='"+req.query.username+"'");

        query.on("end", function (result) {
            client.end();
            res.write('Success');
            res.end();
        });
    },

    updRecordApplyPost : function(req, res){
        var pg = require('pg');
        var client = new pg.Client({
            user: "xbwimqyoderpce",
            password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
            database: "d8fmtsmf5sv52f",
            port: 5432,
            host: "ec2-54-204-12-25.compute-1.amazonaws.com",
            ssl: true
        });

        client.connect();
        var query = client.query("update mentor "+
            "set firstname='"+req.body['fName']+"', lastname='"+req.body['lName']+"', education='"+
            req.body['education']+"', workingExp='"+req.body['workingExp'] + "'where username='"+req.user.username+"'");

        query.on("end", function (result) {
            client.end();
            res.write('Success');
            res.end();
        });
    },


    updRecordProfilePost : function(req, res){
        var pg = require('pg');
        var client = new pg.Client({
            user: "xbwimqyoderpce",
            password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
            database: "d8fmtsmf5sv52f",
            port: 5432,
            host: "ec2-54-204-12-25.compute-1.amazonaws.com",
            ssl: true
        });

        client.connect();
        var query = client.query("update mentor "+
            "set firstname='" + req.body['fName'] +
            "', lastname='" + req.body['lName'] +
            "', education='"+ req.body['education'] +
            "', workingExp='"+req.body['workingExp'] +
            "', availability='"+req.body['availability'] +
            "', nickname='"+req.body['nickname'] +
            "', interviewExp='"+req.body['interviewExp'] +
            "', seldescdetail='"+req.body['seldescdetail'] +
            "', seldescsimple='"+req.body['seldescsimple'] +
            "', serviceprice='"+req.body['servicePrice'] +
            "'where username='"+req.user.username+"'");

        query.on("end", function (result) {
            client.end();
            res.write('Success');
            res.end();
        });
    },




    //not in use
    createTable : function(req, res){
        var pg = require('pg');

        var conString = process.env.DATABASE_URL ||  "postgres://xbwimqyoderpce:8T_OD4wJ2ilkt8ylH9W9lqlGlG@ec2-54-204-12-25.compute-1.amazonaws.com:5432/d8fmtsmf5sv52f";
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query( "CREATE TABLE employee"+
            "("+
            "firstname character varying(50),"+
            "lastname character varying(20),"+
            "email character varying(30),"+
            "mobile character varying(12),"+
            "id serial NOT NULL"+
            ")");

        query.on("end", function (result) {
            client.end();
            res.write('Table Schema Created');
            res.end();
        });

    },

    //not in use
    dropTable : function(req, res){
        var pg = require('pg');

        var conString = process.env.DATABASE_URL || "postgres://xbwimqyoderpce:8T_OD4wJ2ilkt8ylH9W9lqlGlG@ec2-54-204-12-25.compute-1.amazonaws.com:5432/d8fmtsmf5sv52f";
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query( "Drop TABLE employee");

        query.on("end", function (result) {
            client.end();
            res.write('Table Schema Deleted');
            res.end();
        });

    }
};
