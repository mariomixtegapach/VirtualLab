var express = require('express');
var router = express.Router();
var pt = require('periodic-table'); 

var CompuestosServices = require('../services/CompuestosService');
var compuestoServices = new CompuestosServices();

var allElements = pt.all().filter(function(el){
 	return el.groupBlock != 'noble gas' && el.groupBlock != 'actinoid' 
});

router.get('/', function(req, res, next) {

	compuestoServices.GetAllElements().then(function(elements){


		var unlockedElements = allElements.filter(function(element){
			var isIn = false;

			elements.forEach(function(sEl){
				isIn |= sEl.compuestoKey.toLowerCase() == element.symbol.toLowerCase();
			})

			return isIn;
		});

	  	res.render('index', { elements: unlockedElements });
	  }, function(err){
	    console.log(err)
	  	res.json({err: true, message: err.message});
	  })

  
});

module.exports = router;
