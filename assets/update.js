var threeshold = 50;
var inix = 0;
var newDistx  = 0
var velocityy = 0;
var velocityx = 0;


mainGame.update= function update() {

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

			//console.log("pointer.firstClick",pointer.firstClick,'leftPanel.activeClicked',leftPanel.activeClicked);

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
				if(collide(element.rect, pointer) && (pointer.firstClick || element.activeClicked) ){
					element.activeClicked = true;
					if(pointer.firstClick && !tubosEnMundo[element.item.symbol]){
						createTubo(element.item.symbol, pointer.x, pointer.y, element.rect.color);
						leftPanel.x = -250;
					}

					tubosEnMundo[element.item.symbol].sprite.x = pointer.x;
					tubosEnMundo[element.item.symbol].sprite.y = pointer.y;


				}
			});

			Object.keys(tubosEnMundo).forEach(function(key){
				var tubo = tubosEnMundo[key];
				if(collide(tubo.sprite, pointer) && (pointer.firstClick || tubo.activeClicked) ){
					tubo.activeClicked = true;

					if(tubo.sprite.x - pointer.x > 5){
						tubo.sprite.body.moveLeft(20);
					}

					if(pointer.x - tubo.sprite.x > 5){
						tubo.sprite.body.moveRight(20);
					}

					if(pointer.y - tubo.sprite.y > 5){
						tubo.sprite.body.moveDown(20);
					}

					if(tubo.sprite.y - pointer.y > 5){
						tubo.sprite.body.moveUp(20);
					}


					velocityx = Math.abs(tubo.sprite.x - pointer.x)/2;
					velocityy = Math.abs(tubo.sprite.y - pointer.y)/2;
				}

				 var tmpSprite = tubo.sprite;
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
			element.activeClicked = false;
		});

		Object.keys(tubosEnMundo).forEach(function(key){
				var tubo = tubosEnMundo[key];
				tubo.activeClicked = false;

			});
	}

	var pastKey = null;
	Object.keys(tubosEnMundo).forEach(function(key){
		var tubo = tubosEnMundo[key];
		var tmpSprite = tubo.sprite;

		function collide(elementa,elementb){
			console.log(elementa.name + ' + '+ elementb.name)
		}

		if(pastKey){
			var pastSprite =tubosEnMundo[pastKey].sprite;
			game.physics.ninja.collide(tubo.sprite, pastSprite, collide, null, this);
		} else {
			pastKey = key;
		}

		tmpSprite.textName.x = tmpSprite.x;
		tmpSprite.textName.y = tmpSprite.y;

	})


}
