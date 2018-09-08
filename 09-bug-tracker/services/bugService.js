var bugDb = require('./bugDb');

var list = [];

function getAll(/*callback*/){
	/*bugDb.read(function(err, bugs){
		list = [];
		callback(err, bugs);
	});*/

	return bugDb.read();
}

function addNew(newBugData){
	var newBugId = list.reduce(function(result, bug){
		return result > bug.id ? result : bug.id;
	}, 0) + 1;
	newBugData.id = newBugId;
	list.push(newBugData);
	return newBugData;
}

function update(bugIdToUpdate, bugData){
	var bugToUpdate = list.find(function(bug){
		return bug.id === bugIdToUpdate;
	});
	if (!bugToUpdate){
		return null;
	} else {
		list = list.map(function(bug){
			return bug.id === bugIdToUpdate ? bugData : bug;
		});
		return bugToUpdate;
	}
}

function remove(bugIdToDelete){
	var bugToDelete = list.find(function(bug){
		return bug.id === bugIdToDelete;
	});
	if (!bugToDelete){
		return null;
	} else {
		list = list.filter(function(bug){
			return bug.id !== bugIdToDelete;
		});
		return {};
	}
}

module.exports = {
	getAll : getAll,
	addNew : addNew,
	update : update,
	remove : remove
};

