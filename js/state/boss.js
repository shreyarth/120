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
		player.body.setCollisionGroup(this.collidePlayer);
		player.body.collides([this.collidePlat, this.collideEnemy, this.collideEB, this.collideBoss]);

		//camera
		game.camera.follow(player);

		//boss
		this.bossbody = game.add.group();
		this.bossbody.physicsBodyType = Phaser.Physics.P2JS;
		this.bossbody.enableBody = true;

		let bosseye = new Boss(game, 400, 570, 'star');
		game.add.existing(bosseye);
		this.bossbody.add(bosseye);
		bosseye.body.setCollisionGroup(this.collideBoss);
		bosseye.body.collides([this.collidePlat, this.collidePlayer]);
		


		let bosseye2 = new Boss(game, 420, 610, 'star');
		bosseye2.anchor.setTo(0.5,0.5);
		game.add.existing(bosseye2);
		this.bossbody.add(bosseye2);
		bosseye2.body.setCollisionGroup(this.collideBoss);
		bosseye2.body.collides([this.collidePlat, this.collidePlayer]);

		let bossmouth = new Boss(game, 410, 690, 'star');
		bossmouth.scale.setTo(2,2);
		bossmouth.anchor.setTo(0.5, 0.5);
		game.add.existing(bossmouth);
		this.bossbody.add(bossmouth);
		bossmouth.body.setCollisionGroup(this.collideBoss);
		bossmouth.body.collides([this.collidePlat, this.collidePlayer]);
		if(bossmouth.alive){
			if(Math.abs(bossmouth.x - player.x) < 100){
				spawn = new Enemy(game, game.rnd.integerInRange(bossmouth.x, bossmouth.x + 500),
			 	100, null, null, 'kamikaze_turkey');
			 	game.add.existing(spawn);
			}
		}

		game.physics.p2.createLockConstraint(bosseye, bosseye2, [50, 40]);
		game.physics.p2.createLockConstraint(bosseye, bossmouth, [40, 110]);
		game.physics.p2.createLockConstraint(bosseye2, bossmouth, [-40, 80]);


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
	},

	turke: function(){
		console.log('in turke?');
		
	}
	// Char control is implemented in player.js
}