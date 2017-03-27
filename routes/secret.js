var express = require('express');
var router = express.Router();
var pt = require('periodic-table'); 
var ImageService = require('../modules/imageSaver')

console.log(ImageService)

var CompuestosServices = require('../services/CompuestosService');
var compuestoServices = new CompuestosServices();


router.get('/', function(req, res, next) {
  res.render('secret',{})
});

router.post('/save', function(req, res, next) {
  console.log(req.body)
  ImageService.SaveImage('public/imgs/comps/'+req.body.name,req.body.image);
  res.json({});
});



module.exports = router;
