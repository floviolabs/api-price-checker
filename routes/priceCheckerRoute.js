var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
var jwt = require("../libs/jwt");

var priceCheckerController = require("../controllers/pc/priceCheckerController");

require("dotenv").config();

process.on("uncaughtException", function (err) {
  console.log(err);
});

const detectBearerToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    if (!token) {
      var output = {
        token: "Bearer token not found",
        status: false,
        message: "Error",
        data: [],
      };

      res.contentType("application/json").status(200);
      var valued = JSON.stringify(output);
      res.send(valued);
    }

    const checkToken = await jwt.ConfigurationToken(token);

    if (checkToken.status) {
      next();
    } else {
      var output = {
        token: "Bearer token not found",
        status: false,
        message: "Error",
        data: [],
      };

      res.contentType("application/json").status(200);
      var valued = JSON.stringify(output);
      res.send(valued);
    }
  } else {
    var output = {
      token: "Bearer token not found",
      status: false,
      message: "Error",
      data: [],
    };

    res.contentType("application/json").status(200);
    var valued = JSON.stringify(output);
    res.send(valued);
  }
};

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.use(bodyParser.json());
//router.use(detectBearerToken);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "PT. AEON INDONESIA" });
});

// router.post('/check', priceCheckerController.check);
router.post("/insert", priceCheckerController.insert);
router.post("/validate", priceCheckerController.validate);
// router.post('/validate-insert', priceCheckerController.validateAndInsertDevice);

module.exports = router;
