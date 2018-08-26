var play2 = function() {
	// Global state variables
	this.bullets, this.enemy;
	this.platform; this.en3;
	this.obstacle;
	this.ui, this.music;

	this.collidePlayer, this.collideEmeny, this.collidePlat;
	this.collidePB, this.collideEB;
	// inPlay2 = true;
	// 7 toilets
}

play2.prototype = {
	preload: function() {
		
	},
	create: function() {
		if (!this.music) {
			this.music = game.add.audio('stage1bgm', 0.5, true);
			if (this.music.isPlaying === false)
				this.music.play();
		}
		// Setting up game world
		game.world.setBounds(0, 0, 10000, 6000);
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		
		// Asset implementaion
		game.stage.backgroundColor = "#48cd25";

		//bg to put in for reaching bookstore
		var background = game.add.sprite(-400, -645, 'slopehill');
		background = game.add.sprite(1040, 185, 'slopehill');
		background = game.add.sprite(2200, 854, 'heller2');
		background = game.add.sprite(3200, 1431, 'heller2');
		background = game.add.sprite(4400, 2123, 'heller2');
		background = game.add.sprite(5600, 2815, 'heller2');
		background = game.add.sprite(8000, 4640, 'porter');
		//last heller crap
		background = game.add.sprite(6800, 3507, 'heller2');
		
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
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(1150, 963, 'bush');
		ground.scale.setTo(3.15, 0.6 );
		ground.body.damping = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(1000, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(1980, 1443, 'bush');
		ground.scale.setTo(0.95, 0.6 );
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(300, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(2680, 1847, 'bush');
		ground.scale.setTo(0.3, 0.6 );
		ground.body.damping.x = 0;
		ground.body.angularForce = 100;
		ground.body.angularVelocity = 1
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(90, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(3480, 2310, 'bush');
		ground.scale.setTo(2.85, 0.6 );
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(900, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(4600, 2957, 'bush');
		ground.scale.setTo(3.15, 0.6 );
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(1000, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(5580, 3522, 'bush');
		ground.scale.setTo(0.95, 0.6 );
		ground.body.angularForce = 100;
		ground.body.angularVelocity = 1
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(300, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(6000, 3765, 'bush');
		ground.scale.setTo(0.3, 0.6 );
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(90, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(6880, 4273, 'bush');
		ground.scale.setTo(0.15, 0.6 );
		ground.body.angularForce = 100;
		ground.body.angularVelocity = 1
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(40, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(8200, 5038, 'bush');
		ground.scale.setTo(5.7, 0.6);
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(1800, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		//the ones not calling a sprite are the ceilings
		ground = this.platform.create(4600, 1950, '');
		ground.scale.setTo(game.world.width, 1 );
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(game.world.width, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(9500, 5450, 'bush');
		ground.scale.setTo(4.3, 0.6 );
		ground.body.damping.x = 0;
		ground.body.clearShapes();
		ground.body.addRectangle(1800, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);
		
		//platforms and enemies in order, left to right

		let ePlat = this.platform.create(700, 250, 'branch');
		ePlat.scale.setTo(0.35, 0.5);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.platform.create(1525, 440, 'branch');
		ePlat.scale.setTo(0.35, 0.5);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.platform.create(1800, 952, 'branch');
		ePlat.scale.setTo(0.35, 0.5);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.platform.create(2522, 1170, 'branch');
		ePlat.scale.setTo(0.35, 0.5);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.platform.create(3080, 1550, 'branch');
		ePlat.scale.setTo(0.35, 0.5);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.platform.create(3480, 1650, 'branch');
		ePlat.scale.setTo(0.35, 0.5);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.platform.create(4020, 1995, 'branch');
		ePlat.scale.setTo(0.35, 0.5);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.platform.create(4260, 2460, 'star');
		ePlat.scale.setTo(0.35, 0.5);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.platform.create(5450, 2950, 'star');
		ePlat.scale.setTo(0.35, 0.5);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.platform.create(6000, 3150, 'star');
		ePlat.scale.setTo(0.35, 0.5);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.platform.create(6700, 3750, 'star');
		ePlat.scale.setTo(0.35, 0.5);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.platform.create(7040, 3550, 'star');
		ePlat.scale.setTo(0.35, 0.5);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.platform.create(7305, 4120, 'star');
		ePlat.scale.setTo(0.35, 0.5);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.platform.create(7870, 4450, 'star');
		ePlat.scale.setTo(0.35, 0.5);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		this.toil = game.add.group();
		this.toil.physicsBodyType = Phaser.Physics.P2JS;
		this.toil.enableBody = true;

		let toilets = new Toilet(game, 900, 754, 'toilet');
		game.add.existing(toilets);
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.angle = 30;
		toilets.body.debug = true;

		toilets = new Toilet(game, 1530, 390, 'toilet');
		game.add.existing(toilets);
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.debug = true;

		toilets = new Toilet(game, 2530, 1120, 'toilet');
		game.add.existing(toilets);
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.debug = true;

		toilets = new Toilet(game, 3468, 2242, 'toilet');
		game.add.existing(toilets);
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.angle = 30;
		toilets.body.debug = true;

		toilets = new Toilet(game, 4034, 1945, 'toilet');
		game.add.existing(toilets);
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.debug = true;

		toilets = new Toilet(game, 5020, 3145, 'toilet');
		game.add.existing(toilets);
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.angle = 30;
		toilets.body.debug = true;

		toilets = new Toilet(game, 6040, 3727, 'toilet');
		game.add.existing(toilets);
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.angle = 30;
		toilets.body.debug = true;

		toilets = new Toilet(game, 7050, 3500, 'toilet');
		game.add.existing(toilets);
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.debug = true;

		toilets = new Toilet(game, 7500, 4800, 'toilet');
		game.add.existing(toilets);
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.debug = true;

		toilets = new Toilet(game, 9570, 5015, 'toilet');
		game.add.existing(toilets);
		this.toil.add(toilets);
		toilets.body.kinematic = true;
		toilets.body.debug = true;

		this.platform.forEach(function(plat) {
			plat.body.setCollisionGroup(this.collidePlat);
			plat.body.collides([this.collidePlayer, this.collideEnemy, this.collidePB, this.collideEB]);
		}, this);

		// player
		player = new P2layer(game, 'player', null, 'poo');
		game.add.existing(player);
		player.body.setCollisionGroup(this.collidePlayer);
		player.body.collides([this.collidePlat, this.collideEnemy, this.collideEB]);
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

		en = new Enemy(game, 8951, 5360, 'deer', null, 'pepto');
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

		//sign for end of level
		let sign = this.platform.create(9570, 5100, 'sign');
		sign.scale.setTo(1, 1);
		sign.body.clearShapes();
		sign.body.addRectangle(150, 100);
		sign.body.kinematic = true;
		sign.body.debug = true;
		sign.body.setCollisionGroup(this.collidePlat);
		sign.body.immovable = true;
		// Need to fix sign in the air (no collision) <- can we just make it as a part of bg?

		// Set camera to platformer follow up
		// lerp set for smooth camera movement
		game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, 0.25, 0.25);

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
		this.toiletCounter = game.add.text(game.width - 78, 16, this.toil.total, style);
		this.toiletCounter.fixedToCamera = true;
		this.toiletCounter.cameraOffset.setTo(game.width - 78, 16);
	},
	pooMeter: function(pooNum) {
		let obj = null;

		// create primitive
		let g = game.add.graphics();
		g.beginFill(0x492008);
		g.drawRect(32, 32, pooNum * 5, 32);	// Starting point, width, height
		g.endFill();

		// transform primitive into sprite and destroy primitive
		obj = game.add.sprite(32, 32, g.generateTexture());
		obj.fixedToCamera = true;
		obj.cameraOffset.setTo(32, 16);
		g.destroy();

		return obj;
	},
	update: function() {
		// Update function
		
		// enemy movement towards player
		// if(game.physics.arcade.collide(enemy, platform)){
		// 	game.physics.arcade.moveToObject(enemy, player);
		// }
		//game.physics.arcade.moveToObject(this.en3, player);

		// UI update
		if (this.ui)
			this.ui.destroy();
		this.ui = pooMeter(player.pooCount, 0x492008);
		this.toiletCounter.text = this.toil.total;
		
		//for end of level
		if(player.x +50 > game.world.width && this.toil.total == 0){
			game.state.start('boss');
			this.music.stop();
		}

	},
	movToPl: function(en, platform) {
		game.physics.arcade.moveToObject(en, player);
	}
	// Char control is implemented in player.js
}