var game = new Phaser.Game(1300, 680, Phaser.CANVAS, 'gameFrame');

game.state.add('menu', menu);
game.state.add('compuestopedia', compuestopedia);

game.state.start('compuestopedia');
