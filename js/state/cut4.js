var cut4 = function(game) {
};

cut4.prototype = {
	create: function() {
		//c4.1
		game.world.setBounds(0, 0, 800, 600);
		BGM[6].fadeOut(3000);
		let logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut4_1');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 3000, Phaser.Easing.Linear.None, true, 0, 0, true);
		
		game.time.events.add(6000, this.moveOn, this);

		//toskip
		// to skip
		let style = {font: 'Press Start 2P', fontSize: '12px', fill: '#fff'};
		let txt = game.add.text(500, 570, 'Press Spacebar to skip', style);
	},
	moveOn: function() {
		game.state.start('boss');
	},
	update: function(){
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			game.state.start('boss');
		}
	}
}