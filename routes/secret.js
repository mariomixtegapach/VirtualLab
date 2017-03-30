var express = require('express');
var router = express.Router();
var pt = require('periodic-table'); 
var ImageService = require('../modules/imageSaver')

console.log(ImageService)

var CompuestosServices = require('../services/CompuestosService');
var compuestoServices = new CompuestosServices();


router.get('/', function(req, res, next) {
	compuestoServices.GetElementNotComplete().then(function(ell){
  			var el = ell[new Date().getTime() % ell.length];
  res.render('secret',{ newEl : el})
  		}, function(err){
  			console.log(err);
  			res.status(500).json({});
  		});
  
});

router.post('/save', function(req, res, next) {
  	var compuesto = req.body;
  ImageService.SaveImage('public/imgs/comps/'+req.body.name,req.body.image).then(function(a){
  		compuesto.image = '/imgs/comps/'+a.imgName;
  		

  		compuestoServices.UpdateCompuestoInfoBySymbol(compuesto.compuestoKey, compuesto)
  			.then(function(done){
		  		compuestoServices.GetElementNotComplete().then(function(ell){
		  			var el = ell[new Date().getTime() % ell.length];
		  			res.json({ newEl : el});	
		  		}, function(err){
		  			console.log(err);
		  			res.status(500).json({});
		  		});
  			}, function(err){
  				console.log(err);
		  		res.status(500).json({});
  			})


  		
  }, function(err){
	console.log(err);
	res.status(500).json({});
});

  
});



module.exports = router;
