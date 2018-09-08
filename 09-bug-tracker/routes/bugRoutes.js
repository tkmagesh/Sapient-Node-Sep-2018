var express = require('express');
var router = express.Router();

var bugService = require('../services/bugService');


router.get('/', function(req, res, next) {  
  //res.json(bugService.getAll());
  bugService.getAll(function(err, bugs){
  	if (err){
  		res.status(500).end();
  	} else {
  		res.json(bugs);
  	}
  })
});


router.post('/', function(req, res, next){
	var newBugData = req.body;
	var newBug = bugService.addNew(newBugData);
	res.status(201).json(newBug);
});


router.put('/:id', function(req, res, next){
	var bugIdToUpdate = parseInt(req.params.id);
	var updatedBug = bugService.update(bugIdToUpdate, req.body);
	if (!updatedBug){
		res.status(404).end();
	} else {
		res.json(updatedBug);
	}
});


router.delete('/:id', function(req, res, next){
	var bugIdToDelete = parseInt(req.params.id);
	var deleteResult = bugService.remove(bugIdToDelete);
	if (!deleteResult){
		res.status(404).end();
	} else {
		res.json(deleteResult);
	}
});



module.exports = router;
