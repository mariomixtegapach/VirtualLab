var threeshold = 55;
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

				if(pointer.firstClick){
					loadCompuestos()
				}
			}

			if(collide(leftPanel.bottomPad, pointer) && (pointer.firstClick || leftPanel.bottomPad.activeClicked) ){
				leftPanel.bottomPad.activeClicked = true;
				
				 if(relativeY < (leftPanel.maxHeightSize + 100) - (leftPanel.height - 150)){
						relativeY+=3;
				 }				
			}

			if(collide(leftPanel.topPad, pointer) && (pointer.firstClick || leftPanel.topPad.activeClicked) ){
				leftPanel.topPad.activeClicked = true;
				
				 if(relativeY > 0){
						relativeY-=3;
				 }				
			}

			pre_elements.forEach(function(element){
				if(collide(element.rect, pointer) && (pointer.firstClick || element.activeClicked) && element.rect.y+element.rect.height < leftPanel.height - 60 && element.rect.y >= 50){
					element.activeClicked = true;
					var ind = -1;
					if(pointer.firstClick /*&& !tubosEnMundo[element.item.symbol]*/){
						var ind = createTubo(element.item.symbol, pointer.x, pointer.y, element.rect.color);
						leftPanel.x = -250;
					}

					if(ind > 0){
						tubosEnMundo[element.item.symbol][ind].sprite.x = pointer.x;
						tubosEnMundo[element.item.symbol][ind].sprite.y = pointer.y;
					}


				}
			});

			compuestosPanel.forEach(function(element){
				if(element.rect.width  && collide(element.rect, pointer) && (pointer.firstClick || element.activeClicked) && element.rect.y+element.rect.height < leftPanel.height - 50 && element.rect.y >= 50){
					element.activeClicked = true;
					var ind = -1;
					if(pointer.firstClick /*&& !tubosEnMundo[element.item.symbol]*/){
						createTubo(element.item.symbol, pointer.x, pointer.y, element.item.color);
						leftPanel.x = -250;
					}

					if(ind > 0){
						tubosEnMundo[element.item.symbol][ind].sprite.x = pointer.x;
						tubosEnMundo[element.item.symbol][ind].sprite.y = pointer.y;
					}


				}
			});

			Object.keys(tubosEnMundo).forEach(function(key){
				var tubos = tubosEnMundo[key];
				tubos.forEach(function(tubo){
					if(collide(tubo.sprite, pointer) && (pointer.firstClick || tubo.activeClicked) ){
						tubo.activeClicked = true;

						/*if(tubo.sprite.x - pointer.x > 5){
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
						}*/

						tubo.sprite.body.x = pointer.x;
						tubo.sprite.body.y = pointer.y;


						velocityx = Math.abs(tubo.sprite.x - pointer.x)/2;
						velocityy = Math.abs(tubo.sprite.y - pointer.y)/2;
					}	
				})
				

				 
			});


			//console.log(collide(leftPanel, pointer))
			//tuboEnsaye.rotation = Math.atan2(circleYellow.y - circleBlue.y, circleYellow.x - circleBlue.x)
	} else {
		pointer.firstClick = null;
		leftPanel.activeClicked = false;
		click = null;
		pointer.clicked = false;
		newDistx  = 0
		leftPanel.bottomPad.activeClicked = false;
		leftPanel.topPad.activeClicked = false;
		inix = 0;
		pre_elements.forEach(function(element){
			element.activeClicked = false;
		});

		Object.keys(tubosEnMundo).forEach(function(key){
				var tubos = tubosEnMundo[key];
				tubos.forEach(function(tubo){
					tubo.activeClicked = false;
				});
				

			});
	}

	var pastKey = null;
	Object.keys(tubosEnMundo).forEach(function(key){
		var tubos = tubosEnMundo[key];
		

		function collide(elementa,elementb){
			if(elementb.name && elementa.name)
			{
				if(!collisionsData[elementb.name+elementa.name] && !collisionsData[elementa.name+elementb.name]){
					Requester.TryCombination(elementb.name ,elementa.name, function(response){
						if(!response.err){
							var xCom = (elementb.x + elementa.x) / 2, 
							yCom = (elementb.y + elementa.y) / 2;

							createTubo(response.element[0].compuestoKey, 
								xCom, yCom, 'a5a47e');

							console.log('AHHAAHAHAHAHAAHAHAH',elementb, elementa)

							if(!response.element[0].locked){
								Requester.Unlock(response.element[0].compuestoKey,
									averageRGB(elementa.eColor, elementb.eColor), 
									function(){
									notification(response.element[0].compuestoKey);
								});
							}

							_.find(tubosEnMundo[elementb.name], function(el){
								return el.sprite.idForDelete == elementb.idForDelete
							});

							_.find(tubosEnMundo[elementa.name], function(el){
								return el.sprite.idForDelete == elementa.idForDelete
							});
							
							elementa.textName.kill();
							elementb.textName.kill();
							elementb.kill();
							elementa.kill();
						} else {
							if(elementb && elementa){
								elementb.activeClicked = false;
								elementb.body.moveRight(80);
								elementa.activeClicked = false;
								elementa.body.moveLeft(80);
							}
						}
					});

					collisionsData[elementb.name+elementa.name] = setTimeout(function(){
						delete collisionsData[elementb.name+elementa.name];
					}, 2000);
				} else {
					clearTimeout(collisionsData[elementb.name+elementa.name]);
					collisionsData[elementb.name+elementa.name] = setTimeout(function(){
						delete collisionsData[elementb.name+elementa.name];
					}, 2000);
				}
			}
		}

		tubos.forEach(function(tubo){
			var tmpSprite = tubo.sprite;
			//if(pastKey &&  tubosEnMundo[pastKey]){
				Object.keys(tubosEnMundo).forEach(function(subKey){
					//if(key != subKey){
						var pastTubos = tubosEnMundo[subKey];
						pastTubos.forEach(function(pastTubo){
							var pastSprite = pastTubo.sprite;
							if(pastSprite.idForDelete != tubo.sprite.idForDelete)
								game.physics.ninja.collide(tubo.sprite, pastSprite, collide, null, this);
						});
						
					//}
				})
				
			/*} else {
				pastKey = key;
			}*/

			//tmpSprite.textName.x = tmpSprite.x;
			///tmpSprite.textName.y = tmpSprite.y;
			game.physics.ninja.collide(tubo.sprite, table, function(){}, null, this);
			game.physics.ninja.collide(tubo.sprite, dump, function(elementa,elementb){
				if(elementa.name){
					_.find(tubosEnMundo[elementa.name], function(el){
						return el.sprite.idForDelete == elementa.idForDelete
					});
					elementa.textName.kill();					
					elementa.kill();
				}

				if(elementb.name){
					_.find(tubosEnMundo[elementb.name], function(el){
						return el.sprite.idForDelete == elementb.idForDelete
					});
					elementb.textName.kill();
					elementb.kill();
				}
			}, null, this);
		});
		
		

	})


	pre_elements.forEach(function(elementItem){ 
		var element = elementItem.rect;

		element.x = element.inix + leftPanel.x;
		element.y = element.iniy + leftPanel.y - relativeY;

		elementItem.name.x = element.x + (element.width/2);
		elementItem.name.y = element.y + (element.height/2);

		
	});

	 game.world.sendToBack(leftPanel)
     game.world.sendToBack(back)

     game.world.bringToTop(itemsGroup);
     game.world.bringToTop(textGroup);
     


}
