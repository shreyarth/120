var cut3 = function() {
};

cut3.prototype = {
	create: function() {
		//c3.1
		someShit.progress = 3;
		localStorage.setItem('someShit', JSON.stringify(someShit));
		game.world.setBounds(0, 0, game.width, game.height);
		let logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut3_1');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 7000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(12000, this.moveOn, this);

		// skip
		let style = {font: 'Press Start 2P', fontSize: '12px', fill: '#fff'};
		let txt = game.add.text(500, 570, 'Press Spacebar to skip', style);

	},
	moveOn: function(){
	//c3.2
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut3_2');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 5000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(8000, this.moveOn2, this);
	},
	moveOn2: function() {
		game.state.start('boss');
	},
	update: function(){
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			game.state.start('boss');
		}
	}
}