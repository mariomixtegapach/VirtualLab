var threeshold = 50;
var inix = 0;
var newDistx  = 0

function update() {

	distance = Math.sqrt(Math.pow(circleYellow.x - circleBlue.x,2) 
				+ Math.pow(circleYellow.y - circleBlue.y,2));

	pointer.pastClicked = pointer.clicked;


	if(distance < threeshold){
		click = true;
			
			pointer.clicked = true;
			pointer.x = (circleYellow.x + circleBlue.x)/2;
			pointer.y = (circleYellow.y + circleBlue.y)/2;

			///if(!pointer.firstClick)
				pointer.firstClick = !pointer.pastClicked && pointer.clicked;

			inix = inix ? inix : (circleYellow.x + circleBlue.x)/2;
			newDistx = ((circleYellow.x + circleBlue.x)/2) - inix;
			
			console.log("pointer.firstClick",pointer.firstClick,'leftPanel.activeClicked',leftPanel.activeClicked);

			if(collide(leftPanel, pointer) && (pointer.firstClick || leftPanel.activeClicked) ){
				leftPanel.activeClicked = true;
				if(leftPanel.x + newDistx < -200){
					leftPanel.x = -250;
				} else if(leftPanel.x + newDistx <= 0) {
					leftPanel.x = leftPanel.x + newDistx;
				} else {
					leftPanel.x = 0;
				}
			}

			pre_elements.forEach(function(element){
				if(collide(element, pointer) && (pointer.firstClick || element.activeClicked) ){
					element.activeClicked = true;
				}
			});


			//console.log(collide(leftPanel, pointer))
			//tuboEnsaye.rotation = Math.atan2(circleYellow.y - circleBlue.y, circleYellow.x - circleBlue.x)		
	} else {
		pointer.firstClick = null;
		leftPanel.activeClicked = false;
		click = null;
		pointer.clicked = false;
		newDistx  = 0
		inix = 0;
		pre_elements.forEach(function(element){
			element.activeClicked = true;
		});
	}

	//console.log(collide(leftPanel, pointer));
}