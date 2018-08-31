var end = function() {
	// state global var
}

end.prototype = {
	create: function() {
		game.world.setBounds(0, 0, game.width, game.height);
		game.stage.backgroundColor = bgcolor;
		let style = {
			font: 'Press Start 2P',
			fill: '#fff',
			fontSize: '16px'
		};
		if(player.pooCount <= 0){
			let txt = game.add.text(game.width/2, game.height*.3, 'Could not hold shit', style);
			txt.anchor.setTo(0.5);
			var end = game.add.sprite(game.width/2, game.height/2 + 30,'bloodsplat');
			end.anchor.setTo(0.5);
			//end.scale.setTo(3,3);
			//end.animations.add('play', [0, 1], 5, true);
			//end.animations.play('play');

		}else if (player.pooCount >= MAXPOO) {
		 	let txt = game.add.text(game.width/2, game.height*.3, 'Death by Shitsplosion', style);
			txt.anchor.setTo(0.5);
			var end = game.add.sprite(game.width/2, game.height/2 + 30,'poosplat');
			end.anchor.setTo(0.5,0.5);
			//end.scale.setTo(3,3);
			//end.animations.add('play', [0, 1], 5, true);
			//end.animations.play('play');
		}
		else {
			let txt = game.add.text(game.width/2, game.height*.3, 'You Win', style);
			txt.anchor.setTo(0.5);
			var end = game.add.sprite(game.width/2, game.height/2 + 30,'tPPr');
			end.anchor.setTo(0.5,0.5);
		}

		var playText = game.add.text(game.width/2, game.height*.8, 
			'Press SPACEBAR to restart', style);
		playText.anchor.set(0.5);
		
	},
	update: function() {
		//to return to game
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			game.state.start('menu');
		}
	}
}
