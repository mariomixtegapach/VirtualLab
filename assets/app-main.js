/* - - -  -  - Variables globales - - - -  - - -*/
var pointer = {
	clicked : false,
  pastClicked : false,
	x : -1,
	y : -1,
  width: 5,
  height : 5
}



var circleYellow, 
    circleBlue,
    circlePurple, 
    circleRed, 
    click, 
    distance,
    leftPanel;

var tubosEnMundo = {};

var configDimensions = {
	camWidth : video.width,
	camHeight : video.height
};

/* - - -  -  - Variables globales - - - -  - - -*/

/* -  - - - - - Funciones globales - -- - - - - - -*/

function createTubo(sustName, x, y){
  var tmpSprite = game.add.sprite(x, y, 'ensaye-tube');
      tmpSprite.anchor.set(0.5,0.5);

   //TODO: Load color and properties

   tmpSprite.masker = { 
    getX :function() {
       return tmpSprite.x - 50;
    },
    getY : function(){
      return tmpSprite.y - 50;
    },
    width: tmpSprite.width + 50,
    height : tmpSprite.height + 50
 }


   sprite1 = game.add.sprite(tmpSprite.x, tmpSprite.y, 'balls');
   sprite1.name = 'blockA';

    
   game.physics.ninja.enableAABB(sprite1);

   game.physics.ninja.enableTile(sprite, sprite.frame);   


   var tuboEnsaye = {
      sustName : sustName,
      sprite : tmpSprite,
      pastTouched : false,
      touched : false
   };

   tubosEnMundo[sustName] = tuboEnsaye;

   return tuboEnsaye;
}

function collidex(one, two){
  var oneMask = one.masker ? one.masker : {x : one.x, y : one.y, width : one.width, height: one.height};
  var twoMask = two.masker ? two.masker : {x : two.x, y : two.y,  width : two.width, height: two.height};


  oneMask.x = oneMask.getX ? oneMask.getX() : oneMask.x;
  twoMask.x = twoMask.getX ? twoMask.getX() : twoMask.x;

  //console.log(oneMask.x,oneMask.width, twoMask.x, twoMask.width)

  if( (oneMask.x >= twoMask.x  && oneMask.x <= twoMask.x + twoMask.width) ||
      (oneMask.x + oneMask.width <= twoMask.x + twoMask.width  && oneMask.x + oneMask.width >= twoMask.x) ||
      (twoMask.x >= oneMask.x  && twoMask.x <= oneMask.x + oneMask.width)
    ){
    return true;
  }

  return false;
}

function collidey(one, two){
  var oneMask = one.masker ? one.masker : {x : one.x, y : one.y, width : one.width, height: one.height};
  var twoMask = two.masker ? two.masker : {x : two.x, y : two.y,  width : two.width, height: two.height};


  oneMask.y = oneMask.getY ? oneMask.getY() : oneMask.y;
  twoMask.y = twoMask.getY ? twoMask.getY() : twoMask.y;

  //console.log(oneMask.x,oneMask.width, twoMask.x, twoMask.width)

  if( (oneMask.y >= twoMask.y  && oneMask.y <= twoMask.y + twoMask.height) ||
      (oneMask.y + oneMask.height <= twoMask.y + twoMask.height  && oneMask.y + oneMask.height >= twoMask.y) ||
      (twoMask.y >= oneMask.y  && twoMask.y <= oneMask.y + oneMask.height)
    ){
    return true;
  }

  return false;
}

function collide(one, two){
  return collidey(one, two) && collidex(one, two);
}

function getRandomColor(){
  var color = '#';

  for(var i = 0; i < 6; i++){
    color += "abcdef0123456789"[Math.floor(Math.random() * 100) %16];
  }

  return color;

}

/* -  - - - - - Funciones globales - -- - - - - - -*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '', 
	{ 
		preload: preload, 
		create: create, 
		update: update,
		render: render 
	});



