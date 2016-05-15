var _ = module.exports = {};

// Plug this in express
_.express = function(req, res, next) {
	var password = 'secret';
	var input = req.params.password || req.body.password || req.query.password;

	if (input == password) {
		next();
	} else{
		return res.status(401).json({error: 'Unauthorized',
			message: 'Invalid access'});
	}
}