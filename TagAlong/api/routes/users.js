var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt")

const jwt = require('jsonwebtoken');

var monk = require('monk');
var db = monk('localhost:27017/Project');
var userCollection = db.get('Users');
var propertyCollection = db.get('Properties')

router.get('/', function(req, res) {

	const idQuery=req.query.id;
    var props = []
	  if (idQuery){
      userCollection.find({userId: idQuery}, function(err, user){
		  if (err) throw err;
          propertyCollection.find({ propertyId: { $in: user[0].favorites }}, function(err, prop){
              if (err) throw err;
              res.json(prop);
          });
		});
        
	  } 
	
});

router.put('/host', function(req, res) {
  const idQuery=req.query.id;
  const ishostValue = req.body.ishost;

  userCollection.update({ userId: idQuery }, {
    $set: {
    ishost: ishostValue 
  }
  }, function (err, user) {
    if (err) throw err;
    res.json({ishost: user.ishost});
  });
});

router.put('/', function(req, res) {
	const idQuery=req.query.id;
  const propertyId = req.query.propertyId;
  const operation = req.query.op;
  if (operation == "remove") {
    userCollection.update({ userId: idQuery }, {
      $pull: {
        favorites: propertyId
      }
    }, function (err, user) {
      if (err) throw err;
      res.json(user);
    });
  } else if (operation == "add") {
    userCollection.update({ userId: idQuery }, {
      $addToSet: {
        favorites: propertyId
      }
    }, function (err, user) {
      if (err) throw err;
      res.json(user);
    });
  }
  
});

router.post("/register", function (req, res) {
  const { username, email_, password_, phonenumber, street, city, country, sex, zipcode } = req.body;

  if (!(username && email_ && password_)) {
    res.json({ error: "All fields are required!" });
  } else {
    userCollection.findOne({ email: email_ }, function (err, user) {
      if (err) throw err;

      if (user) {
        res.json({ error: "User already exists. Please login!" });
      } else {
        let address = { street, city, country, zipcode };
        let userId_ = 'id' + (new Date()).getTime()
        bcrypt.genSalt(10, (err, salt) => {
          hashPassword(salt, password_, (hashedPassword) => {
            userCollection.insert({
              userId: userId_,
              password: hashedPassword,
              email: email_,
              favorites: [],
              name: username,
              phonenumber: phonenumber,
              ishost: "false",
              address: address,
              sex: sex
            }, function (err, user) {
              if (err) throw err;
              let usertoken = jwt.sign({ user_id: userId_, email_ }, "secretkey");

              if (usertoken) {
                user.token = usertoken;
              }
              res.json(user);
            });
          });

        });

      }

    });
  }
});

async function hashPassword(salt, plaintextPassword, next) {
  const hash = await bcrypt.hash(plaintextPassword, salt);
      return next(hash);
  }


router.post("/login", function (req, res) {
  const { email_, password_ } = req.body;

  if (!(email_ && password_)) {
    res.json({ error: "All fields are required!" });
  } else {
    userCollection.findOne({ email: email_ }, function (err, user) {
      if (err) throw err;
      if (user == null) {
        res.json({ error: "User doesn't exist" });
      } else {
        
        comparePassword(password_, user.password, (result) => {
          if (result) {
            var usertoken_ = jwt.sign({ user_id: user.userId, email_ }, "secretkey");
            user.token = usertoken_;
            let { userId, token, ishost } = user; 
            let sendUserDetail = {userId, token, ishost}
            res.json(sendUserDetail);
          } else {
            res.json({ error: "User email or password is incorrect!" });
          }
        }) 
      }
    });
  }
});

async function comparePassword(plaintextPassword, hash, next) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return next(result);
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
