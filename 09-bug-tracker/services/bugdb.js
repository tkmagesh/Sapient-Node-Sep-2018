var fs = require('fs'),
	path = require('path');

var dbFile = path.join(__dirname, '../db/bugDb.json');

function read(callback){
	fs.readFile(dbFile, function(err, fileContents){
		let data = JSON.parse(fileContents);
		if (err){
			return callback(err, null);
		} else {
			return callback(null, data);
		}
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

