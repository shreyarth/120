var cut1 = function() {
};

cut1.prototype = {
	create: function() {
		//c1.1
		BGM[5].play();
		let logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut1_1');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 4000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(7000, this.moveOn, this);

		//enter to skip
		let style = {font: 'Press Start 2P', fontSize: '12px', fill: '#fff'};
		let txt = game.add.text(500, 570, 'Press Spacebar to skip', style);		
	},
	moveOn: function() {
		//c1.2
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut1_2');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 3000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(5000, this.moveOn2, this);
	},
	moveOn2: function() {
		//c1.3
		BGM[5].fadeOut(7000);
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut1_3');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 4000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(7500, this.moveOn3, this);
	},
	moveOn3: function() {
		BGM[5].stop();
		game.state.start('play');
	},
	update: function(){
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			BGM[5].stop();
			game.state.start('play');
		}
	}
}