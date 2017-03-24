var express = require('express');
var router = express.Router();

var CompuestosServices = require('../services/CompuestosService');
var compuestoServices = new CompuestosServices();

router.get('/', function(req, res) {
  compuestoServices.GetAllElements().then(function(elements){
  	res.json({ elements: elements});
  }, function(err){
    console.log(err)
  	res.json({err: true, message: err.message});
  })
});

router.get('/unlock/:symbol', function(req, res) {

	var symbol = req.params.symbol;

  compuestoServices.UpdateCompuestoById(symbol,true).then(function(elements){
  	res.json({ elements: elements});
  }, function(err){
  	res.json({err: true, message: err.message});
  })
});

router.get('/lock/:symbol', function(req, res) {

	var symbol = req.params.symbol;

  compuestoServices.UpdateCompuestoById(symbol,false).then(function(elements){
  	res.json({ elements: elements});
  }, function(err){
  	res.json({err: true, message: err.message});
  })
});

router.get('/try/:symbol', function(req, res){
  compuestoServices.GetCompuestoBySymbol(req.params.symbol).then(function(element){
    res.json({element: element})
  }, function(err){
    console.log(err);
    res.json({err: true, message: err.message});
  })
});

module.exports = router;
