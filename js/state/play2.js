var play2 = function() {
	// Global state variables
	this.bullets, this.enemy;
	this.platform, this.fPlatform, this.en3;
	this.ui, this.full_width, this.cropRect;

	this.collidePlayer, this.collideEmeny, this.collidePlat;
	this.collidePB, this.collideEB;
}

play2.prototype = {
	preload: function() {
		
	},
	create: function() {
		if (devMode) game.time.advancedTiming = true;

		// Setting up game world
		game.world.setBounds(0, 0, 10000, 6000);
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		
		// Asset implementaion
		game.stage.backgroundColor = "#cb741c";
		var background = game.add.sprite(0, -335, 'lvl2');
		
		// Setting up collision groups
		this.collidePlayer = game.physics.p2.createCollisionGroup();
		this.collideEnemy = game.physics.p2.createCollisionGroup();
		this.collidePlat = game.physics.p2.createCollisionGroup();
		this.collidePB = game.physics.p2.createCollisionGroup();
		this.collideEB = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup([this.collidePlayer, this.collideEnemy, this.collidePlat, 
			this.collidePB, this.collideEB]);

		//ground
		this.platform = game.add.group();
		this.platform.physicsBodyType = Phaser.Physics.P2JS;
		this.platform.enableBody = true;

		let ground = this.platform.create(0, 300, 'bush');
		ground.scale.setTo(3.2, 0.6 );
		ground.body.angle = 30;
		ground.body.damping = 0;
		ground.body.angularDamping = 0;
		ground.body.clearShapes();
		ground.body.addRectangle(1000, 25);
		

		ground = this.platform.create(1150, 963, 'bush');
		ground.scale.setTo(3.15, 0.6 );
		ground.body.damping = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(1000, 25);

		ground = this.platform.create(1360, 960, 'bus');
		ground.scale.setTo(1, 1);
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(394, 176);

		ground = this.platform.create(1980, 1443, 'bush');
		ground.scale.setTo(0.95, 0.6 );
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(300, 25);

		ground = this.platform.create(2680, 1847, 'bush');
		ground.scale.setTo(0.3, 0.6 );
		ground.body.damping.x = 0;
		ground.body.angularForce = 100;
		ground.body.angularVelocity = 1
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(90, 25);

		ground = this.platform.create(3450, 2160, 'bus');
		ground.scale.setTo(1, 1);
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(394, 176);

		ground = this.platform.create(3480, 2310, 'bush');
		ground.scale.setTo(2.85, 0.6 );
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(900, 25);

		ground = this.platform.create(4600, 2957, 'bush');
		ground.scale.setTo(3.15, 0.6 );
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(1000, 25);

		ground = this.platform.create(5580, 3522, 'bush');
		ground.scale.setTo(0.95, 0.6 );
		ground.body.angularForce = 100;
		ground.body.angularVelocity = 1
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(300, 25);

		ground = this.platform.create(6000, 3765, 'bush');
		ground.scale.setTo(0.3, 0.6 );
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(90, 25);

		ground = this.platform.create(6880, 4273, 'bush');
		ground.scale.setTo(0.15, 0.6 );
		ground.body.angularForce = 100;
		ground.body.angularVelocity = 1
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(40, 25);

		ground = this.platform.create(8200, 5035, 'bush');
		ground.scale.setTo(5.7, 0.6);
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(1800, 25);

		this.platform.forEach(function(plat) {
			plat.body.kinematic = true;
			plat.body.debug = devMode;
			plat.body.setCollisionGroup(this.collidePlat);
			plat.body.collides([this.collidePlayer, this.collideEnemy, this.collidePB, this.collideEB]);
		}, this);

		// flat grounds
		this.fPlatform = game.add.group();
		this.fPlatform.physicsBodyType = Phaser.Physics.P2JS;
		this.fPlatform.enableBody = true;

		//the ones not calling a sprite are the ceilings
		ground = this.fPlatform.create(4600, 1950, '');
		ground.scale.setTo(game.world.width, 1 );
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(game.world.width, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		//flat surface at end
		ground = this.fPlatform.create(9500, 5450, 'sidewalk');
		ground.scale.setTo(1, 0.6 );
		ground.body.damping.x = 0;
		ground.body.clearShapes();
		ground.body.addRectangle(1800, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		// wrecked cars to cover flaws in background
		ground = this.fPlatform.create(9100, 5200, 'carObs');
		ground.body.angle = -30;
		ground.body.clearShapes();
		ground.body.loadPolygon('physicsbox', 'carObs');
		ground.body.kinematic = true;
		ground.body.setCollisionGroup(this.collidePlat);
		
		//platforms and enemies in order, left to right
		ground = this.fPlatform.create(700, 250, 'branch');
		ground.scale.setTo(0.35, 0.5);
		ground.body.clearShapes();
		ground.body.addRectangle(100, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.fPlatform.create(1525, 440, 'branch');
		ground.scale.setTo(0.35, 0.5);
		ground.body.clearShapes();
		ground.body.addRectangle(100, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.fPlatform.create(1800, 952, 'branch');
		ground.scale.setTo(0.35, 0.5);
		ground.body.clearShapes();
		ground.body.addRectangle(100, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.fPlatform.create(2522, 1170, 'branch');
		ground.scale.setTo(0.35, 0.5);
		ground.body.clearShapes();
		ground.body.addRectangle(100, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.fPlatform.create(3080, 1550, 'branch');
		ground.scale.setTo(0.35, 0.5);
		ground.body.clearShapes();
		ground.body.addRectangle(100, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.fPlatform.create(3480, 1650, 'branch');
		ground.scale.setTo(0.35, 0.5);
		ground.body.clearShapes();
		ground.body.addRectangle(100, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.fPlatform.create(4020, 1995, 'branch');
		ground.scale.setTo(0.35, 0.5);
		ground.body.clearShapes();
		ground.body.addRectangle(100, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.fPlatform.create(4260, 2460, 'branch');
		ground.scale.setTo(0.35, 0.5);
		ground.body.clearShapes();
		ground.body.addRectangle(100, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.fPlatform.create(5450, 2950, 'branch');
		ground.scale.setTo(0.35, 0.5);
		ground.body.clearShapes();
		ground.body.addRectangle(100, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(6000, 3150, 'branch');
		ground.scale.setTo(0.35, 0.5);
		ground.body.clearShapes();
		ground.body.addRectangle(100, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.fPlatform.create(6700, 3750, 'branch');
		ground.scale.setTo(0.35, 0.5);
		ground.body.clearShapes();
		ground.body.addRectangle(100, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.fPlatform.create(7040, 3550, 'branch');
		ground.scale.setTo(0.35, 0.5);
		ground.body.clearShapes();
		ground.body.addRectangle(100, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.fPlatform.create(7305, 4120, 'branch');
		ground.scale.setTo(0.35, 0.5);
		ground.body.clearShapes();
		ground.body.addRectangle(100, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.fPlatform.create(7870, 4450, 'branch');
		ground.scale.setTo(0.35, 0.5);
		ground.body.clearShapes();
		ground.body.addRectangle(100, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);
		
		// For now, flat platforms are set to same collision group, but might have to set it to separate group
		this.fPlatform.forEach(function(plat) {
			plat.body.kinematic = true;
			plat.body.debug = devMode;
			plat.body.setCollisionGroup(this.collidePlat);
			plat.body.collides([this.collidePlayer, this.collideEnemy, this.collidePB, this.collideEB]);
		}, this);

		this.toil = game.add.group();
		this.toil.physicsBodyType = Phaser.Physics.P2JS;
		this.toil.enableBody = true;

		let toilets = new Toilet(game, 900, 754, 'toilet');
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.angle = 30;
		toilets.body.debug = true;

		toilets = new Toilet(game, 1530, 390, 'toilet');
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.debug = true;

		toilets = new Toilet(game, 2530, 1120, 'toilet');
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.debug = true;

		toilets = new Toilet(game, 3620, 2332, 'toilet');
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.angle = 30;
		toilets.body.debug = true;

		toilets = new Toilet(game, 4034, 1945, 'toilet');
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.debug = true;

		toilets = new Toilet(game, 5020, 3145, 'toilet');
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.angle = 30;
		toilets.body.debug = true;

		toilets = new Toilet(game, 6040, 3727, 'toilet');
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.angle = 30;
		toilets.body.debug = true;

		toilets = new Toilet(game, 7050, 3500, 'toilet');
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.debug = true;

		toilets = new Toilet(game, 7500, 4800, 'toilet');
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.debug = true;

		toilets = new Toilet(game, 9300, 5400, 'toilet');
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.debug = true;
		/*
		this.toil.forEach(function(tt) {
			plat.body.setCollisionGroup(this.collidePlat);
			plat.body.collides([this.collidePlayer, this.collideEnemy, this.collidePB, this.collideEB]);
		}, this);
		*/

		//sign for end of level
		game.add.sprite(9570, 5100, 'sign2');
		
		// player
		let temp_poo = 0;
		if (player) temp_poo = player.pooCount;
		player = new P2layer(game, 64, 250, 'player', null, 'poo');
		if (temp_poo != 0) player.pooCount = temp_poo;
		game.add.existing(player);
		player.body.setCollisionGroup(this.collidePlayer);
		player.body.collides([this.collidePlat, this.collideEnemy, this.collideEB]);
		player.friction = false;
		player.bullets.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collidePB);
			bull.body.collides([this.collidePlat, this.collideEnemy]);
			bull.body.createGroupCallback(this.collidePlat, function(bull, plat){
				if (bull.velocity != 0)
					player.groundSplat(bull.x, bull.y);
			});
		}, this);

		//enemy
		this.enemy = game.add.group();
		this.enemy.enableBody = true;
		this.enemy.physicsBodyType = Phaser.Physics.P2JS;
		
		//enemies on platforms, left to right
		let en = new Enemy(game, 710, 220, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePlat, function() {en.friction = true;}, en);
		en.bulletE.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collideEB);
			bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 1535, 410, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePlat, function() {en.friction = true;}, en);
		en.bulletE.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collideEB);
			bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 1810, 922, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePlat, function() {en.friction = true;}, en);
		en.bulletE.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collideEB);
			bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 2532, 1140, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePlat, function() {en.friction = true;}, en);
		en.bulletE.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collideEB);
			bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 3090, 1520, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePB, function(en, bull) {
		en.sprite.kill();
		bull.sprite.kill();
		}, en);
		en.bulletE.forEach(function(bull) {
		bull.body.setCollisionGroup(this.collideEB);
		bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);
		
		en = new Enemy(game, 3490, 1620, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePB, function(en, bull) {
		en.sprite.kill();
		bull.sprite.kill();
		}, en);
		en.bulletE.forEach(function(bull) {
		bull.body.setCollisionGroup(this.collideEB);
		bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 4030, 1965, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePB, function(en, bull) {
		en.sprite.kill();
		bull.sprite.kill();
		}, en);
		en.bulletE.forEach(function(bull) {
		bull.body.setCollisionGroup(this.collideEB);
		bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 4270, 2430, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePB, function(en, bull) {
		en.sprite.kill();
		bull.sprite.kill();
		}, en);
		en.bulletE.forEach(function(bull) {
		bull.body.setCollisionGroup(this.collideEB);
		bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 5460, 2920, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePB, function(en, bull) {
		en.sprite.kill();
		bull.sprite.kill();
		}, en);
		en.bulletE.forEach(function(bull) {
		bull.body.setCollisionGroup(this.collideEB);
		bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 6010, 3120, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePB, function(en, bull) {
		en.sprite.kill();
		bull.sprite.kill();
		}, en);
		en.bulletE.forEach(function(bull) {
		bull.body.setCollisionGroup(this.collideEB);
		bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 6710, 3720, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePB, function(en, bull) {
		en.sprite.kill();
		bull.sprite.kill();
		}, en);
		en.bulletE.forEach(function(bull) {
		bull.body.setCollisionGroup(this.collideEB);
		bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 7315, 4090, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePB, function(en, bull) {
		en.sprite.kill();
		bull.sprite.kill();
		}, en);
		en.bulletE.forEach(function(bull) {
		bull.body.setCollisionGroup(this.collideEB);
		bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 7865, 4380, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePB, function(en, bull) {
		en.sprite.kill();
		bull.sprite.kill();
		}, en);
		en.bulletE.forEach(function(bull) {
		bull.body.setCollisionGroup(this.collideEB);
		bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 9351, 5360, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePlat, function() {en.friction = true;}, en);
		en.bulletE.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collideEB);
			bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 9231, 5360, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePlat, function() {en.friction = true;}, en);
		en.bulletE.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collideEB);
			bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 9451, 5360, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePlat, function() {en.friction = true;}, en);
		en.bulletE.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collideEB);
			bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		en = new Enemy(game, 9751, 5360, 'deer', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		en.body.createGroupCallback(this.collidePlat, function() {en.friction = true;}, en);
		en.bulletE.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collideEB);
			bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);

		//test for flying enemy
		for(var i = 0; i < 5; ++i){
			en = new Enemy(game, game.rnd.integerInRange(1000,4800),
			 400, 'enemy');
			game.add.existing(en);
			this.enemy.add(en);
		}

		// Set camera to platformer follow up
		// lerp set for smooth camera movement
		game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, 0.25, 0.25);
		
		// UI
		this.ui = barUI();
		this.full_width = this.ui.width;
		this.cropRect = new Phaser.Rectangle(0, 0, player.pooCount/MAXPOO * this.ui.width, this.ui.height);
		this.ui.crop(this.cropRect);

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
		this.toiletCounter = game.add.text(game.width - 78, 16, this.toil.total, style);
		this.toiletCounter.fixedToCamera = true;
		this.toiletCounter.cameraOffset.setTo(game.width - 78, 16);
	},
	update: function() {
		// Update function
		
		// enemy movement towards player
		// if(game.physics.arcade.collide(enemy, platform)){
		// 	game.physics.arcade.moveToObject(enemy, player);
		// }
		//game.physics.arcade.moveToObject(this.en3, player);

		// UI update
		this.cropRect.width = player.pooCount/MAXPOO * this.full_width;
		this.ui.updateCrop();
		this.toiletCounter.text = this.toil.total;
		
		//for end of level
		if(player.x +50 > game.world.width && this.toil.total == 0){
			BGM[1].stop();
			game.state.start('boss');
		}

	},
	movToPl: function(en, platform) {
		game.physics.arcade.moveToObject(en, player);
	},
	render: function() {
		if (devMode) {
			game.debug.text('fps: ' + game.time.fps, 32, 86, 'yellow');
			game.debug.text('num of enemy: ' + this.enemy.total, 32, 102, 'yellow');
		}
	}
}