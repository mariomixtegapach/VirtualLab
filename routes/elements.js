var express = require('express');
var router = express.Router();

var CompuestosServices = require('../services/CompuestosService');
var compuestoServices = new CompuestosServices();

function getCombination(a, b){
  var elementsArrayMini = a.match(/[A-Z][a-z]+|[A-Z][a-z]+?[\d]|[A-Z][\d]|[A-Z]/g);
  var elementsCount = {};
  
  elementsArrayMini.forEach(function(miniElement){
    var elementsArray = miniElement.split(/(\d)/);
  
    elementsArray.forEach(function(el, i){
      if(isNaN(el)) elementsCount[el] = elementsCount[el] ?elementsCount[el]+ (+elementsArray[i+1] || 1) : (+elementsArray[i+1] || 1);
    });
  });

  elementsArrayMini = b.match(/[A-Z][a-z]+|[A-Z][a-z]+?[\d]|[A-Z][\d]|[A-Z]/g);
  
   elementsArrayMini.forEach(function(miniElement){
    var elementsArray = miniElement.split(/(\d)/);
  
    elementsArray.forEach(function(el, i){
      if(isNaN(el)) elementsCount[el] = elementsCount[el] ?elementsCount[el]+ (+elementsArray[i+1] || 1) : (+elementsArray[i+1] || 1);
    });

  });
  /*elementsArray = b.split(/(\d)/);
      
  elementsArray.forEach(function(el, i){
    if(isNaN(el)) elementsCount[el] = elementsCount[el] ?elementsCount[el]+ (+elementsArray[i+1] || 1) : (+elementsArray[i+1] || 1);
  });*/

  var res = '';
  console.log(elementsCount)
  Object.keys(elementsCount).forEach(function(key){ res +=key + (elementsCount[key] != 1 ? elementsCount[key] : ''); })

  return res;
}

router.get('/', function(req, res) {
  compuestoServices.GetUnlockedCompuestos().then(function(elements){
  	res.json({ elements: elements});
  }, function(err){
    console.log(err)
  	res.json({err: true, message: err.message});
  })
});

router.get('/unlock/:symbol/:color', function(req, res) {

	var symbol = req.params.symbol;
  var color = req.params.color;

  compuestoServices.UpdateCompuestoBySymbol(symbol,true,color).then(function(elements){
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

  var compuestoA = getCombination(symbola,symbolb);
  var compuestoB = getCombination(symbolb,symbola);

  console.log("Trying ", compuestoA, compuestoB);

  compuestoServices.GetCompuestoBySymbol(compuestoA).then(function(element){
    if(element.length){
      console.log("Found one")
      res.json({element: element, err: false})  
    } else {
      compuestoServices.GetCompuestoBySymbol(compuestoB).then(function(element2){
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
