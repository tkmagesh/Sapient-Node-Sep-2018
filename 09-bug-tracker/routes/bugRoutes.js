var express = require('express');
var router = express.Router();

var bugService = require('../services/bugService');


router.get('/', function(req, res, next) {  
  //res.json(bugService.getAll());
 /* bugService.getAll(function(err, bugs){
  	if (err){
  		res.status(500).end();
  	} else {
  		res.json(bugs);
  	}
  })*/

  bugService
  	.getAll()
  	.then(function(bugs){
  		res.json(bugs);
  	})
  	.catch(function(err){
  		res.status(500).end();
  	});
});


router.post('/', function(req, res, next){
	var newBugData = req.body;
	bugService
		.addNew(newBugData)
		.then(function(newBug){
			res.status(201).json(newBug);		
		});
	
});


router.put('/:id', function(req, res, next){
	var bugIdToUpdate = parseInt(req.params.id);
	bugService
		.update(bugIdToUpdate, req.body)
		.then(function(updatedBug){
			res.json(updatedBug);	
		})
		.catch(function(err){
			res.status(404).end();	
		});
});


router.delete('/:id', function(req, res, next){
	var bugIdToDelete = parseInt(req.params.id);
	bugService
		.remove(bugIdToDelete)
		.then(function(deleteResult){
			res.json(deleteResult);	
		})
		.catch(function(err){
			res.status(404).end();	
		});
});



module.exports = router;
