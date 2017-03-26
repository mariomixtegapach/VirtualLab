/* - - -  -  - Variables globales - - - -  - - -*/
var pointer = {
	clicked : false,
  pastClicked : false,
	x : -1,
	y : -1,
  width: 5,
  height : 5
}

var relativeY = 0;

var textGroup;  //= game.add.group();
var itemsGroup; //= game.add.group();

var circleYellow ={},
    circleBlue ={},
    circlePurple = {},
    circleRed = {},
    click = {},
    distance = {},
    leftPanel = {};

var tubosEnMundo = {};


var configDimensions = {
	camWidth : video.width,
	camHeight : video.height
};

var collisionsData = {};

/* - - -  -  - Variables globales - - - -  - - -*/

/* -  - - - - - Funciones globales - -- - - - - - -*/

function getTextColor(hexColor){

  if(typeof hexColor != 'string') hexColor = hexColor ? hexColor.toString() : 'FFFFFF';

  var red = parseInt(hexColor.replace('#','').substring(0, 2).toString(), 16)
  var green = parseInt(hexColor.replace('#','').substring(2, 4).toString(), 16)
  var blue = parseInt(hexColor.replace('#','').substring(4, 6).toString(), 16)


  var text = "#000000"
  if ((red*0.299 + green*0.587 + blue*0.114) > 186){
     text = "#000000"
  } else {
    text='#ffffff';
  }

  return text;
}

function createTubo(sustName, x, y, color){
  var tmpSprite = game.add.sprite(x, y, 'element');
  itemsGroup.add(tmpSprite);
     tmpSprite.anchor.set(0.5,0.5);
      tmpSprite.name = sustName
      tmpSprite.tint = +('0x'+color);
      console.log(+('0x'+color), color)
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

  var tuboEnsaye = {
      sustName : sustName,
      sprite : tmpSprite,
      pastTouched : false,
      touched : false
   };

   /*for(var i = 0; i < 10; i++){
    var sprite1 = game.add.sprite(tmpSprite.x -  game.rnd.realInRange(5, 10), tmpSprite.y - 100, 'balls');
        sprite1.scale.setTo(0.5, 0.5);

        tuboEnsaye.sustances.push(sprite1);
   }*/


   /*var middleWidth = (tmpSprite.width/2);
   var middleHeight = (tmpSprite.height/2);

   tmpSprite.customBounds = [
     game.add.sprite(x - middleWidth +5, y - middleHeight , 'leftTube'),
     game.add.sprite(x + middleWidth - 10, y - middleHeight, 'leftTube'),
     game.add.sprite(x - middleWidth, y + middleHeight - 20, 'bottomTube')
   ]*/



   game.physics.ninja.enableAABB(tmpSprite);

  var style = { font: "30px Arial", wordWrap: true, wordWrapWidth: tmpSprite.width, align: "center", fill:getTextColor(color)};
  tmpSprite.z = 10000;
      tmpSprite.textName = tmpSprite.addChild(game.add.text(0, 0, sustName, style));

      tmpSprite.textName.z = 10000;
      //textGroup.add(tmpSprite.textName)
      tmpSprite.textName.anchor.set(0.5);
      
      game.world.bringToTop(itemsGroup);
      //game.world.bringToTop(textGroup);

   tubosEnMundo[sustName] = tuboEnsaye;

   console.log("Element created", tmpSprite, tmpSprite.textName, sustName)

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

function notification(text){
  var ss = game.add.sprite(1000,-100,'notification');
  var style = { font: "30px Arial", wordWrap: true, wordWrapWidth: ss.width, align: "center"};
  var text = game.add.text(ss.width/2,(ss.height/2)+10, text, style);
  text.anchor.set(0.5);
  ss.addChild(text);

  tween = game.add.tween(ss).to( { y: 20 }, 1500, Phaser.Easing.Bounce.Out, true);
    

  setTimeout(function(){
    text.kill();
    ss.kill();
  }, 3000);

}





/* -  - - - - - Funciones globales - -- - - - - - -*/
var mainGame = {};


var game = new Phaser.Game(1300, 680, Phaser.AUTO, 'gameFrame');

