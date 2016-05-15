var jwt = require('jsonwebtoken');

var _ = module.exports = {};

const secret = process.env.WHISPER_SECRET || 'whisper_secret';

_.sign = function(obj) {
	var token = jwt.sign(obj, secret);
	return token;
};

// Probably not very useful
_.verify = function(token) {
	return jwt.verify(token, secret);
};

// Plug this in express
_.express = function(req, res, next) {
	var token = req.params.token || req.body.token || req.query.token;
	if (token == null) {
		return res.status(401).json({error: 'Unauthorized', message: 'Missing token'});
	}
	jwt.verify(token, secret, function (err, decoded){
		if (err)
			return res.status(401).json({error: 'Unauthorized', message: 'Invalid token', exception: err});
		req.token = decoded;
		next();
	});
}
