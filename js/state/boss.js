var boss = function() {
	// Global state variables
	this.bullets, this.enemy;
	this.platform; this.en3;
	this.obstacle;
	this.heller = null;
	this.ui;
	this.toil; this.toiletCount;

	this.collidePlayer, this.collideEmeny, this.collidePlat;
	this.collidePB, this.collideEB;
}

boss.prototype = {
	preload: function() {
		
	},
	create: function() {
		// Asset implementaion
		if (!this.music || this.music.isPlaying === false) {
			this.music = game.add.audio('bosslevel', 0.5, true);
			this.music.play();
		}
		game.world.setBounds( 0, 0, 1000, 800);
		console.log("play state to check implementation");
		game.physics.startSystem(Phaser.Physics.P2jS);
		
		var background = game.add.sprite(0, 0, 'porter');
		//background.scale.setTo(5,2);
		background.width = game.world.width;
		background.height = game.world.height -32;
		// this.heller = this.add.tileSprite(0, game.world.height - 500, game.world.width, 1000, 'heller');
		// this.heller.height = 800;

		//ground
		this.platform = game.add.group();
		this.platform.enableBody = true;
		let ground = this.platform.create(0, game.world.height -32, 'platform');
		ground.scale.setTo(game.world.width, 1 );
		ground.body.immovable = true;
		
		
		
		// the background wrap
		// var wrapGround = game.add.sprite(0, game.world.height - 300, 'heller');
		// wrapGround.scale.setTo(2,0.8);
		// wrapGround.width = game.width;
		// this.heller = this.add.tileSprite(0, game.world.height - 500, game.world.width, game.height/2, 'heller');

		game.physics.startSystem(Phaser.Physics.P2JS);

		// player
		player = new P2layer(game, 'player', null, 'poo');
		game.add.existing(player);

		//camera
		game.camera.follow(player);

		//boss
		let bosseye = game.add.sprite(400, 570, 'star');
		bosseye.anchor.setTo(0.5,0.5);

		let bosseye2 = game.add.sprite(420, 610, 'star');
		bosseye2.anchor.setTo(0.5,0.5);

		let bossmouth = game.add.sprite(410, 690, 'star');
		bossmouth.scale.setTo(2,2);
		bossmouth.anchor.setTo(0.5, 0.5);


		// enemy
		// this.enemy = game.add.group();
		// this.enemy.enableBody = true;
		
		// for(var i = 0; i < 30; ++i){
		// 	let en = new Enemy(game, game.rnd.integerInRange(600,4900),
		// 		game.rnd.integerInRange(200,1000), 'enemy');
		// 	game.add.existing(en);
		// 	this.enemy.add(en);
		// }

		//test for flying enemy
		// for(var i = 0; i < 10; ++i){
		// 	en = new Enemy(game, game.rnd.integerInRange(1000,4800),
		// 	 400, 'enemy');
		// 	game.add.existing(en);
		// 	this.enemy.add(en);
		// }

		this.bullets = game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.p2;
		//this.bullets.createMultiple(200, 'star');
		//bullets.setAll('checkWorldBounds', true);
		//bullets.callAll('events.onOutOfBounds.add', 'events.outOfBounds', resetstar);
		this.bullets.checkWorldBounds = true;
		this.bullets.outOfBoundsKill = true;
		//bullets.gravity = 300;

		//enemies bullets
		this.bulletE = game.add.group();
		this.bulletE.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.p2;
		this.bullets.createMultiple(200, 'star');
		this.bullets.checkWorldBounds = true;
		this.bullets.outOfBoundsKill = true;

		// Set camera to platformer follow up
		// lerp set for smooth camera movement
		// game.camera.follow('player', FOLLOW_PLATFORMER, 0.25, 0.25);

		// Fix UI to the camera
		pooMeter(MAXPOO, 0x000000);
		this.ui = pooMeter(player.pooCount, 0x492008);
		let t_ui = game.add.sprite(game.width - 128, 8, 'toilet');
		t_ui.scale.setTo(0.75);
		t_ui.fixedToCamera = true;
		t_ui.cameraOffset.setTo(game.width - 128, 8);
		let style = {
			font: 'Press Start 2P',
			fill: '#fff',
			fontSize: 32,
			strokeThickness: 5
		};
		// this.toiletCounter = game.add.text(game.width - 78, 16, this.toil.total, style);
		// this.toiletCounter.fixedToCamera = true;
		// this.toiletCounter.cameraOffset.setTo(game.width - 78, 16);
	},
	// bossHealth: funtion(bosshp){
	// 	let obje = null;
	// 	//boss health bar
	// 	let b = game.add.graphics();
	// 	b.beginFill(0x492008);
	// 	b.drawRect(32, 32, pooNum * 5, 32);	// Starting point, width, height
	// 	b.endFill();

	// 	obj = game.add.sprite(700, 500, g.generateTexture());
	// 	obj.fixedToCamera = true;
	// 	obj.cameraOffset.setTo(32, 16);
	// 	g.destroy();

	// 	return obje;
	// },
	update: function() {
		// Update function
		// player and enemies collision with platforms
		game.physics.arcade.collide(player, this.platform);
		game.physics.arcade.collide(this.enemy, this.platform, this.movToPl, null, this);

		// UI update
		if (this.ui)
			this.ui.destroy();
		this.ui = pooMeter(player.pooCount, 0x492008);
		//this.toiletCounter.text = this.toil.total;

		
	},
	movToPl: function(en, platform) {
		game.physics.arcade.moveToObject(en, player);
	}
	// Char control is implemented in player.js
}