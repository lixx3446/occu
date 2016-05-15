var client = require('./client.js');
var squel = require("./squel");
var auth = require("../auth/auth.js");

var Profile = module.exports = {};

// [].concat help handle single value and array
Profile.insert = function(params, callBack) {
	var q = squel.insert();
	q.into("profile");
    for (var k in params.values) {
        q.set(k, params.values[k].toString());
    }

	client.query(q.toString(), callBack);
}

Profile.find = function(params, callBack){
	var q = squel.select();
	q.from("account");
	for (var k in params.where) {
		q.where(k + " = ?", params.where[k]);
	}

	client.query(q.toString(), callBack);
}