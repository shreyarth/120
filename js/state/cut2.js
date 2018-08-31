var cut2 = function() {
};

cut2.prototype = {
	create: function() {
		//c2.1
		someShit.progress = 2;
		localStorage.setItem('someShit', JSON.stringify(someShit));
		game.world.setBounds(0, 0, game.width, game.height);
		let logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut2_1');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(6000, this.moveOn, this);

		// to skip
		let style = {font: 'Press Start 2P', fontSize: '12px', fill: '#fff'};
		let txt = game.add.text(500, 570,
			'Press Spacebar to skip', style);

		
	},
	moveOn: function() {
		//c2.2
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut2_2');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(6000, this.moveOn2, this);
	},
	moveOn2: function() {
		//c2.3
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut2_3');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(6000, this.moveOn3, this);
	},
	moveOn3: function() {
		//c2.4
		SFX[0].play();
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut2_4');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 5000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(8000, this.moveOn4, this);
	},
	moveOn4: function() {
		//c2.5
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut2_5');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 2500, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(5000, this.moveOn5, this);
	},
	moveOn5: function() {
		game.state.start('play2');
	},
	update: function(){
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			game.state.start('play2');
		}
	}
}