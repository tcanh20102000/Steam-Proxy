var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  console.log("Here home");
  res.send("API home is working properly");
});

module.exports = router;
