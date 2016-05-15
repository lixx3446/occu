var client = require("./client.js");
var squel = require("./squel");

// This select with json_array_elements could be used with like
// q.from('json_array_elements(...)');
// Anyway, good job with such a long query!
var User = function() {
	var _ = this;

    //query for json hurts
	_.getMentorList = function(params, callBack){
		//q is to filter from mentor_profile
		var q = "(select * from mentor_profile";
		for(var key in params){
			if(key=="education"){
				q += ",json_array_elements(mentor_profile.education) AS elem1";
			}
			if(key=="job"){
				q += ",json_array_elements(mentor_profile.job) AS elem2";
			}
			if(key=="interview"){
				q += ",json_array_elements(mentor_profile.interview) AS elem3";
			}
		}
		var count = 0;
		for(var key in params){
			if(key=="education"){
				if(count==0){q+=" where ";}
				if(count!=0){q+=" and "}
				q += "elem1->>'edu'='" + params[key].replace(/'/g,"''") + "'";
				count++;
			}
			if(key=="job"){
				if(count==0){q+=" where ";}
				if(count!=0){q+=" and "}
				q += "elem2->>'company'='" + params[key].replace(/'/g,"''") + "'";
				count++;
			}
			if(key=="interview"){
				if(count==0){q+=" where ";}
				if(count!=0){q+=" and "}
				q += "elem3->>'company'='" + params[key].replace(/'/g,"''") + "'";
				count++;
			}
		}
		q+=")";


		//query is to join with profile
		var query = "select * from " + q + " s ";
		query = query + "inner join " + "profile" + " t " + "on" + " t.username=s.username";


		client.query(query.toString(), function(result, err){
			//console.log();
			callBack(result, err);
		});
	};

	_.getUser = function(params, callBack) {
		var q = squel.select();
		q.from("profile")
			.field("*");
		if (params.where) {
			if (params.where['username'])
				q.where("profile.username = ?", params.where['username']);
		}
		q.field("case when mentor_profile.* is null then 0 else 1 end", "is_mentor");		
		q.left_join("mentor_profile", null, "profile.username = mentor_profile.username");
		
		client.query(q.toString(), function(result, err){
			//console.log();
			callBack(result, err);
		});
	};

    //not in use
	_.addUser = function(params, callBack) {
		var q = squel.insert({numberedParameters: true});
		q.into("mentor")
		.set("username", params.username)
		.set("firstName", params.firstName)
		.set("lastName", params.lastName)
		.set("email", params.email);

		client.query(q.toString(), function(result, err){
			//console.log();
			callBack(result, err);
		});
	}

    //not in use
	_.deleteUser = function(params, callBack) {

	};

	_.insertUserMentor = function(p, c) {
		var q = squel.insert();
		values = [].concat(p.values);
		q.into("mentor_profile")
		.setFieldsRows(values).returning("*");

		client.query(q.toString(), c);
	}

    //update mentor profile
	_.updateUserMentor = function(params, callBack) {
		var q = squel.update();
		q.table("mentor_profile");
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

		client.query(q.toString(), function(result, err){
			//console.log();
			callBack(result, err);
		});
	};

    //update profile
    _.updateUser = function(params, callBack) {
        var q = squel.update();
        q.table("profile");
        console.log(JSON.stringify(params));
        for (var k in params.values) {
            if(params.values[k] != null)  //check what's the value here////////////////////////////////////////////////////////////
                q.set(k, params.values[k]);
        }

        for (var k in params.where) {
            q.where(k + " = ?", params.where[k]);
            console.log(params.where);
        }

        client.query(q.toString(), function(result, err){
            //console.log();
            callBack(result, err);
        });
    };
}

module.exports = new User();