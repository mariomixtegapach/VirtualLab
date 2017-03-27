var readline = require('linebyline'),
      rl = readline('./listedElements.txt');

      fs = require('fs')
      var map = {};
      var realMap = [];
  rl.on('line', function(line, lineCount, byteCount) {
     map[line.trim()] = 2
  })
  .on('error', function(e) {
    console.log(e) 
  })
  .on('end', function(e){

  	rl2 = readline('./pastLists.txt')
    .on('line', function(line, lineCount, byteCount) {
       map[line.trim()] =  map[line.trim()] ? map[line.trim()] = 1 : 2;
    })
    .on('error', function(er) {
      console.log(er) 
    })
    .on('end', function(er){
      var arr = [];

      Object.keys(map).forEach(function(key){
        if(map[key] > 1){
          arr.push(key);
        }
      })



      fs.writeFile('newList.json',JSON.stringify(arr));
    })

  	//fs.writeFile('res.json',JSON.stringify(realMap));
  	console.log("END");

  })