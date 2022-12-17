var express = require("express");
var router = express.Router();

var monk = require("monk");
// const { get, post } = require(".");
var db = monk("localhost:27017/Project");
var ratings_collection = db.get("Ratings");

router.post("/", function (req, res) {
  ratings_collection.insert(
    {
      userId: req.body.userId,
      propertyId: req.body.propertyId,
      ratings: req.body.ratings,
      feedback: req.body.feedback,
    },
    function (err, user) {
      if (err) throw err;
      res.json(user);
    }
  );
});

module.exports = router;
