/**
 * user collection DB Transactions.
 */

exports.create = function(username,password, cb) {
	
	db.collection("user").update({'username':username},{'password':password} , {upsert: true}, function(err, result) {
		cb(err, result);
	});
}

exports.get = function(username,password, cb) {
	db.collection("user").findOne({"username":username}, function(err, result) {
		cb(err, result);
	});
}