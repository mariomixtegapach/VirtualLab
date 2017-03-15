var circleYellow, circleBlue, circlePurple, circleRed;

function create() {
	 circleYellow = new Phaser.Circle(game.world.centerX, game.world.centerY,12);
	 circleBlue = new Phaser.Circle(game.world.centerX, game.world.centerY,12);
	 circlePurple = new Phaser.Circle(game.world.centerX, game.world.centerY,12);
	 circleRed = new Phaser.Circle(game.world.centerX, game.world.centerY,12);
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
  if (b < 50 && r > 200 && g < 50) {
    return true;
  }
  return false;
});

      var tracker = new tracking.ColorTracker(['yellow', 'purple', 'cyan','red']);
      
      tracker.setMinDimension(5);
       tracking.track('#video', tracker, { camera: true });

      
      tracker.on('track', function(event) {
        //context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function(rect) {
          if (rect.color === 'yellow' && circleYellow) {
            circleYellow.x = rect.x;
			circleYellow.y = rect.y;
          }

          if (rect.color === 'cyan' && circleBlue) {
            circleBlue.x = rect.x;
			circleBlue.y = rect.y;
          }

          if (rect.color === 'purple' && circlePurple) {
            circlePurple.x = rect.x;
			circlePurple.y = rect.y;
          }

          if (rect.color === 'red' && circleRed) {
            circleRed.x = rect.x;
			circleRed.y = rect.y;
          }
         
        });
      });
