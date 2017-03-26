//var compuestoService = require('../services/compuestoService.js');
var unlockedCompuestos = [
	{
		compuestoKey: 'Na',
		name: 'Sodio',
		components: [],
		description: 'El sodio es un elemento químico de símbolo Na (del latín, natrium) con número atómico 11, fue aislado por sir Humphry Davy en 1807. Es un metal alcalino blando, untuoso, de color plateado, muy abundante en la naturaleza, encontrándose en la sal marina y el mineral halita. Es muy reactivo, arde con llama amarilla, se oxida en presencia de oxígeno y reacciona violentamente con el agua.',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Na%2B.svg/245px-Na%2B.svg.png',
		locked: true
	},
	{
		compuestoKey: 'NaCl',
		name: 'Clorudo de sodio',
		components: ['Na', 'Cl', 'Na', 'Cl', 'Na', 'Cl', 'Na', 'Cl', 'Na', 'Cl'],
		description: 'El cloruro de sodio es una de las sales responsable de la salinidad del océano y del fluido extracelular de muchos organismos. También es el mayor componente de la sal comestible, comúnmente usada como condimento y conservante de comida.',
		image: 'http://callisto.ggsrv.com/imgsrv/FastFetch/UBER2/00060202',
		locked: true
	}
];
var desktopBackground;
var bookSprite;
var openBookSound;
var switchPage;
var lastIndex = 0;
var index;
var compuestoName;
var compuestoKey;
var compuestoComponents;
var compuestoDescription;
var compuestoImage;
var backButton;
var fowardButton;
var bookGroup;
var compuestopedia = {
	preload: function(){
		game.load.image('desktopBackground', R.desktopBackground);
		game.load.image('transparentButton', R.transparentButton);
		game.load.spritesheet('book', R.book, 372, 299);
		game.load.audio('openBook', R.openBook);
		game.load.audio('switchPage', R.switchPage);
		for(var i = 0; i < unlockedCompuestos.length; i++){
			game.load.image(unlockedCompuestos[i].compuestoKey, unlockedCompuestos[i].image);
		}


	},
	create: function(){
		/*compuestoService.GetUnlockedCompuestos().then(function(compuestos){
			unlockedCompuestos = compuestos;
		});*/
		desktopBackground = game.add.tileSprite(0, 0, 1024, 768,'desktopBackground');
		desktopBackground.scale.setTo(1.28, 1);
		bookSprite = game.add.sprite(game.width/2, game.height/3, 'book');
		bookSprite.frame = 0;
		bookSprite.anchor.setTo(0.5);
		bookSprite.scale.setTo(2);
		fowardButton = game.add.button(game.width - game.width/2 + 50, game.height/4 -30, 'transparentButton', this.nextPage, this);
		fowardButton.width = 299;
		fowardButton.height = 372;
		backButton = game.add.button(game.width/4 + 50, game.height/4 -30, 'transparentButton', this.prevPage, this);
		backButton.width = 299;
		backButton.height = 372;
		openBookSound = game.add.audio('openBook', 1);
		switchPage = game.add.audio('switchPage', 1);
		bookSprite.animations.add('open', [0,1,7],3, false);
		bookSprite.animations.add('swhichSheet', [8, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 7], 8);
		bookSprite.animations.add('reverseSwhichSheet', [7, 6, 13, 5, 12, 4, 11, 3, 10, 2, 9, 8, 7], 7);
		bookSprite.animations.add('closeBook', [15, 16, 17, 18, 19], 15);
		bookSprite.animations.add('ReverseCloseBook', [19, 18, 17, 16, 15, 7], 19);
		
		openBookSound.play();
		game.add.text(game.width/3, game.height/4, '');
		game.add.text(game.width/3, game.height/4, '');
		game.add.text(game.width/3, game.height/4, '');
		game.add.text(game.width/3, game.height/4, '');
		bookSprite.animations.play('open').onComplete.add(function(){
			compuestopedia.getCompuesto();
		});
		compuestoName = game.add.text(game.width/3, game.height/4, '', {
			font: 'bold 30px sans-serif',
			fill: 'black',
			align: 'center',
			wordWrap: true,
			wordWrapWidth: 300,
		});
		compuestoKey = game.add.text(game.width/3 + 70, game.height/3 - 14, '', {
			font: 'bold 24px sans-serif',
			fill: 'black',
			align: 'center',
			wordWrap: true,
			wordWrapWidth: 20,
		});
		compuestoComponents = game.add.text(game.width/3 - 40, (game.height/3 * 2) -30 , '', {
			font: 'bold 24px sans-serif',
			fill: 'black',
			align: 'center',
			wordWrap: true,
			wordWrapWidth: 300,
		});
		compuestoDescription = game.add.text(game.width/2 + 50, game.height/4 + 30, '', {
			font: 'bold 15px sans-serif',
			fill: 'black',
			align: 'left',
			wordWrap: true,
			wordWrapWidth: 250,
		});
		compuestoImage = game.add.sprite(game.width/3+ 20, game.height/2.5, '');
		compuestoImage.height = 10;
		compuestoImage.width = 10;

		bookGroup = game.add.group();
		bookGroup.add(compuestoName);
		bookGroup.add(compuestoKey);
		bookGroup.add(compuestoDescription);
		bookGroup.add(compuestoComponents);
		bookGroup.add(compuestoImage);
		index = 0;

	},
	update: function(){
	},
	listener: function(){
		if(index < unlockedCompuestos.length){
			bookGroup.visible = false;
			switchPage.play();
			if(index >= lastIndex){
				bookSprite.animations.play('swhichSheet').onComplete.add(function(){
					bookGroup.visible = true;

				});
			} else if(index <= lastIndex){
				bookSprite.animations.play('reverseSwhichSheet').onComplete.add(function(){
					bookGroup.visible = true;
				});
			}
			this.getCompuesto();
		}else {
			if(index <= lastIndex){
				openBookSound.play();
				bookSprite.animations.play('ReverseCloseBook').onComplete.add(function(){
					bookGroup.visible = true;
				});
			}else{
				openBookSound.play();
				bookSprite.animations.play('closeBook');
				bookGroup.visible = false;
			}
		}
		lastIndex = index;

	},
	nextPage: function(){
		if(index >= unlockedCompuestos.length){

		}else{
			index++;
		}

		this.listener();
	},
	prevPage: function(){
		if(index >=  unlockedCompuestos.length){
			this.listener();
			index--;
		}else {
			if(index <= 0){

			}else{
				index--;
			}

			this.listener();
		}

	},
	getCompuesto: function(){
		compuestoName.text = unlockedCompuestos[index].name;
		compuestoKey.text = '(' + unlockedCompuestos[index].compuestoKey + ')';
		compuestoComponents.text = '';
		for(var i = 0; i < unlockedCompuestos[index].components.length; i++){
			compuestoComponents.text =  compuestoComponents.text + unlockedCompuestos[index].components[i] + ' ';
		}
	 	compuestoDescription.text = unlockedCompuestos[index].description;
		compuestoImage.loadTexture(unlockedCompuestos[index].compuestoKey);



	 	//compuestoImage.text = unlockedCompuestos[index].name;
/*
	 	compuestoKey.text = ;
	 	compuestoComponents.text = ;
	 	compuestoDescription.text = ;
	 	compuestoImage.text = ;*/




	}
}
