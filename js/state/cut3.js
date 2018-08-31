var cut3 = function() {
};

cut3.prototype = {
	create: function() {
		//c3.1
		BGM[6].play();
		someShit.progress = 3;
		localStorage.setItem('someShit', JSON.stringify(someShit));
		game.world.setBounds(0, 0, game.width, game.height);
		let logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut3_1');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(6000, this.moveOn, this);

		// skip
		let style = {font: 'Press Start 2P', fontSize: '12px', fill: '#fff'};
		let txt = game.add.text(500, 570, 'Press Spacebar to skip', style);

	},
	moveOn: function(){
	//c3.2
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut3_2');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 2500, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(4000, this.moveOn2, this);
	},
	moveOn2: function(){
	//c3.2
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut3_3');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 2500, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(4500, this.moveOn3, this);
	},
	moveOn3: function() {
		game.state.start('cut3_5');
	},
	update: function(){
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			game.state.start('cut3_5');
		}
	}
}