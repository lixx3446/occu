var pg = require('pg');

//Unfortunately i have only time to do this much yet
//Future improvement
var config = {
            user: "xbwimqyoderpce",
            password: "8T_OD4wJ2ilkt8ylH9W9lqlGlG",
            database: "d8fmtsmf5sv52f",
            port: 5432,
            host: "ec2-54-204-12-25.compute-1.amazonaws.com",
            ssl: true
        };

//Client implementation using connection pool
var Client = function() {
	var _ = this;
	_.query = function(queryStr, resultCallBack) {
		pg.connect(config, function(err, client, done) {
	        client.query(queryStr, function(err, result) {

				if (err) {
					console.error(JSON.stringify({query: queryStr, error: err}));
				}
	          done();
		      resultCallBack && resultCallBack(result, err);
	        })
      });
	}
}

module.exports = new Client();