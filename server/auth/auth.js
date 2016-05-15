var crypto = require('crypto');

var auth = module.exports = {};


auth.generateSalt = function(){
	return crypto.randomBytes(16).toString('hex');
}

auth.generate = function(password) {
	var buf = auth.generateSalt();

	var hashed = crypto.createHmac('sha256', buf)
                   .update(password)
                   .digest('hex');

    return {hashed_password: hashed, salt: buf};
}

auth.verify = function(password, salt, hashed) {
	console.log(password);
	console.log(salt);
	var new_hash = crypto.createHmac('sha256', salt)
                   .update(password)
                   .digest('hex');
    console.log(new_hash);
    return new_hash == hashed;
}
