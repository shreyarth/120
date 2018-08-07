var menu = function() {
	// Global state variables
}

menu.prototype = {
	preload: function() {
		game.load.path = 'assets/';
		game.load.image('player', 'img/player.png');
		game.load.image('poo', 'img/poo.png');
		game.load.image('platform', 'img/platform.png');
		game.load.image('star', 'img/star.png');
		game.load.image('enemy', 'img/enemy.png');
		game.load.image('turd', 'img/turd.png');
		game.load.image('porter', 'img/porter.png');
		game.load.image('heller', 'img/HellerDr.png');

		//sounds
		game.load.audio('fart', 'audio/fart.mp3');
		game.load.audio('rasp', 'audio/Rasp.mp3');
		game.load.audio('turkey', 'audio/turkey.mp3');
		// Call menu assets
	},
	create: function() {
		// Asset implementaion
		game.stage.backgroundColor = "#895f2b";
		console.log("menu state to check implementation");
		var playText = game.add.text(250, game.height*.3, 
				'    To shit or not to shit...\nPush spacebar to continue', 
				{font: 'Helvetica', fontSize: '24px', fill: '#fff'});
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
		
	}
}
