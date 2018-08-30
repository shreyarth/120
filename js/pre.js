var pre = function(game) {
};

pre.prototype = {
	create: function() {
		let logo = game.add.sprite(game.world.centerX, game.world.centerY, 'team_logo');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);

		let style = {font: 'Press Start 2P', fontSize: '16px', fill: '#fff'};
		let txt = game.add.text(game.world.centerX, game.world.centerY + logo.height/2,
			'presents', style);
		txt.anchor.set(0.5);
		txt.alpha = 0;
		game.add.tween(txt).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
		
		game.time.events.add(4250, this.moveOn, this);
	},
	update: function() {
		// In case player wants to skip dat logo
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			this.moveOn();
		}
	},
	moveOn: function() {
		if (someShit && someShit.progress > 0)
			game.state.start('menu');
		else
			game.state.start('tutorial');
	}
}