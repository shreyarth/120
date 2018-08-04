var menu = function() {
	// Global state variables
}

menu.prototype = {
	preload: function() {
		game.load.path = 'assets/';
		game.load.image('player', 'img/player.png');
		game.load.image('poo', 'img/star.png');
		game.load.image('platform', 'img/platform.png');
		game.load.image('star', 'img/star.png');
		game.load.image('enemy', 'img/enemy.png');
		// Call menu assets
	},
	create: function() {
		// Asset implementaion
		console.log("menu state to check implementation");
	},
	update: function() {
		// Update function
		// This is test function for state check
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
			game.state.start('play');
	},
	checkInput: function() {
		// Input function (menu selction)
		// Highlight the selected section (or any other indicator to show selected)
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
		}
	}
}
