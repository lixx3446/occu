/**
 * Created by outman on 2/8/16.
 * Moved by hengruicao on 2/22/16
 * Deprecated
 */
var app = module.exports = require('express').Router();

var emailOperations = {
    // to be refactored later
    sendNotification : function(req, res){
        //var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
        var sendgrid  = require('sendgrid')
        ('app45505993@heroku.com', 'fma4leml1857');
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
    }
};

app.post('/sendNotification', function(req,res){
    emailOperations.sendNotification(req,res);
});
