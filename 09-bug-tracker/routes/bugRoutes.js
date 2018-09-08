var express = require('express');
var router = express.Router();

var list = [
	{id : 1, name : "Server communication failure", isClosed : false},
	{id : 2, name : "User actions not recognized", isClosed : true}
];


router.get('/', function(req, res, next) {  
  res.json(list);
});

router.post('/', function(req, res, next){
	var newBug = req.body;
	var newBugId = list.reduce(function(result, bug){
		return result > bug.id ? result : bug.id;
	}, 0) + 1;
	newBug.id = newBugId;
	list.push(newBug);
	res.status(201).json(newBug);
});

router.put('/:id', function(req, res, next){
	var bugIdToUpdate = parseInt(req.params.id);
	var updatedBug = req.body;
	var bugToUpdate = list.find(function(bug){
		return bug.id === bugIdToUpdate;
	});
	if (!bugToUpdate){
		res.status(404).end();
	} else {
		list = list.map(function(bug){
			return bug.id === bugIdToUpdate ? updatedBug : bug;
		});
		res.json(updatedBug);
	}
});

router.delete('/:id', function(req, res, next){
	var bugIdToDelete = parseInt(req.params.id);
	
	var bugToDelete = list.find(function(bug){
		return bug.id === bugIdToDelete;
	});
	if (!bugToDelete){
		res.status(404).end();
	} else {
		list = list.filter(function(bug){
			return bug.id !== bugIdToDelete;
		});
		res.json({});
	}
});



module.exports = router;
