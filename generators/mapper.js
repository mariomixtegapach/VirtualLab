var readline = require('linebyline'),
      rl = readline('./listedElements.txt');
      fs = require('fs')
      var map = {};
      var realMap = [];
  rl.on('line', function(line, lineCount, byteCount) {
     map[line.trim()] = {
		  "compuestoKey": line.trim(),
		  "name":"",
      "color":"",
		  "components": [],
		  "description": "",
		  "image": "", 
		  "locked": false
		};
  })
  .on('error', function(e) {
    console.log(e) 
  })
  .on('end', function(e){

  	Object.keys(map).forEach(function(key){
  		realMap.push(map[key])
  	});


  	fs.writeFile('res.json',JSON.stringify(realMap));
  	console.log("END");

  })