/**
 * Created by outman on 2/8/16.
 */
module.exports = {
    sendNotification : function(req, res){
        //var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
        var sendgrid  = require('sendgrid')('app45505993@heroku.com', 'fma4leml1857');
        var email     = new sendgrid.Email({
            to:       'zhanglunli25@gmail.com',
            from:     'lixx3446@umn.edu',
            subject:  'test for title',
            text:     'test for content'
        });
        sendgrid.send(email, function(err, json) {
            if (err) { return console.error(err); }
            console.log(json);
        });


/*
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
*/
    }
};
