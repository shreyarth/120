var menu = function() {
	// Global state variables
}

menu.prototype = {
	preload: function() {
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