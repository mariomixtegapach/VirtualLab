mainGame.render = function render(){
	graphics.clear();
	pre_elements.forEach(function(elementItem){

		var element = elementItem.rect;


   	 	graphics.beginFill(+('0x'+element.color));

    	graphics.moveTo(element.inix + leftPanel.x,element.iniy + leftPanel.y - relativeY);
	    graphics.lineTo(element.inix + leftPanel.x + element.width, element.iniy + leftPanel.y - relativeY);
	    graphics.lineTo(element.inix + leftPanel.x + element.width, element.iniy + leftPanel.y + element.height - relativeY);
	    graphics.lineTo(element.inix + leftPanel.x, element.iniy + leftPanel.y + element.height - relativeY);
	    graphics.moveTo(element.inix + leftPanel.x,element.iniy + leftPanel.y - relativeY);

	    graphics.endFill();


		

		//game.debug.geom(element);

	});

	/*Object.keys(tubosEnMundo).forEach(function(key){
				var tubo = tubosEnMundo[key];
				 //game.debug.geom(tubo.sprite);


			});*/

	var colorYellow = '#fdf814';
	var colorBlue = '#33b3e8';

	if(click != null){
		colorYellow = colorBlue = '#FFaabb';
	}

	if(circleYellow.x != Infinity){
	 game.debug.geom(circleYellow,colorYellow);

	}

	if(circleBlue.x != Infinity){
	 game.debug.geom(circleBlue,colorBlue);
	}

	leftPanel.topPad.x    = leftPanel.x;
    leftPanel.bottomPad.x = leftPanel.x;



}
