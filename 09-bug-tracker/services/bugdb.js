var fs = require('fs'),
	path = require('path');

var dbFile = path.join(__dirname, '../db/bugDb.json');

function read(){
	return new Promise((resolveFn, rejectFn) => {
		fs.readFile(dbFile, function(err, fileContents){
			if (err) return rejectFn(err);
			let data = JSON.parse(fileContents);
			return resolveFn(data);
		});
	});
}

function save(data){
	return new Promise((resolveFn, rejectFn) => {
		fs.writeFile(dbFile, JSON.stringify(data), function(err){
			if (err){
				return rejectFn(err);
			} else {
				return resolveFn(null);
			}
		});	
	})
	
}

module.exports = {
	read : read,
	save : save
};

