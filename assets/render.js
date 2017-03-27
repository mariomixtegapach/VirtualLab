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
	});

	var heightCopmuesto = 100;
	var compuestoByRow  = 3;
	var widthCompuesto  = (leftPanel.width - 50) / compuestoByRow;

	compuestosPanel.forEach(function(compuesto, i){
		var xx = i % compuestoByRow;
		var yy = Math.floor(i / compuestoByRow) * heightCopmuesto;

		var element = {
			inix : xx * widthCompuesto,
			iniy : yy + leftPanel.maxHeightSizeElements,
			width: widthCompuesto,
			height: heightCopmuesto
		}

		graphics.beginFill(+('0x'+compuesto.item.color));

    	graphics.moveTo(element.inix + leftPanel.x,element.iniy + leftPanel.y - relativeY);
	    graphics.lineTo(element.inix + leftPanel.x + element.width, element.iniy + leftPanel.y - relativeY);
	    graphics.lineTo(element.inix + leftPanel.x + element.width, element.iniy + leftPanel.y + element.height - relativeY);
	    graphics.lineTo(element.inix + leftPanel.x, element.iniy + leftPanel.y + element.height - relativeY);
	    graphics.moveTo(element.inix + leftPanel.x,element.iniy + leftPanel.y - relativeY);

	    graphics.endFill();



		element.x = element.inix + leftPanel.x;
		element.y = element.iniy + leftPanel.y - relativeY;

		compuesto.name.x = element.x + (element.width/2);
		compuesto.name.y = element.y + (element.height/2);

		compuesto.rect = element;
		leftPanel.maxHeightSize = Math.max(leftPanel.maxHeightSize, element.iniy + heightCopmuesto )

	});

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
