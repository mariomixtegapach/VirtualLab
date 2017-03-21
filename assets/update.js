var threeshold = 80;
var inix = 0;
var newDistx  = 0

function update() {

	distance = Math.sqrt(Math.pow(circleYellow.x - circleBlue.x,2) 
				+ Math.pow(circleYellow.y - circleBlue.y,2));

	if(distance < threeshold){
		click = 
			new Phaser.Rectangle(
				(circleYellow.x + circleBlue.x)/2,
				 (circleYellow.y + circleBlue.y)/2,
				  20,
				   20);

			pointer.clicked = true;
			pointer.x = (circleYellow.x + circleBlue.x)/2;
			pointer.y = (circleYellow.y + circleBlue.y)/2;

			inix = inix ? inix : (circleYellow.x + circleBlue.x)/2;
			newDistx = ((circleYellow.x + circleBlue.x)/2) - inix;
			
			if(collide(leftPanel, pointer)){
				if(leftPanel.x + newDistx < -200){
					leftPanel.x = -250;
				} else if(leftPanel.x + newDistx <= 0) {
					leftPanel.x = leftPanel.x + newDistx;
				} else {
					leftPanel.x = 0;
				}
			}

			//console.log(collide(leftPanel, pointer))
			//tuboEnsaye.rotation = Math.atan2(circleYellow.y - circleBlue.y, circleYellow.x - circleBlue.x)		
	} else {
		click = null;
		pointer.clicked = false;
		newDistx  = 0
		inix = 0;
	}

	//console.log(collide(leftPanel, pointer));
}