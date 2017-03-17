var game = new Phaser.Game(800, 600, Phaser.AUTO, '', 
	{ 
		preload: preload, 
		create: create, 
		update: update,
		render: render 
	});

var configDimensions = {
	camWidth : video.width,
	camHeight : video.height
};

