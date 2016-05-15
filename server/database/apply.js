var client = require("./client.js");
var squel = require("./squel");
var util = require("util");
var _ = module.exports = {};

_.fields = [
    "education",
    "job",
    "interview",
    // "self_description_detail",
    // "self_description_simple",
    //"availability",
    //"service_price"
];

_.profile_fields = [
    "firstname",
    "lastname",
    "phone"
]

//save mentor application data
_.insert = function(params, callBack) {
    var q = squel.insert();
    q.into("mentor_application")
        .setFieldsRows([].concat(params.values));
    console.log(q.toString());
    client.query(q.toString(), callBack);
}

//save mentor application data
//{where: {username:}}
_.get = function(params, callBack) {
    var q = squel.select();
    q.from("mentor_application");
	if (params.where) {
		if (params.where['username'])
			q.where("username = ?", params.where['username']);
	}

    client.query(q.toString(), callBack);
}

_.delete = function(params, callBack) {
    var q = squel.delete();
    q.from("mentor_application");
    for (var k in params.where) {
        q.where(k + " = ?", params.where[k]);
    }
    
    client.query(q.toString(), callBack);
}



_.validateApply = function(params, c) {
    //username must be in params.where.
    var t1 = "mentor_profile";
    var t2 = "mentor_application";
    var t3 = "profile";
    var q = squel.update().table(t1, 't1')
    .from(t2, 't2');   
    q.where('t1.username = t2.username');
    for (var k in params.where) {
        q.where("t1." + k + " = ?", params.where[k]);
    }
    _.fields.forEach(function(k){
        q.set("" + k + " = t2." + k);
    });
    q.returning("*");
    var updateString = q.toString();

    var subfields = ['username'].concat(_.fields);
    var subq = squel.select().from(t2, 't2')
        .where("t2.username = ?", params.where.username)
    subfields.forEach(function(k){
        subq.field("t2." + k);
    });
    var q = squel.insert();
    q.into(t1).fromQuery(
        subfields,
        subq
        );
    q.returning("*");

    var insertString = q.toString();

    var q = squel.update();
    q.table(t3, 't3').from(t2, 't2')
    q.where('t3.username = t2.username');
    for (var k in params.where) {
        q.where("t2." + k + " = ?", params.where[k]);
    }
    _.profile_fields.forEach(function(k){
        q.set("" + k + " = t2." + k);
    });
    updateString = q.toString() + ";" + updateString;
    console.log(updateString);
    client.query(updateString, function(r, e) {
        if (r.rows.length > 0) {
            c(r, e);
        } else {
            client.query(insertString, c);
        }
    });
}