var end = function() {
	// state global var
}

end.prototype = {
	create: function() {
		
		game.stage.backgroundColor = bgcolor;
		// if(pooCount < 0){
			game.add.text(game.width/2-100, game.height*.3, 
			'Could not hold shit', 
			{font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		// }else{
		// 	game.add.text(game.width/2-100, game.height*.3, 
		// 	'Death by Shitsplosion', 
		// 	{font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		// }


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
