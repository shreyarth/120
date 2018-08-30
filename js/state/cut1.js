var cut1 = function(game) {
};

cut1.prototype = {
	create: function() {
		//c1.1
		let logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut1_1');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 8000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(14000, this.moveOn, this);

		
	},
	moveOn: function() {
		//c1.2
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut1_2');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 6000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(10000, this.moveOn2, this);
	},
	moveOn2: function() {
		//c1.3
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut1_3');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 8000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(15000, this.moveOn3, this);
	},
	moveOn3: function() {
		game.state.start('play');
	}
}