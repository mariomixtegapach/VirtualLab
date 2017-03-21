function create() {
	 circleYellow = new Phaser.Circle(game.world.centerX, game.world.centerY,12);
	 circleBlue = new Phaser.Circle(game.world.centerX, game.world.centerY,12);
             //   game.add.sprite(0,0,'background')

   game.stage.backgroundColor = "#4488AA";
   leftPanel = game.add.sprite(-250, 0, 'left-panel');
   leftPanel.masker = {
     x  : 250,
     y  : 246,
     getX : function() { console.log("Getting x"); return 250 + leftPanel.x },
     width : 100,
     height: 334,
     ylim : 334 
   }  
}

      
      var tracker = new tracking.ColorTracker(['yellow', 'magenta']);
      
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
            
            if(rect.color === 'magenta'){
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

