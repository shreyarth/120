var cut1 = function(game) {
};

cut1.prototype = {
	create: function() {
		//c1.1
		let logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut1_1');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);

		let style = {font: 'Press Start 2P', fontSize: '16px', fill: '#fff'};
		let txt = game.add.text(game.world.centerX, game.world.centerY + logo.height/2,
			'presents', style);
		txt.anchor.set(0.5);
		txt.alpha = 0;
		game.add.tween(txt).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(3000, this.moveOn, this);

		//c1.2
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut1_2');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);

		style = {font: 'Press Start 2P', fontSize: '16px', fill: '#fff'};
		txt = game.add.text(game.world.centerX, game.world.centerY + logo.height/2,
			'presents', style);
		txt.anchor.set(0.5);
		txt.alpha = 0;
		game.add.tween(txt).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(3000, this.moveOn, this);

		//c1.3
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut1_3');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);

		style = {font: 'Press Start 2P', fontSize: '16px', fill: '#fff'};
		txt = game.add.text(game.world.centerX, game.world.centerY + logo.height/2,
			'presents', style);
		txt.anchor.set(0.5);
		txt.alpha = 0;
		game.add.tween(txt).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(3000, this.moveOn, this);
	},
	moveOn: function() {
		game.state.start('play');
	}
}