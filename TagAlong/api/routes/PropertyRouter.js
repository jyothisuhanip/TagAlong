var express = require('express');
var router = express.Router();
// const upload = require('../middleware/upload')

var monk = require('monk');
var db = monk('localhost:27017/Project');
var propertyCollection = db.get('Properties');

// show all properties
router.get('/', function(req, res) {

	const idQuery=req.query.id;
	const hostidQuery = req.query.hostId;
	// show all properties
	  if (!idQuery && !hostidQuery){
		propertyCollection.find({}, function(err, property){
		  if (err) throw err;
			res.json(property);
		});
	
	  } else if(hostidQuery) {
		propertyCollection.find({hostId : hostidQuery}, function(err, prop){
			if (err) throw err;
			  res.json(prop);
		});
	  } else {	 // show a property
		propertyCollection.find({propertyId : idQuery}, function(err, prop){
			if (err) throw err;
			  res.json(prop);
		});}
	
});

// add a new property

//insert
router.post('/', function(req, res) {
	let filePath;
	console.log(req.files)
	if(req.file) {
		// let path = 	'';
		// req.files.forEach(function(files, index, arr) {
		// 	path = path + files.path + ','
		// })
		// path = path.substring(0, path.lastIndexOf(","))
		filePath = req.file;
	}
	console.log(filePath);
	let availability_ = new Date(req.body.checkIn).toLocaleString('default', { month: 'long' }).substring(0, 3) + ' ' + new Date(req.body.checkIn).getDate()  
	+ ' - ' + new Date(req.body.checkOut).toLocaleString('default', { month: 'long' }).substring(0, 3) + ' ' +new Date(req.body.checkOut).getDate() ;
	propertyCollection.insert({ 
				propertyId: "pid"+ (new Date().getTime()),
				hostId: req.body.hostId,
				categoryId: "9002",
   				title: req.body.title,
   				locationDetail: req.body.locationDetail,
   				description: req.body.description,
   				availability: availability_,
   				fullDescription: req.body.fullDescription,
				nightlyfee: req.body.nightlyfee,
				cleaningfee: req.body.cleaningfee,
				servicefee: req.body.servicefee,
				amenities: req.body.amenities,
				bedrooms: req.body.bedrooms,
				bathrooms: req.body.bathrooms,
				guests: 0,
				images: ["prop5-img3.jpg", "prop2-img3.jpg", "prop4-img3.jpg"],
				imageFilePath: filePath,
				rating: 0.0,
				review_count: 0,
				checkIn: req.body.checkIn,
				checkOut: req.body.checkOut
	}, function(err, property){
		if (err) throw err;
		// if insert is successfull, it will return newly inserted object
	  	res.json(property);
	});
});

//update
router.put('/', function(req, res) {
	//req.body is used to read form input
	let availability_ = new Date(req.body.checkIn).toLocaleString('default', { month: 'long' }).substring(0, 3) + ' ' + new Date(req.body.checkIn).getDate()  
	+ ' - ' + new Date(req.body.checkOut).toLocaleString('default', { month: 'long' }).substring(0, 3) + ' ' +new Date(req.body.checkOut).getDate() ;
	const idQuery=req.query.id;
	console.log(req.body);
	propertyCollection.update({propertyId: idQuery },
		{ $set: {
			hostId: req.body.hostId,
			categoryId: "9002",
			title: req.body.title,
			locationDetail: req.body.locationDetail,
			description: req.body.description,
			availability: availability_,
			fullDescription: req.body.fullDescription,
			nightlyfee: req.body.nightlyfee,
			cleaningfee: req.body.cleaningfee,
			servicefee: req.body.servicefee,
			amenities: req.body.amenities,
			bedrooms: req.body.bedrooms,
			bathrooms: req.body.bathrooms,
			guests: req.body.guests,
			images: ["prop5-img3.jpg", "prop2-img3.jpg", "prop4-img3.jpg"],
			rating: req.body.rating,
			review_count: req.body.review_count,
			checkIn: req.body.checkIn,
			checkOut: req.body.checkOut
		 }
	}, function(err, property){
		if (err) throw err;
		// if update is successfull, it will return updated object
	  	res.json(property);
	});
});

router.put('/deleteProperty', function(req, res) {
	//req.body is used to read form input
	const idQuery=req.query.id;
	propertyCollection.update({propertyId: idQuery },
		{ $set: {
			availability: req.body.availability
		 }
	}, function(err, property){
		if (err) throw err;
		// if update is successfull, it will return updated object
	  	res.json(property);
	});
});






//delete

router.delete('/', function(req, res) {
	const idQuery=req.query.id;
	propertyCollection.remove({ propertyId: idQuery }, function(err, property){
		if (err) throw err;
	  	res.json(property);
	});
});






module.exports = router;
