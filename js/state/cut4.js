var cut4 = function(game) {
};

cut4.prototype = {
	create: function() {
		//c4.1
		let logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut1_1');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 4000, Phaser.Easing.Linear.None, true, 0, 0, true);
		
		game.time.events.add(7000, this.moveOn, this);

		//toskip
		// to skip
		let style = {font: 'Press Start 2P', fontSize: '12px', fill: '#fff'};
		let txt = game.add.text(500, 570,
			'Press Spacebar to skip', style);
		
	},
	moveOn: function() {
		game.state.start('boss');
	},
	update: function(){
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			game.state.start('play2');
		}
	}
}