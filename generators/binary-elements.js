var pt = require('periodic-table'); 
var allElements = pt.all();



allElements.forEach(function(element){
	element.oxidationStates = element.oxidationStates.toString().split(',');
});

//console.log(allElements)

var elements = [];
allElements.forEach(function(element){
	var inThisElement = [];
	
	element.oxidationStates.forEach(function(oxidation){
		allElements.forEach( function(el){
			el.oxidationStates.forEach(function(ox){
				if(Math.abs(ox) - Math.abs(oxidation) == 0){
					inThisElement.push({ comps : el.symbol+element.symbol, elements : [el,elements]});
				} else {
					var mcdNumber = mcd(Math.abs(+ox) || 0,Math.abs(+oxidation) || 0);
					inThisElement.push({comps: el.symbol + (ox*mcdNumber) + element.symbol + (ox*mcdNumber), elements : [el,elements]})
				}
			})
		})
	});

	elements.concat(inThisElement);

});


function mcd($a,$b) { 
	if(isNaN($a) || isNaN($b)) return 1;
    while (($a % $b) != 0 && !(isNaN($a) || isNaN($b))) { 
    	var $c = $b; 
	    	$b = $a % $b; 
	    	$a = $c; 
	  //  	console.log('LOOP',$a, $b);
    } 
    return $b; 
} 

var fs = require('fs');
fs.writeFile('binary.json', JSON.stringify(elements));