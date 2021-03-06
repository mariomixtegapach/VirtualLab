var baseUrl = 'http://localhost:3000';

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();
}

var Requester = {
	GetUnlockedElements : function(callback){
		httpGetAsync('/elements', callback);
	},
    TryCombination : function(elementA, elementB, callback){
        httpGetAsync('/elements/try/'+elementA+'/'+elementB, callback);
    },
    Unlock : function(element,color, callback){
      httpGetAsync('/elements/unlock/'+element+'/'+color, callback);  
    }
}