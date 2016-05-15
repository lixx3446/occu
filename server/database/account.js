var client = require('./client.js');
var squel = require("./squel");
var auth = require("../auth/auth.js");

var Account = module.exports = {};

// [].concat help handle single value and array
Account.insert = function(params, callBack) {
	var q = squel.insert();
	q.into("account");
	for (var k in params.values) {
		q.set(k, params.values[k].toString());
	}

	client.query(q.toString(), callBack);
}

Account.find = function(params, callBack){
	var q = squel.select();
	q.from("account");
	for (var k in params.where) {
		q.where(k + " = ?", params.where[k]);
	}

	client.query(q.toString(), callBack);
}

Account.update = function(params, c){
	var q = squel.update();
		q.table("account");
		//console.log(JSON.stringify(params));
		for (var k in params.values) {
			var obj = params.values[k];
			if (typeof obj === 'object' || Array.isArray(obj))
				obj = JSON.stringify(obj);
			q.set(k, obj);
		}

		for (var k in params.where) {
			q.where(k + " = ?", params.where[k]);
		}

		client.query(q.toString(), c);
}