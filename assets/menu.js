var background;
var buttonInit;
var buttonAbout;
var buttonCompuestopedia;
var startText;
var aboutText;
var compuestopediaTxt;
var boilding;
var clinking;
var mice;
var windowSprite;
var windowGroup;
var aboutWindowText;
var aboutDevelopersText;
var aboutVersionText;
var buttonCloseAboutWindow;
var closeAboutWindowText;
var menu = {
	preload : function(){
		game.load.image('labBackgroundBlur', R.labBackgroundBlur);
		game.load.image('button', R.button);
		game.load.image('window', R.aboutWindow);
		game.load.audio('boilding', R.boilding);
		game.load.audio('clinking', R.clinking);
		game.load.audio('mice', R.mice);
	},
	create: function(){

		boilding = game.add.audio('boilding', 1, true); clinking =
		game.add.audio('clinking', 1, true);
		mice = game.add.audio('mice', 1, true);

		boilding.play();
		clinking.play();
		mice.play();
		background = game.add.tileSprite(0, 0, 1024, 768, 'labBackgroundBlur');

		buttonInit = game.add.button(game.width/2, game.height/3, 'button', this.initGame, this);
		buttonCompuestopedia = game.add.button(game.width/2, game.height/2, 'button', this.openCompuestopedia, this);
		buttonAbout = game.add.button(game.width/2, game.height/2+120, 'button', this.openAboutWindow, this);

		startText = game.add.text(game.width/2 - 30, game.height/3 - 14, 'Iniciar', {
			font: 'bold 24px sans-serif',
			fill: 'white',
			align: 'center'
		});
		compuestoPediaText = game.add.text(game.width/2 - 100, game.height/2 - 14, 'Compuesto-pedia', {
			font: 'bold 24px sans-serif',
			fill: 'white',
			align: 'center'
		});
		aboutText = game.add.text(game.width/2 - 50, game.height/2 + 110, 'Acerca de', {
			font: 'bold 24px sans-serif',
			fill: 'white',
			align: 'center'
		});
		background.scale.setTo(1.27, 1);
		buttonInit.anchor.setTo(0.5);
		buttonInit.scale.setTo(0.5);
		buttonAbout.anchor.setTo(0.5);
		buttonAbout.scale.setTo(0.5);
		buttonCompuestopedia.anchor.setTo(0.5);
		buttonCompuestopedia.scale.setTo(0.5);

	},
	openAboutWindow: function(){
		buttonInit.input.enabled = false;
		buttonAbout.input.enabled = false;
		buttonCompuestopedia.input.enabled = false;

		windowGroup = game.add.group();
		buttonCloseAboutWindow = game.add.button(game.width/2, (game.height/4)*3-50, 'button', this.closeAboutWindow, this);
		windowSprite = game.add.sprite(game.width/2, game.height/2, 'window');
		aboutWindowText = game.add.text(game.width/2, game.height/4+20, 'VirtuaLab es un juego interactivo para \n aprender sobre compuestos quimicos', {
				font: 'bold 16px sans-serif',
				fill: 'black',
				align: 'center'
			});
		aboutDevelopersText = game.add.text(game.width/2-10, game.height/2-50, 'Desarrollado por: \n Mixtega Pacheco Mario Alejandro \n Lopez Rios Fernanda Ximena \n Villafuerte Salazar Yael', {
				font: 'bold 16px sans-serif',
				fill: 'black',
				align: 'left'
			});
		aboutVersionText = game.add.text((game.width/3)*2-25, (game.height/4)*3-10, 'version: Alpha 0.1', {
				font: 'bold 10px sans-serif',
				fill: 'black',
				align: 'left'
			});
		closeAboutWindowText = game.add.text(game.width/2, (game.height/4)*3-45, 'cerrar', {
				font: 'bold 18px sans-serif',
				fill: 'white',
				align: 'center'
			});
		windowGroup.add(windowSprite);
		windowGroup.add(aboutWindowText);
		windowGroup.add(aboutDevelopersText);
		windowGroup.add(aboutVersionText);
		windowGroup.add(buttonCloseAboutWindow);
		windowGroup.add(aboutWindowText);
		windowGroup.add(closeAboutWindowText);


		windowSprite.anchor.setTo(0.5);
		aboutWindowText.anchor.setTo(0.5);
		aboutDevelopersText.anchor.setTo(0.5);
		aboutVersionText.anchor.setTo(0.5);
		closeAboutWindowText.anchor.setTo(0.5);
		buttonCloseAboutWindow.anchor.setTo(0.5);

		buttonCloseAboutWindow.scale.setTo(0.3);
	},
	closeAboutWindow: function(){
		windowGroup.destroy();

		buttonInit.input.enabled = true;
		buttonAbout.input.enabled = true;
		buttonCompuestopedia.input.enabled = true;

	},
	initGame: function(){
		game.state.start('menu');
	},
	openCompuestopedia: function(){
		boilding.stop();
		clinking.stop();
		mice.stop();
		game.state.start('compuestopedia');
	}
};
