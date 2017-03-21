function render(){
	graphics.clear();
	pre_elements.forEach(function(elementItem){

		var element = elementItem.rect;

   	 	graphics.beginFill(+('0x'+element.color));

    	graphics.moveTo(element.inix + leftPanel.x,element.iniy + leftPanel.y);
	    graphics.lineTo(element.inix + leftPanel.x + element.width, element.iniy + leftPanel.y);
	    graphics.lineTo(element.inix + leftPanel.x + element.width, element.iniy + leftPanel.y + element.height);
	    graphics.lineTo(element.inix + leftPanel.x, element.iniy + leftPanel.y + element.height);
	    graphics.moveTo(element.inix + leftPanel.x,element.iniy + leftPanel.y);
	    graphics.endFill();


		elementItem.name.x = element.x + (element.width/2);
		elementItem.name.y = element.y + (element.height/2);

		element.x = element.inix + leftPanel.x;
		element.y = element.iniy + leftPanel.y;

		//game.debug.geom(element);

	});

	var colorYellow = '#fdf814';
	var colorBlue = '#33b3e8';

	if(click != null){
		colorYellow = colorBlue = '#09a28a';
	}

	if(circleYellow.x != Infinity){
	 game.debug.geom(circleYellow,colorYellow);
	
	}
	
	if(circleBlue.x != Infinity){
	 game.debug.geom(circleBlue,colorBlue);
	
	}


	




	
	
}