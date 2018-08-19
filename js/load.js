var load = function(game) {
};

load.prototype = {
	preload: function() {
		// Load loading bar
		let loadBar = this.add.sprite(game.width/2, game.height/2, 'load');
		loadBar.anchor.set(0.5);
		game.load.setPreloadSprite(loadBar);

		// Load all the assets
		// Graphic
		game.load.path = 'assets/img/';
		// UI
		game.load.image('feed', 'feed_btn.png');
		game.load.image('pet', 'pet_btn.png');
		game.load.image('config', 'config_btn.png');
		// Sprites
		game.load.spritesheet('egg', 'egg.png', 15, 14);
		game.load.spritesheet('bb', 'bb.png', 15, 14);
		game.load.spritesheet('furry', 'furry.png', 20, 19);
		game.load.spritesheet('newt', 'newt.png', 20, 19);
		game.load.spritesheet('fiery', 'fiery.png', 20, 19);
		game.load.spritesheet('feet', 'feet.png', 35, 19);
		game.load.spritesheet('wing', 'wing.png', 35, 19);
		game.load.spritesheet('spark', 'spark.png', 35, 19);
		game.load.image('rip', 'rip.png');
		game.load.image('pix', 'fragment.png');
		// Sound
		game.load.path = 'assets/audio/';
	},
	create: function() {
		if (localStorage.getItem('gochiData') != null) {
			gochiData = JSON.parse(localStorage.getItem('gochiData'));
			console.log("Retrieving prev data");
			console.log(gochiData);
		}
		else {
			console.log("No previous data found. Creating new data.");
			let curr = new Date();
			gochiData = {
				lv: 0,
				growth: 0,
				health: 100,
				color: 0xffffff,
				init_time: curr.getTime(),
				hunger: 100,
				love: 100,
				env: 0,
				temp: 20,
				evo_gene: []
			}
			localStorage.setItem('gochiData', JSON.stringify(gochiData));
		}

		critterInit();
		
		game.state.start('menu');
	}
}