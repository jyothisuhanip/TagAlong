var express = require('express');
var router = express.Router();

var monk = require('monk');
const verifyToken = require('./TokenVerification');
var db = monk('localhost:27017/Project');
const jwt = require('jsonwebtoken');
var reservationCollection = db.get('Reservations');
var propertyCollection = db.get('Properties')


router.get('/', function(req, res) {

	const userIdquery=req.query.userid;
    const reservationIdquery = req.query.reservationid;

    if(userIdquery != undefined) { // show all reservations for a user

        reservationCollection.aggregate([
            { "$match":  {"userId" : userIdquery} },
            {
                "$lookup": {
                    "from": "Properties",
                    "localField": 'propertyId',
                    "foreignField": 'propertyId',
                    "as": 'property'
                }
            }, 
            {$unwind: '$property'},
            {
               "$project" : { 
                    "checkIn": "$checkIn",
                    "checkOut": "$checkOut",
                    "reservationId": "$reservationId",
                    "propertyId": "$property.propertyId",
                    "hostId": "$property.hostId",
                    "categoryId": "$property.categoryId",
                    "title": "$property.title",
                    "locationDetail": "$property.locationDetail",
                    "description": "$property.description",
                    "availability": "$property.availability",
                    "fullDescription": "$property.fullDescription",
                    "nightlyfee": "$property.nightlyfee",
                    "cleaningfee": "$property.cleaningfee",
                    "servicefee": "$property.servicefee",
                    "amenities": "$property.amenities",
                    "bedrooms": "$property.bedrooms",
                    "bathrooms": "$property.bathrooms",
                    "guests": "$property.guests",
                    "images": "$property.images",
                    "rating": "$property.rating",
                    "review_count": "$property.review_count"
                } 
            }
        ], function(err, reservations) {
            if (err) throw err;
            res.json(reservations);
        });

    } else { // show a reservation
        reservationCollection.find({reservationId : reservationIdquery}, function(err, reservation){
            if (err) throw err;
              res.json(reservation);
        });
    }
});




// add a new reservation

//insert
router.post('/', function(req, res) {

    const idQuery=req.query.userid;
	reservationCollection.insert({ 
		reservationId : req.body.reservationId,
        propertyId : req.body.propertyId,
        userId : String(idQuery),
        checkIn : req.body.checkIn,
        checkOut : req.body.checkOut,
        paymentId : req.body.paymentId,
        upcoming : req.body.upcoming		
	}, function(err, reservation) {
		if (err) throw err;
		// if insert is successfull, it will return newly inserted object
	  	res.json(reservation);
	});
});


//delete a reservation

router.delete('/', function(req, res) {
    // verifyToken(req, res);
    verifyToken(req, res, (userid) => {
        console.log(userid);
        const idQuery = req.query.reservationid;
        reservationCollection.remove({ reservationId: idQuery }, function (err, reservation) {
            if (err) throw err;
            res.json(reservation);
        });
    });
        // const idQuery = req.query.reservationid;
        // reservationCollection.remove({ reservationId: idQuery }, function (err, reservation) {
        //     if (err) throw err;
        //     res.json(reservation);
        // });
	
});

module.exports = router;
