var bugDb = require('./bugDb');

var list = [];

bugDb
	.read()
	.then(function(bugs){
		list = bugs;
	}); 

function getAll(/*callback*/){
	/*bugDb.read(function(err, bugs){
		list = [];
		callback(err, bugs);
	});*/

	/*return bugDb
		.read()
		.then(function(bugs){
			list = bugs;
			return list;
		});*/

	return Promise.resolve(list);
}

function addNew(newBugData){
	/*var newBugId = list.reduce(function(result, bug){
		return result > bug.id ? result : bug.id;
	}, 0) + 1;*/

	var newBugId = list.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1;
	newBugData.id = newBugId;
	list.push(newBugData);
	/*return bugDb
		.save(list)
		.then(function(){
			return newBugData;
		});*/
	return bugDb
		.save(list)
		.then(() => newBugData);
	
}

function update(bugIdToUpdate, bugData){
	/*var bugToUpdate = list.find(function(bug){
		return bug.id === bugIdToUpdate;
	});*/

	var bugToUpdate = list.find(bug => bug.id === bugIdToUpdate);

	if (!bugToUpdate){
		return Promise.reject(new Error('Bug not found'));
	} else {
		/*list = list.map(function(bug){
			return bug.id === bugIdToUpdate ? bugData : bug;
		});*/

		list = list.map(bug => bug.id === bugIdToUpdate ? bugData : bug);
		
		/*return bugDb
			.save(list)
			.then(function(){
				return bugData;
			});*/
		return bugDb
			.save(list)
			.then(() => bugData);
	}
}

function remove(bugIdToDelete){
	var bugToDelete = list.find(function(bug){
		return bug.id === bugIdToDelete;
	});
	if (!bugToDelete){
		return Promise.reject(new Error('Bug not found'));
	} else {
		list = list.filter(function(bug){
			return bug.id !== bugIdToDelete;
		});
		return bugDb.save(list);
	}
}

module.exports = {
	getAll : getAll,
	addNew : addNew,
	update : update,
	remove : remove
};

