var express = require('express');
var router = express.Router();
var pt = require('periodic-table'); 

var allElements = pt.all().filter(function(el){
 	return el.groupBlock != 'noble gas' && el.groupBlock != 'actinoid' 
});

router.get('/', function(req, res, next) {
  res.render('index', { elements: allElements });
});

module.exports = router;
