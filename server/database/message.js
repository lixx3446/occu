var client = require('./client.js');
var squel = require("./squel");

var Message = module.exports = {};

Message.insert = function(params, callBack) {
	var q = squel.insert();
	q.into("message");
    for (var k in params.values) {
        q.set(k, params.values[k]);
    }
		//.setFieldsRows([].concat(params.values.toString().replace(/'/g,"''")));

	client.query(q.toString(), callBack);
}


Message.markRead = function(params, callBack) {
    var q = squel.update();
    q.table("message")
        .set("read",true)
        .where(
            squel.expr()
                .and("from_username = ?", params.fromUser.replace(/'/g,"''"))
                .and("to_username = ?", params.toUser.replace(/'/g,"''"))
        );
    client.query(q.toString(), callBack);
}


// where: {from_username: xxx}
// where: {to_username: xxx}
Message.get = function(params, callBack) {	
	var q = squel.select();
	q.from("message");
	for (var k in params.where) {
		q.where(k + " = ?", params.where[k].replace(/'/g,"''"));
	}
	q.order("create_on", false); //DESC

	client.query(q.toString(), callBack);
}

// params = {user1, user2}
Message.getConversation = function(params, callBack){
	var q = squel.select();
	q.from("message")
	.where(
		squel.expr().or_begin()
		.and("from_username = ?", params.user1.replace(/'/g,"''"))
		.and("to_username = ?", params.user2.replace(/'/g,"''"))
		.end().or_begin()
		.and("from_username = ?", params.user2.replace(/'/g,"''"))
		.and("to_username = ?", params.user1.replace(/'/g,"''"))
		.end()
	)
	q.order("create_on", false); //DESC

	client.query(q.toString(), callBack);
}

// params = {username: }
Message.getUserMessages = function(params, callBack) {
	var q = squel.select();
	q.from("message")
	.where(
		squel.expr().and("from_username = ?", params.username.replace(/'/g,"''"))
		.or("to_username = ?", params.username.replace(/'/g,"''"))
		);
	q.order("create_on", false); //DESC

    //join profile icon
    var query = "select * from (" + q.toString() + ") s ";
    query = query + "inner join " + "profile" + " t " + "on" + " t.username=s.from_username";

    //select * from message where
	client.query(query.toString(), callBack);
}

Message.Fields = ['from_username', 'to_username', 'message', 'read', 'create_on'];