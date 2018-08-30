var end = function() {
	// state global var
}

end.prototype = {
	create: function() {
		
		game.stage.backgroundColor = bgcolor;
		if(player.pooCount <= 0){
			game.add.text(game.width/2-100, game.height*.3, 
			'Could not hold shit', 
			{font: 'Helvetica', fontSize: '24px', fill: '#fff'});
			var end = game.add.sprite(game.width/2, game.height/2 + 30,'boo_ico');
			end.anchor.setTo(0.5,0.5);
			end.scale.setTo(3,3);
			end.animations.add('play', [0, 1, 0 , 1, 0, 1], 5);
			end.animations.play('play');

		}else{
		 	game.add.text(game.width/2-100, game.height*.3, 
		 	'Death by Shitsplosion', 
		 	{font: 'Helvetica', fontSize: '24px', fill: '#fff'});

			var end = game.add.sprite(game.width/2, game.height/2 + 30,'poo_ico');
			end.anchor.setTo(0.5,0.5);
			end.scale.setTo(3,3);
			end.animations.add('play', [0, 1], 5);
			end.animations.play('play');
		}


		var playText = game.add.text(game.width/2, game.height*.8, 
			'Press SPACEBAR to restart', 
			{font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);
		
	},
	update: function() {
		//to return to game
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			game.state.start('menu');
		}
	}
}
