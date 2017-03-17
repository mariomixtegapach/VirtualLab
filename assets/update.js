var threeshold = 50;

function update() {

	distance = Math.sqrt(Math.pow(circleYellow.x - circleBlue.x,2) + Math.pow(circleYellow.y - circleBlue.y,2));
	if(distance < threeshold){
		click = 
			new Phaser.Rectangle(
				(circleYellow.x + circleBlue.x)/2,
				 (circleYellow.y + circleBlue.y)/2,
				  20,
				   20);

				   tuboEnsaye.rotation = Math.atan2(circleYellow.y - circleBlue.y, circleYellow.x - circleBlue.x)		
	} else {
		click = null;
	}
}