/**
 * user collection DB Transactions.
 */

exports.create = function(username,password, cb) {
	
	db.collection("user").update({'username':username},{'password':password} , {upsert: true}, function(err, result) {
		cb(err, result);
	});
}

exports.get = function(name,password, cb) {
	db.collection('user').findOne({username:name}, function(err, result) {
		console.log('error'+err);
		console.log('result'+result);
		cb(err, result);
	});
}