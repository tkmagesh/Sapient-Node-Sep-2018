//refactoring required to 'db.js' & '/models/Bug.js'
let mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const conn = mongoose.createConnection('mongodb://mongo/learning');

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

//to be fixed -> Fixed.
function update(bugIdToUpdate, bugData){
	return Bug.findByIdAndUpdate(bugIdToUpdate, bugData, function(err, foundDoc){
		// .findByIdAndUpdate() returns found document to the callback, not the updated document.
		// And we are expecting updated document in the bugRoutes, hence, we return bugData
		// Another Option: In BugRoutes, where .then() calls function with the object received from BugService, 
		// we can modify it to send the req.body instead which will thereby be returned in the response.
		if (err){
			return err;
		} else {
			return bugData;
		}
	});
}

//to be fixed : Working Fine -> Deletes the document and returns the deleted document.
function remove(bugIdToDelete){
	return Bug.findByIdAndRemove({ "_id" :bugIdToDelete});
}

module.exports = { getAll, addNew, update, remove };