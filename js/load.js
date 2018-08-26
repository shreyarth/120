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
		game.load.image('platform', 'platform.png');	// This is temp asset
		game.load.image('star', 'star.png');	// This is temp asset

		// Chr sprites
		game.load.spritesheet('player', 'player_spritesheet.png', 63, 81);
		game.load.image('enemy', 'enemy.png');
		game.load.spritesheet('deer', 'deer_spritesheet.png', 44, 49);
		// game.load.image('deer', 'img/deer1.png');
		
		// Bullets, particles, effects etc
		game.load.image('poo', 'poo.png');
		game.load.image('pepto', 'bismol.png');
		game.load.image('turd', 'turd.png');
		game.load.image('turd1', 'turd1.png');
		game.load.image('turdB', 'turdblood.png');
		game.load.image('poosplat', 'shit.png');
		game.load.image('bloodsplat', 'blood.png');
		game.load.image('twater', 'toiletwater.png');

		// Backgrounds
		game.load.image('porter', 'finalPorter.png');
		game.load.image('heller', 'HellerDr.png');
		game.load.image('heller2', 'HellerDr2.png');
		game.load.image('nerdhill', 'nerdhill.png');
		game.load.image('slopehill', 'slopednhill.png');

		// Objects
		game.load.image('sign', 'sign.png');
		game.load.image('toilet', 'toilet.png');
		game.load.image('branch', 'branchPlatform.png');
		game.load.image('bush', 'bushPlatform.png');

		// Obstacles
		game.load.image('bcar', 'blackCar.png');
		game.load.image('ycar', 'yellowCar.png');
		game.load.image('wcar', 'whitecar.png');
		game.load.image('bus', 'bus.png');
		game.load.image('busObs', 'busObs.png');
		game.load.image('carObs', 'carObs.png');
		game.load.image('rcar', 'redCar.png');
		game.load.image('wreckC', 'wreckedcar.png');
		game.load.image('wreckB', 'wreckedbus.png');

		// Ethan Mars: "JASON!"
		// (Heavy Rain 2010)
		game.load.physics('physicsbox', 'physicsbox.json', null, Phaser.Physics.LIME_CORONA_JSON);

		// Sounds
		// Load all sounds into corresponding array
		game.load.path = 'assets/audio/';
		// BG
		game.load.audio('menumusic', 'blocks.wav');
		game.load.audio('stage1bgm', 'actionMusic.wav');
		game.load.audio('bosslevel', 'finalBossMusic.wav');

		// SFX
		game.load.audio('fart', 'fart.mp3');
		game.load.audio('rasp', 'Rasp.mp3');
		game.load.audio('turkey', 'turkey.mp3');
		game.load.audio('grunt', 'grunt2.wav');
		game.load.audio('splat', 'splat.wav');
		game.load.audio('throw', 'eThrow.mp3');
	},
	create: function() {
		// Preload audios into corresponding audio arrays
		BGM[0] = game.add.audio('menumusic', BGVOL, true);	// Menu BGM
		BGM[1] = game.add.audio('stage1bgm', BGVOL, true);	// Stage BGM
		BGM[2] = game.add.audio('bosslevel', BGVOL, true);	// Boss BGM

		SFX[0] = game.add.audio('fart');
		SFX[1] = game.add.audio('rasp');
		SFX[2] = game.add.audio('turkey');
		SFX[3] = game.add.audio('grunt');
		SFX[4] = game.add.audio('splat');
		SFX[5] = game.add.audio('throw');

		game.state.start('tutorial');
	}
}