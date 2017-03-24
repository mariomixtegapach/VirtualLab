var baseUrl = 'http://localhost:3000';

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", baseUrl+theUrl, true); // true for asynchronous 
    xmlHttp.send();
}

var Requester = {
	GetUnlockedElements : function(callback){
		httpGetAsync('/elements', callback)
	}
}