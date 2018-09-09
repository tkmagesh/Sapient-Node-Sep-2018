var fs = require('fs'),
	path = require('path'),
	utils = require('../utils/utils');

var bluebird = require("bluebird");

var dbFile = path.join(__dirname, '../db/bugDb.json');
/*
var readFileAsync = utils.promisify(fs.readFile);
var writeFileAsync = utils.promisify(fs.writeFile);
*/

var readFileAsync = bluebird.promisify(fs.readFile);
var writeFileAsync = bluebird.promisify(fs.writeFile);
/*function read(){
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
	
}*/

function read(){
	return readFileAsync(dbFile)
		.then(fileContents => JSON.parse(fileContents));


	/*return new Promise((resolveFn, rejectFn) => {
		fs.readFile(dbFile, function(err, fileContents){
			if (err) return rejectFn(err);
			let data = JSON.parse(fileContents);
			return resolveFn(data);
		});
	});*/
}

function save(data){
	return writeFileAsync(dbFile, JSON.stringify(data));
	/*return new Promise((resolveFn, rejectFn) => {
		fs.writeFile(dbFile, JSON.stringify(data), function(err){
			if (err){
				return rejectFn(err);
			} else {
				return resolveFn(null);
			}
		});	
	})*/
	
}

module.exports = {
	read : read,
	save : save
};

