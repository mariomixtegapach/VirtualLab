var pre_elements = [];
var hintTxt = {};
var backMenuButton;
var backMenuButtonText;


mainGame.create  = function create() {

backMenuButton = game.add.button(game.width/4, game.height/4, 'button', function(){
    game.state.start('menu');
}, this);
backMenuButtonText = game.add.text(game.width/4, game.height/4 , ' volver', {
      font: 'bold 15px sans-serif',
      fill: 'black',
      align: 'left',
      wordWrap: true,
      wordWrapWidth: 250,
});

textGroup = game.add.group();
itemsGroup = game.add.group();
 
 setInterval(function(){
  showHint();
 },intervalBetweenHints)

   back = game.add.sprite(0, 0, 'background');
   table = game.add.sprite(230, 570, 'table');
        

   back.scale.set(1.3,1)
   var graphics = game.add.graphics(0, 0);

   window.graphics = graphics;

   game.physics.startSystem(Phaser.Physics.NINJA);

    game.physics.ninja.enableAABB(table);


	 circleYellow = new Phaser.Circle(game.world.centerX, game.world.centerY,12);
	 circleBlue = new Phaser.Circle(game.world.centerX, game.world.centerY,12);
  
   game.stage.backgroundColor = "#4488AA";
   leftPanel = game.add.sprite(-250, 0, 'left-panel');
   leftPanel.masker = {
     x  : 250,
     y  : 246,
     getX : function() { return 250 + leftPanel.x },
     width : 100,
     height: 334
   }  

   
   leftPanel.topMargin = 50;
   leftPanel.maxHeightSize = 0;
   game.world.sendToBack(leftPanel)
   game.world.sendToBack(back)

   var xini = leftPanel.x;
   var xend = leftPanel.x + leftPanel.width - 50;
   var elementsPerRow = 4;

   var widthElement = (xend -xini) / elementsPerRow;
   var heightElement = 50;
   var rows = Math.ceil(elementsItems.length / elementsPerRow);


   hintTxt = game.add.text(0, 0, '', {});
   game.add.text(-50, -50, '', {});
   game.add.text(-50, -50, '', {});
   game.add.text(-50, -50, '', {});
   game.add.text(-50, -50, '', {});
   game.add.text(-50, -50, '', {});
   game.add.text(-50, -50, '', {});
   game.add.text(-50, -50, '', {});
   game.add.text(-50, -50, '', {});
   game.add.text(-50, -50, '', {});
   
   for(var i = 0; i < rows; i++){
      for(var j = 0; j < elementsPerRow; j++){
        var tempEl = elementsItems[(i*elementsPerRow)+j];
        if(tempEl) {
          var rect = new Phaser.Rectangle(
            (j*widthElement) ,
            (i*heightElement) + leftPanel.topMargin,
            widthElement,
            heightElement);
          rect.color = tempEl ? tempEl.cpkHexColor :'000';
          rect.inix = rect.x;
          rect.iniy = rect.y;

          var style = { font: "30px Arial", wordWrap: true, wordWrapWidth: rect.width, align: "center", fill:getTextColor(rect.color)};

          leftPanel.maxHeightSizeElements = rect.y + heightElement;
          leftPanel.maxHeightSize = rect.y + heightElement;

          text = game.add.text(-50, -50, tempEl.symbol, style);
          text.anchor.set(0.5);
          
          pre_elements.push({rect:rect, name: text, item: tempEl})
        }
      }
   }

   loadCompuestos();

   leftPanel.topPad    = game.add.sprite(leftPanel.x, 0, 'leftPanelPadTop');
   leftPanel.bottomPad = game.add.sprite(leftPanel.x, leftPanel.height - 50, 'leftPanelPadBottom');
   
   itemsGroup.add(leftPanel.topPad)
   itemsGroup.add(leftPanel.bottomPad)

   leftPanel.topPad.z = 1000;
   leftPanel.bottomPad.z = 1000;

   leftPanel.inputEnabled = true;

   leftPanel.events.onInputDown.add(function(){
      if(leftPanel.x){  
       leftPanel.x = 0;
     } else {
      leftPanel.x = -250;
     }

                
   }, this);   


   dump = game.add.sprite( 1000 , 0, 'dump');
   dump.x = game.world.width - dump.width;
   dump.y = game.world.height - dump.height;

   game.physics.ninja.enableAABB(dump);

}


var tracker = new tracking.ColorTracker(['yellow', 'cyan']);

tracker.setMinDimension(5);
tracking.track('#video', tracker, { camera: true });


tracker.on('track', function(event) {
    var yellowRects = {
      x : Infinity,
      y : Infinity
    };

    var blueRects = {
      x : Infinity,
      y : Infinity
    };

    event.data.forEach(function(rect) {
      if(rect.color === 'yellow'){
        yellowRects.x = Math.min(yellowRects.x,rect.x);
        yellowRects.y = Math.min(yellowRects.y,rect.y);
        yellowRects.width = rect.width;
        yellowRects.height = rect.height;
      }

      if(rect.color === 'cyan'){
        blueRects.x = Math.min(rect.x,blueRects.x);
        blueRects.y = Math.min(rect.y,blueRects.y);
         blueRects.width = rect.width;
        blueRects.height = rect.height;
      }

    });

    if(yellowRects.x != Infinity){
          var newX = (game.width-((yellowRects.x / configDimensions.camWidth) * game.width)) ;
          circleYellow.x = newX;
          circleYellow.y = (yellowRects.y / configDimensions.camHeight) * game.height;
    }

    if(blueRects.x != Infinity){
          var newX = (game.width-((blueRects.x / configDimensions.camWidth) * game.width));
          circleBlue.x = newX;
          circleBlue.y = (blueRects.y / configDimensions.camHeight)  * game.height;
    }
});
