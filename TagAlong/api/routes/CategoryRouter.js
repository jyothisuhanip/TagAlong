var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Project');
var categoryCollection = db.get('Categories');
var propertyCollection = db.get('Properties');

router.get('/', function(req, res) {

	categoryCollection.find({}, function(err, category){
		if (err) throw err;
		  res.json(category);
	  });
});

module.exports = router;
