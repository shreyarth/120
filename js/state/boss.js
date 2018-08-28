var boss = function() {
	// Global state variables
	this.bullets, this.enemy;
	this.platform; this.en3;
	this.obstacle;
	this.heller = null;
	this.ui;
	this.toil; this.toiletCount;

	this.collidePlayer, this.collideEmeny, this.collidePlat;
	this.collidePB, this.collideEB, this.collideBoss;
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

		if (!BGM[2].isPlaying) BGM[2].play();
		
		// Game world setting
		game.world.setBounds( 0, 0, 1000, 800);
		console.log("play state to check implementation");
		game.physics.startSystem(Phaser.Physics.P2JS);

		// Setting up collision groups
		this.collidePlayer = game.physics.p2.createCollisionGroup();
		this.collideEnemy = game.physics.p2.createCollisionGroup();
		this.collidePlat = game.physics.p2.createCollisionGroup();
		this.collidePB = game.physics.p2.createCollisionGroup();
		this.collideEB = game.physics.p2.createCollisionGroup();
		this.collideBoss = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup([this.collidePlayer, this.collideEnemy, this.collidePlat, 
			this.collidePB, this.collideEB]);
		game.physics.startSystem(Phaser.Physics.P2JS);
		
		var background = game.add.sprite(-500, 0, 'bookstore');
		
		//ground
		// this.platform = game.add.group();
		// this.platform.physicsBodyType = Phaser.Physics.P2JS;
		// this.platform.enableBody = true;
		// this.platform.collideWorldBounds = true;

		// let ground = this.platform.create(0, game.world.height, 'sidewalk');
		// ground.body.clearShapes();
		// ground.body.addRectangle(ground.width, ground.height);
		// ground.body.setCollisionGroup(this.collidePlat);
		// ground.scale.y = 0.5;	

		
		// the background wrap
		// var wrapGround = game.add.sprite(0, game.world.height - 300, 'heller');
		// wrapGround.scale.setTo(2,0.8);
		// wrapGround.width = game.width;
		// this.heller = this.add.tileSprite(0, game.world.height - 500, game.world.width, game.height/2, 'heller');

		game.physics.startSystem(Phaser.Physics.P2JS);

		// player
		player = new P2layer(game, 'player', null, 'poo');
		game.add.existing(player);
		player.body.setCollisionGroup(this.collidePlayer);
		player.body.collides([this.collidePlat, this.collideEnemy, this.collideEB, this.collideBoss]);

		//camera
		// game.camera.follow(player);

		//boss
		let bossmouth = new Boss(game, 410, 600, 'boss', 'mouth', 'toilet');
		game.add.existing(bossmouth);
		bossmouth.body.setCollisionGroup(this.collideBoss);
		bossmouth.body.collides([this.collidePlat, this.collidePlayer]);
		game.camera.follow(bossmouth);

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
		// if(this.boss.x > 800){
		// 	bossmouth.body.velocity.x -= 500;
		// 	console.log(bossmouth.body.velocity.x);
		// }
		
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