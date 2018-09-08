var fs = require('fs'),
	path = require('path');

var dbFile = path.join(__dirname, '../db/bugDb.json');

function read(){
	return new Promise(function(resolveFn, rejectFn){
		fs.readFile(dbFile, function(err, fileContents){
			if (err) return rejectFn(err);
			let data = JSON.parse(fileContents);
			return resolveFn(data);
		});
	});
}

function save(data){
	fs.writeFile(dbFile, JSON.stringify(data), function(err){
		if (err){
			return callback(err)
		} else {
			return callback(null);
		}
	});
}

module.exports = {
	read : read,
	save : save
};

