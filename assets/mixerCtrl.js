var map = {};
map['Na'] = {
		name : 'Na',
		map : []
	}
map['Na'].map['Cl']= {
	name : 'NaCl', 
	map : []
}
var prevNode;
mixerCtrl('Na');
mixerCtrl('Cl');
mixerCtrl('Cl');


function mixerCtrl(key){
	if(!prevNode){
		console.log('empty');

		prevNode = map[key].map;
		console.log(key);
		return;
	}
	else{
		if(key in prevNode){
			prevNode = prevNode[key].map;
			console.log('prevMap changed');
			console.log(key);
			return true;
		}
		else{
			prevNode = null;
			console.log('prevMap emptied');
			console.log('Match not found');
			return false;
		}
	}
	
	
}