//refactoring required to 'db.js' & '/models/Bug.js'
let mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const conn = mongoose.createConnection('mongodb://localhost:27017/learning');

const BugModel = new Schema({
	name : String,
	isClosed : Boolean,
});

const Bug = conn.model('bugs', BugModel);


function getAll(){
	/*return new Promise(function(resolveFn, rejectFn){
		Bug.find({}, function(err, bugs){
			if (!err)
				return resolveFn(bugs);
			console.log(err)
			rejectFn(err);
		});	
	});*/

	return Bug.find({});
}

function addNew(newBugData){
	let newBug = new Bug();
	newBug.name = newBugData.name;
	newBug.isClosed = newBugData.isClosed;
	return newBug.save();
}

//to be fixed
function update(bugIdToUpdate, bugData){
	return new Promise(function(resolveFn, rejectFn){
		Bug
			.findByIdAndUpdate(bugIdToUpdate, bugData, function(err, updatedBug){
				if (err){
					rejectFn(err);
					return;
				} else {
					console.log(updatedBug);
					resolveFn(updatedBug)
				}
			});
			
	});
	
}

//to be fixed
function remove(bugIdToDelete){
	return Bug.findByIdAndRemove({ "_id" :bugIdToDelete});
}

module.exports = { getAll, addNew, update, remove };