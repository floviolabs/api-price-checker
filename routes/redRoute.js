var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var jwt = require('../libs/jwt');

var eventController = require('../controllers/red/eventController');
var itemController = require('../controllers/red/itemController');
var receivingController = require('../controllers/red/receivingController');
var returnController = require('../controllers/red/returnController');
var redemptionController = require('../controllers/red/redemptionController');
var reportController = require('../controllers/red/reportController');

require('dotenv').config();

process.on('uncaughtException', function (err) {
    console.log(err);
  });

const detectBearerToken = async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {

        const token = authHeader.split(' ')[1];
        if (!token) {
          var output = {
              "token": "Bearer token not found",
              "status" : false,
              "message": "Error",
              "data": []
          }

          res.contentType('application/json').status(200);
          var valued = JSON.stringify(output);
          res.send(valued);
        }
    
        const checkToken = await jwt.ConfigurationToken(token);

        if(checkToken.status){
          next();
        }else{
          var output = {
              "token": "Bearer token not found",
              "status" : false,
              "message": "Error",
              "data": []
          }

          res.contentType('application/json').status(200);
          var valued = JSON.stringify(output);
          res.send(valued);
        } 

    }else{
      var output = {
          "token": "Bearer token not found",
          "status" : false,
          "message": "Error",
          "data": []
      }

      res.contentType('application/json').status(200);
      var valued = JSON.stringify(output);
      res.send(valued);
    } 
};

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(bodyParser.json());
router.use(detectBearerToken);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PT. AEON INDONESIA' });
});

// Event
router.post('/event/list', eventController.showList);
router.post('/event/list-by-store', eventController.showListByStore);
router.post('/event/list-active-by-store', eventController.showListActiveByStore);
router.post('/event/add', eventController.addData);
router.post('/event/delete', eventController.deleteData);
router.post('/event/update', eventController.updateData);

// Items
router.post('/item/list', itemController.showList);
router.post('/item/list-by-store', itemController.showListByStore);
router.post('/item/list-active-by-store', itemController.showListActiveByStore);
router.post('/item/list-by-event', itemController.showListByEvent);
router.post('/item/add', itemController.addData);
router.post('/item/delete', itemController.deleteData);
router.post('/item/update', itemController.updateData);

// Receiving
router.post('/receiving/list', receivingController.showList);
router.post('/receiving/detail', receivingController.showDetailbyId);
router.post('/receiving/list-by-store', receivingController.showListByStore);
router.post('/receiving/add', receivingController.addData);

// Return
router.post('/return/list', returnController.showList);
router.post('/return/detail', returnController.showDetailbyId);
router.post('/return/list-by-store', returnController.showListByStore);
router.post('/return/add', returnController.addData);

// Redemption
router.post('/redemption/list', redemptionController.showList);
router.post('/redemption/detail', redemptionController.showDetailbyId);
router.post('/redemption/list-by-store', redemptionController.showListByStore);
router.post('/redemption/add', redemptionController.addData);

// Report
router.post('/report/stock', reportController.stock);
router.post('/report/redemption', reportController.redemption);

module.exports = router;