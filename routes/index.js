var express = require('express');
var router = express.Router();
var path = require('path');

// All RNP //
var redRoute = require('../routes/redRoute');
var checkerRoute = require('../routes/priceCheckerRoute');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PT. AEON INDONESIA' });
});

router.use('/red', redRoute);
router.use('/pc', checkerRoute);

module.exports = router;