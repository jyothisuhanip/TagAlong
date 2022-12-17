var express = require('express');
var router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var monk = require("monk");
var db = monk("localhost:27017/WPL");
var collection = db.get("users");
var ObjectID = require("mongodb").ObjectId;

//Logging
var log4js = require("log4js");
const { request } = require("../app");
var logger = log4js.getLogger();
logger.level = "debug";


router.get("/encrpytion/:state", function (req, res) {
  let hashedPassword;
  bcrypt.genSalt(10, function (err, Salt) {
    bcrypt.hash(req.params.state, Salt, function (err, hash) {
      if (err) {
        res.json({ error: "'Cannot encrypt password'" });
      } else {
        console.log("Hash:", typeof hash);
        hashedPassword = hash;
        res.json({ password: hashedPassword });
      }
    });
  });
});


/* Register Users */
// router.post("/register", function (req, res) {
//   const { username, email, password } = req.body;

//   if (!(username && email && password)) {
//     res.json({ error: "All fields are required!" });
//   } else {
//     collection.findOne({ email: email }, function (err, user) {
//       if (err) throw err;

//       if (user) {
//         res.json({ error: "User already exists. Please login!" });
//       } else {
//         let newUser = {
//           username,
//           email,
//           password,
//         };
//         collection.insert(newUser, function (err, user) {
//           if (err) throw err;
//           var token = jwt.sign({ user_id: user._id, email }, "secretkey");

//           if (token) {
//             user.token = token;
//           }
//           res.json({success: "Resgister Successfully"});
//         });
//       }
//     });
//   }
// });

router.post("/updatepass", function (req, res) {
  let { email, password } = req.body;
  collection.findOne({ email: email }, function (err, user) {
    if (err) throw err;
    if (user) {
      collection.update(
        { email: email },
        { $set: { password: password } },
        function (err, user) {
          if (err) throw err;
          res.json(user);
        }
      );
      res.json(user);
    }
  });
});


router.post("/login", function (req, res) {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.json({ error: "All fields are required!" });
  } else {
    collection.findOne({ email: email }, function (err, user) {
      if (err) throw err;
      if (user == null) {
        res.json({ error: "User doesn't exist" });
      } else {
        if (user.password === password) {
          var token = jwt.sign({ user_id: user._id, email }, "secretkey");
          user.token = token;
          //res.json(user);
          res.json({success :"Login Successfull"})
        } else {
          res.json({ error: "User email or password is incorrect!" });
        }
      }
    });
  }
});





module.exports = router;
