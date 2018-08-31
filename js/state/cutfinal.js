var cutfinal = function() {
};

cutfinal.prototype = {
	create: function() {
		//c3.1
		BGM[7].play();
		someShit.progress = 3;
		localStorage.setItem('someShit', JSON.stringify(someShit));
		game.world.setBounds(0, 0, game.width, game.height);
		let logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cutf1');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 5000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(8000, this.moveOn, this);

	},
	moveOn: function(){
	//c3.2
		BGM[7].fadeOut(4500);
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cutf2');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 5000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(9000, this.moveOn2, this);
	},
	moveOn2: function(){
		game.state.start('credit');
	}
	
}