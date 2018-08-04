
// end
var end = function(game) {};
end.prototype = {
	
	create: function() {
		if(lives == 0 && lives2 ==0){
			game.stage.backgroundColor = "";
			var playText = game.add.text(game.width/2, game.height*.3, 
				'You both need pratice', 
				{font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		}else if(lives == 0){
			game.stage.backgroundColor = "";
			var playText = game.add.text(game.width/2, game.height*.3, 
				'Man Wins!', 
				{font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		}else if(lives2 == 0){
			game.stage.backgroundColor = "";
			var playText = game.add.text(game.width/2, game.height*.3, 
				'Woman Wins!', 
				{font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		}
		
		playText.anchor.set(0.5);
		var playText = game.add.text(game.width/2, game.height*.8, 
			'Press SPACEBAR to restart', 
			{font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);
	},
	update: function() {
		//to return to game
		
	}
}
