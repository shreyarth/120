var load = function(game) {
};

load.prototype = {
	preload: function() {
		// Load loading bar
		let loadBar = this.add.sprite(game.width/2 - 256, game.height/2 - 8, 'load');
		loadBar.anchor.set(0, 0.5);
		game.load.setPreloadSprite(loadBar);
		// Custom loading screen
		let style = {font: 'Press Start 2P', fontSize: '12px', fill: '#fff'};
		let warning = game.add.text(game.world.centerX, game.world.centerY - 32,
			'Warning: This game is recommended for 3 year olds', style);
		warning.anchor.set(0.5);
		game.time.events.add(1200, function() {
			let w_txt = game.add.text(game.world.centerX, game.world.centerY + 24,
			'... or anyone who has sense of humor equivalent to 3 year olds.', style);
			w_txt.anchor.set(0.5);
		}, this);
		// Fire this when loading takes forever for some god knows what reason
		game.time.events.add(5000, function() {
			let w_txt = game.add.text(game.world.centerX, game.world.centerY + 64,
			'Uh, you might want to talk with your internet provider about this.', style);
			w_txt.anchor.set(0.5);
			console.log('asdf');
		}, this);

		// Load all the assets
		// Graphic
		game.load.path = 'assets/img/';
		game.load.image('star', 'star.png');	// This is temp asset
		
		// UI
		game.load.image('title', 'title.png');
		game.load.spritesheet('poo_ico', 'ui_ico.png', 66, 63);
		game.load.spritesheet('boo_ico', 'ui_ico0.png', 66, 63);
		game.load.image('poo_gauge', 'ui_gauge.png');
		game.load.image('poo_fill', 'ui_fill.png');
		game.load.image('team_logo', 'notuniv_border.png');

		// Chr sprites
		game.load.spritesheet('player', 'player_spritesheet.png', 63, 81);
		game.load.image('enemy', 'enemy.png');
		game.load.image('boss', 'boss.png');
		game.load.spritesheet('deer', 'deer_spritesheet.png', 44, 49);
		game.load.image('bad1', 'enemy0Throw3.png');
		game.load.image('bad2', 'enemy5Idle.png');
		game.load.image('bad3', 'enemy2Throw2.png');
		game.load.image('bad4', 'enemy3Throw3.png');
		game.load.image('bad5', 'enemy4Throw1.png');

		
		// Bullets, particles, effects etc
		game.load.image('poo', 'poo.png');
		game.load.image('pepto', 'bismol.png');
		game.load.image('turd', 'turd.png');
		game.load.image('turd1', 'turd1.png');
		game.load.image('turdB', 'turdblood.png');
		game.load.image('poosplat', 'shit.png');
		game.load.image('bloodsplat', 'blood.png');
		game.load.image('twater', 'toiletwater.png');
		game.load.image('lax', 'laxative.png');

		// Backgrounds
		game.load.image('porter', 'finalPorter.png');
		game.load.image('heller', 'HellerDr.png');
		game.load.image('nerdhill', 'nerdhill.png');
		game.load.image('c9-10', 'C9-C10.png');
		game.load.image('bookstore', 'BTBS.png');
		game.load.image('lvl2', 'level2bg.png');

		// Objects
		game.load.image('sign', 'sign.png');
		game.load.image('sign2', 'sign2.png');
		game.load.image('toilet', 'toilet.png');
		game.load.image('branch', 'branchPlatform.png');
		game.load.image('bush', 'bushPlatform.png');
		game.load.image('platform', 'platform.png');
		game.load.image('sidewalk', 'sidewalk.png');

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
		game.load.audio('bosslevel', 'finalMusic.wav');

		// SFX
		game.load.audio('fart', 'fart.mp3');
		game.load.audio('rasp', 'Rasp.mp3');
		game.load.audio('turkey', 'turkey.mp3');
		game.load.audio('grunt', 'grunt2.wav');
		game.load.audio('splat', 'splat.wav');
		game.load.audio('throw', 'eThrow.mp3');
		game.load.audio('bgrunt', 'bleedingGrunt.wav');
		game.load.audio('bossdeath', 'bossDeathSound.wav');
		game.load.audio('bossyell', 'bossYell.wav');
		game.load.audio('deerSound', 'deerSound.wav');
		game.load.audio('bDeath', 'deathBloodSplat.wav');
		game.load.audio('pooSplat', 'shitSplatter.wav');

	},
	create: function() {
		// Preload audios into corresponding audio arrays
		BGM[0] = game.add.audio('menumusic', BGVOL, true);	// Menu BGM
		BGM[1] = game.add.audio('stage1bgm', BGVOL, true);	// Stage BGM
		BGM[2] = game.add.audio('bosslevel', BGVOL, true);	// Boss BGM

		SFX[0] = game.add.audio('fart');
		SFX[0].allowMultiple = true;
		SFX[1] = game.add.audio('rasp');
		SFX[1].allowMultiple = false;
		SFX[2] = game.add.audio('turkey');
		SFX[2].allowMultiple = true;
		SFX[3] = game.add.audio('grunt');
		SFX[3].allowMultiple = true;
		SFX[4] = game.add.audio('splat');
		SFX[4].allowMultiple = true;
		SFX[5] = game.add.audio('throw');
		SFX[5].allowMultiple = true;
		SFX[6] = game.add.audio('bgrunt');
		SFX[6].allowMultiple = true;
		SFX[7] = game.add.audio('bossdeath');
		SFX[7].allowMultiple = false;
		SFX[8] = game.add.audio('bossyell');
		SFX[8].allowMultiple = false;
		SFX[9] = game.add.audio('deerSound');
		SFX[9].allowMultiple = true;
		SFX[10] = game.add.audio('bDeath');
		SFX[10].allowMultiple = false;
		SFX[11] = game.add.audio('pooSplat', 0.2);
		SFX[11].allowMultiple = true;

		game.state.start('play2');
	}
}