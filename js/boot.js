var boot = function(game) {
};

boot.prototype = {
	preload: function() {
		// Load loading image
		game.load.image('load','assets/img/loadbar.png');
	},
	create: function() {
		game.state.start('load');
	}
}