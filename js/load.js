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
		game.load.path = 'assets/';
		game.load.spritesheet('player', 'img/player_spritesheet.png', 63, 81);
		game.load.image('poo', 'img/poo.png');
		game.load.image('platform', 'img/platform.png');
		game.load.image('star', 'img/star.png');
		game.load.image('pepto', 'img/bismol.png');
		game.load.image('enemy', 'img/enemy.png');
		game.load.image('turd', 'img/turd.png');
		game.load.image('turd1', 'img/turd1.png');
		game.load.image('porter', 'img/finalPorter.png');
		game.load.image('heller', 'img/HellerDr.png');
		game.load.image('heller2', 'img/HellerDr2.png');
		game.load.image('bcar', 'img/blackCar.png');
		game.load.image('ycar', 'img/yellowCar.png');
		game.load.image('wcar', 'img/whitecar.png');
		
		game.load.physics('physicsbox', 'img/physicsbox.json', null, Phaser.Physics.LIME_CORONA_JSON);

		game.load.image('poosplat', 'img/shit.png');
		game.load.image('bloodsplat', 'img/blood.png');
		game.load.image('bus', 'img/bus.png');
		game.load.image('busObs', 'img/busObs.png');
		game.load.image('carObs', 'img/carObs.png');
		game.load.image('rcar', 'img/redCar.png');
		game.load.image('sign', 'img/sign.png');
		game.load.image('wreckC', 'img/wreckedcar.png');
		game.load.image('wreckB', 'img/wreckedbus.png');
		game.load.image('deer', 'img/deer1.png');

		//sounds
		game.load.audio('fart', 'audio/fart.mp3');
		game.load.audio('rasp', 'audio/Rasp.mp3');
		game.load.audio('turkey', 'audio/turkey.mp3');
		game.load.audio('menumusic', 'audio/blocks.wav');
		game.load.audio('stage1bgm', 'audio/actionMusic.wav');
		game.load.audio('grunt', 'audio/longGrunt.wav');
		game.load.audio('splat', 'audio/splat.wav');
	},
	create: function() {
		game.state.start('menu');
	}
}