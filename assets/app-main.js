/* - - -  -  - Variables globales - - - -  - - -*/
var pointer = {
	clicked : false,
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

var tubosEnMundo = [];

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

   var tuboEnsaye = {
      sustName : sustName,
      sprite : tmpSprite,
      pastTouched : false,
      touched : false
   };

   tubosEnMundo.push(tuboEnsaye);

   return tuboEnsaye;
}

function collide(one, two){
  var oneMask = one.masker ? one.masker : {x : one.x, y : one.y, width : one.width, height: one.height};
  var twoMask = two.masker ? two.masker : {x : two.x, y : two.y,  width : two.width, height: two.height};


  oneMask.x = oneMask.getX ? oneMask.getX() : oneMask.x;
  twoMask.x = twoMask.getX ? twoMask.getX() : twoMask.x;

  console.log(oneMask.x,oneMask.width, twoMask.x, twoMask.width)

  if( (oneMask.x >= twoMask.x  && oneMask.x <= twoMask.x + twoMask.width) ||
      (oneMask.x + oneMask.width <= twoMask.x + twoMask.width  && oneMask.x + oneMask.width >= twoMask.x) ||
      (twoMask.x >= oneMask.x  && twoMask.x <= oneMask.x + oneMask.width)
    ){
    return true;
  }

  return false;
}


/* -  - - - - - Funciones globales - -- - - - - - -*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '', 
	{ 
		preload: preload, 
		create: create, 
		update: update,
		render: render 
	});



