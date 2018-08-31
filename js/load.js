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
		game.time.events.add(10000, function() {
			let w_txt = game.add.text(game.world.centerX, game.world.centerY + 64,
			'Uh, you might want to talk with your internet provider about this.', style);
			w_txt.anchor.set(0.5);
		}, this);

		// Load all the assets
		// Graphic
		game.load.path = 'assets/img/';
		
		// UI
		game.load.image('title', 'title.png');
		game.load.spritesheet('poo_ico', 'ui_ico.png', 66, 63);
		game.load.spritesheet('boo_ico', 'ui_ico0.png', 66, 63);
		game.load.image('poo_gauge', 'ui_gauge.png');
		game.load.image('poo_fill', 'ui_fill.png');
		game.load.image('team_logo', 'notuniv_border.png');
		game.load.spritesheet('leaf_ico', 'ui_icof.png', 66, 63);
		game.load.image('arrow', 'arrow.png');
		game.load.image('star', 'star.png');
		game.load.image('rate_this', 'rating.png');
		game.load.image('tPPr', 'toiletPaper.png');

		// Chr sprites
		game.load.spritesheet('player', 'player_spritesheet.png', 63, 81);
		game.load.image('enemy', 'enemy.png');
		game.load.image('boss', 'bossBase.png');
		game.load.image('boss1', 'boss.png');
		game.load.image('boss2', 'bossHalf.png');
		game.load.image('boss3', 'bossFinal.png');
		game.load.image('boss4', 'bossDefeated.png');
		game.load.spritesheet('deer', 'deer_spritesheet.png', 44, 49);
		game.load.spritesheet('bad0', 'enemy0_spritesheet.png', 61, 81);
		game.load.spritesheet('bad1', 'enemy1_spritesheet.png', 61, 81);
		game.load.spritesheet('bad2', 'enemy2_spritesheet.png', 61, 81);
		game.load.spritesheet('bad3', 'enemy3_spritesheet.png', 61, 81);
		game.load.spritesheet('bad4', 'enemy4_spritesheet.png', 58, 81);
		game.load.spritesheet('bad5', 'enemy5_spritesheet.png', 58, 81);
		game.load.spritesheet('bad6', 'enemy6_spritesheet.png', 58, 81);

		
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
		game.load.image('feather', 'feather_orig.png');
		game.load.image('psplat', 'splat_orig.png');

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

		// Cutscenes
		game.load.image('cut1_1', 'cutscene1_1.png');
		game.load.image('cut1_2', 'cutscene1_2.png');
		game.load.image('cut1_3', 'cutscene1_3.png');
		game.load.image('cut2_1', 'cutscene2_1.png');
		game.load.image('cut2_2', 'cutscene2_2.png');
		game.load.image('cut2_3', 'cutscene2_3.png');
		game.load.image('cut2_4', 'cutscene2_4.png');
		game.load.image('cut2_5', 'cutscene2_5.png');
		game.load.image('cut3_1', 'cutscene3_1.png');
		game.load.image('cut3_2', 'cutscene3_2.png');
		game.load.image('cut3_3', 'cutscene3_3.png');
		game.load.image('cut4_1', 'cutscene4_1.png');
		game.load.image('cutf1', 'cutfinal1.png');
		game.load.image('cutf2', 'cutfinal2.png');

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
		game.load.audio('tuto','tut.mp3');
		game.load.audio('cred','cred.mp3');

		// SFX
		// Sound effects from:
		// http://www.freesfx.co.uk/
		// https://freesound.org/
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
		game.load.audio('enemydeath', 'enemyDeath.mp3');
		game.load.audio('shoot', 'shooting.mp3');
		game.load.audio('playercol', 'playercollision.mp3');

	},
	create: function() {
		// Preload audios into corresponding audio arrays
		BGM[0] = game.add.audio('menumusic', BGVOL, true);	// Menu BGM
		BGM[1] = game.add.audio('stage1bgm', BGVOL, true);	// Stage BGM
		BGM[2] = game.add.audio('bosslevel', BGVOL, true);	// Boss BGM
		BGM[3] = game.add.audio('tuto', BGVOL, true);	// Bulid that fake asthetic for tutorial
		BGM[4] = game.add.audio('cred', BGVOL, true);	// Epic credits

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
		SFX[12] = game.add.audio('shoot', 0.2);
		SFX[12].allowMultiple = true;
		SFX[13] = game.add.audio('enemydeath');
		SFX[13].allowMultiple = true;
		SFX[14] = game.add.audio('playercol', 0.2);
		SFX[14].allowMultiple = true;
		
		// Local storage initialization for storing game data
		//localStorage.clear();	// Delete or comment out this line when dev is done
		if (localStorage.getItem('someShit') != null)
			someShit = JSON.parse(localStorage.getItem('someShit'));
		else {
			someShit = {
				progress: 0,	// Stage number. 0 is tutorial
				mode: 1,	// See main.js for more info
				dev: false,
				nathan: false,
				cleared: false	// Did this brouwser finished the game at least once?
			}
			localStorage.setItem('someShit', JSON.stringify(someShit));
		}
		game.state.start('play2');
	}
}