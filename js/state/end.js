
// end
var end = function(game) {};
end.prototype = {
	
	create: function() {
			game.stage.backgroundColor = "#895f2b";
			game.add.text(game.width/2-100, game.height*.3, 
			'Could not hold shit', 
			{font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		

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
