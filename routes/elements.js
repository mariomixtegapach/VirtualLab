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

router.get('/try/:symbola/:symbolb', function(req, res){

  var symbola = req.params.symbola;
  var symbolb = req.params.symbolb;

  compuestoServices.GetCompuestoBySymbol(symbolb+symbola).then(function(element){
    if(element.length){
      console.log("Found one")
      res.json({element: element, err: false})  
    } else {
      compuestoServices.GetCompuestoBySymbol(symbola+symbolb).then(function(element2){
        if(element2.length){
          console.log("Found two")
          res.json({element: element2, err: false})  
        } else {
          console.log("Not found")
          res.json({err: true, message: 'not found'});      
        }
      },  function(err){
          console.log(err);
          res.json({err: true, message: err.message});
        });
    }
    
  }, function(err){
    console.log(err);
    res.json({err: true, message: err.message});
  })
});

module.exports = router;
