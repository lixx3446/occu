var sendgrid  = require('sendgrid')
        ('app45505993@heroku.com', 'fma4leml1857');
var underscore = require('underscore');

// default params
var defaultParam = {
	to: 'hengruicao@gmail.com',
	from:     'occujob@gmail.com',
	fromname: 'occu',
	subject: 'occu notification',
	html: '<p>Hi</p>',
	cc: ['lixx3446@umn.edu']
};

// can be useful for testing and over ride to email for example
var overrideConfig = {
//	to: 'lixx3446@umn.edu'
};

// the template configurations
// for later email template converting
// put either template_id or html

var templateConfigs =
{
	"example" : {template_id: "..."},
	"register_link" :
	{
		html: "<p> Hello, <br /><br />\
		 Thank you for registering on OCCU and being a member of our family!<br /><br />\
		 Please activate your general account by clicking <a href=\"-link-\"> here </a><br /><br />\
		 Should you have any question or concern, please do not hesitate to contact us at occujob@gmail.com.<br /><br />\
		 Best,<br />\
		 OCCU Team<br />\
		 </p>",
        subject: 'ACTION REQUIRED: Activate Your New Account'
    },
	"apply_mentor" :
	{
		html: "<p> Dear -username-, <br /><br /> \
		Thank you for applying to become a mentor at OCCU.<br /><br /> \
		Your application is currently under review and we will get back to you within the next 24 hours. Please wait patiently for our further information. <br /><br /> \
		 Should you have any question or concern, please do not hesitate to contact us at occujob@gmail.com.<br /><br />\
		 Best,<br />\
		 OCCU Team<br />\
		</p>",
		subject: "Application Confirmation"
	},
	"apply_mentor_success" :
	{
		html: "<p> Dear -username-, <br /><br /> \
		Congratulations! You have been approved to become a mentor at OCCU.<br /><br /> \
		Please complete your mentor profile by clicking <a href=\"-link-\">HERE</a>, or directly visit our website at http://www.occujob.com. <br/><br/>\
		 Should you have any question or concern, please do not hesitate to contact us at occujob@gmail.com.<br /><br />\
		 Best,<br />\
		 OCCU Team<br />\
		</p>",
        subject: "Congratulations! Your Application Has Been Approved"
    },
	"apply_mentor_fail" :
	{
		html: "<p> Dear -username-, <br /> You application is refused, you may resubmit\
		<br/>\
		Regards</p>"
	},
	"password_forgot" :
	{
		html: "<p> Dear -username-, <br /> reset your password link\
		<a href=\"-link-\"> here </a> <br/>\
		Regards</p>"
	},
	"password_reset" :
	{
		html: "<p> Dear -username-, <br /> Your password is reseted, if you didn't do this yourself, pls reset your password again immediately\
		<a href=\"-link-\"> here </a> <br/>\
		Regards</p>"
	}

}

var Email = module.exports = function(params) {
	var _ = this;
	params = underscore.defaults(params, defaultParam);
	params = underscore.extend(params, overrideConfig);
	_.email = new sendgrid.Email(params);

	_.callBack = params.callBack;

	_.send = function(callBack) {
		sendgrid.send(_.email, function(err, json) {
			if (err)
				console.log(err);

			// i always like more callback with result first
			var c = (callBack || _.callback);
			c && c(json, err);
		})
	}

	// for later email template converting
	_.template = function(name) {
		var config = templateConfigs[name];
		if (config) {
			underscore.extend(_.email, config);
			if (config.template_id) {
				email.addFilter('templates', 'enable', 1);
				email.addFilter('templates', 'template_id', config.template_id);				
			}
			config.html && (_.email.html = config.html);
		}
	}

	// key: value params
	// for define variable use - -syntax
	_.addVariable = function(params) {
		for (var k in params) {
			_.email.addSubstitution('-' + k + '-', params[k]);
		}
	}

	params.template && _.template(params.template);
	params.variables && _.addVariable(params.variables);
}
