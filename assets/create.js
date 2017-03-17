var circleYellow, circleBlue, circlePurple, circleRed, click, distance,tuboEnsaye;

function create() {
	 circleYellow = new Phaser.Circle(game.world.centerX, game.world.centerY,12);
	 circleBlue = new Phaser.Circle(game.world.centerX, game.world.centerY,12);
                game.add.sprite(0,0,'background')
   tuboEnsaye = game.add.sprite(50, 50, 'ensaye-tube');
   tuboEnsaye.anchor.set(0.5,0.5);
   console.log(tuboEnsaye)  
}

 tracking.ColorTracker.registerColor('purple', function(r, g, b) {
        var dx = r - 120;
        var dy = g - 60;
        var dz = b - 210;
        if ((b - g) >= 100 && (r - g) >= 60) {
          return true;
        }
        return dx * dx + dy * dy + dz * dz < 3500;
  });

 tracking.ColorTracker.registerColor('blue', function(r, g, b) {
    if (r < 50 && b > 200 && g < 50) {
      return true;
    }
    return false;
  });

 tracking.ColorTracker.registerColor('red', function(r, g, b) {

    if (b < 150 && r > 200 && g < 150) {
      return true;
    }
    return false;
  });
      
      var tracker = new tracking.ColorTracker(['yellow', 'purple', 'cyan','red']);
      
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

            }
            
            if(rect.color === 'cyan'){
              blueRects.x = Math.min(rect.x,blueRects.x);
              blueRects.y = Math.min(rect.y,blueRects.y);

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

