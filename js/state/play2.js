var play2 = function() {
	// Global state variables
	this.bullets, this.enemy;
	this.platform; this.en3;
	this.enemyplat;
	this.obstacle;
	this.ui, this.music;

	this.collidePlayer, this.collideEmeny, this.collidePlat;
	this.collidePB, this.collideEB;
	// inPlay2 = true;
	
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
		var background = game.add.sprite(-400, -645, 'heller2');
		background = game.add.sprite(800, 47, 'heller2');
		background = game.add.sprite(2000, 739, 'heller2');
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

		let ground = this.platform.create(0, 300, 'platform');
		ground.scale.setTo(game.world.width, 1 );
		ground.body.angle = 30;
		ground.body.damping = 0;
		ground.body.angularDamping = 0;
		ground.body.clearShapes();
		ground.body.addRectangle(1000, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(1150, 963, 'platform');
		ground.scale.setTo(100, 1 );
		ground.body.damping = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(1000, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(1980, 1443, 'platform');
		ground.scale.setTo(100, 1 );
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(300, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(2680, 1847, 'platform');
		ground.scale.setTo(0.3, 1 );
		ground.body.damping.x = 0;
		ground.body.angularForce = 100;
		ground.body.angularVelocity = 1
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(90, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(3480, 2310, 'platform');
		ground.scale.setTo(100, 1 );
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(900, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(4600, 2957, 'platform');
		ground.scale.setTo(game.world.width, 1 );
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(1000, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(5580, 3522, 'platform');
		ground.scale.setTo(0.4, 1 );
		ground.body.angularForce = 100;
		ground.body.angularVelocity = 1
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(300, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(6000, 3765, 'platform');
		ground.scale.setTo(100, 1 );
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(90, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(6880, 4273, 'platform');
		ground.scale.setTo(0.1, 1 );
		ground.body.angularForce = 100;
		ground.body.angularVelocity = 1
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(40, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);

		ground = this.platform.create(8480, 5195, 'platform');
		ground.scale.setTo(100, 1 );
		ground.body.damping.x = 0;
		ground.body.angle = 30;
		ground.body.clearShapes();
		ground.body.addRectangle(2000, 25);
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

		ground = this.platform.create(8900, 5450, 'platform');
		ground.scale.setTo(game.world.width, 1 );
		ground.body.damping.x = 0;
		ground.body.clearShapes();
		ground.body.addRectangle(2300, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);
		
		//platforms for enemies in order, left to right

		this.enemyplat = game.add.group();
		this.enemyplat.physicsBodyType = Phaser.Physics.P2JS;
		this.enemyplat.enableBody = true;

		let ePlat = this.enemyplat.create(700, 250, 'star');
		ePlat.scale.setTo(1, 1);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.enemyplat.create(1525, 440, 'star');
		ePlat.scale.setTo(1, 1);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.enemyplat.create(1800, 952, 'star');
		ePlat.scale.setTo(1, 1);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.enemyplat.create(2522, 1170, 'star');
		ePlat.scale.setTo(1, 1);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.enemyplat.create(3080, 1550, 'star');
		ePlat.scale.setTo(1, 1);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.enemyplat.create(3480, 1650, 'star');
		ePlat.scale.setTo(1, 1);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.enemyplat.create(4020, 1995, 'star');
		ePlat.scale.setTo(1, 1);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.enemyplat.create(4260, 2460, 'star');
		ePlat.scale.setTo(1, 1);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.enemyplat.create(5450, 2950, 'star');
		ePlat.scale.setTo(1, 1);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.enemyplat.create(6000, 3150, 'star');
		ePlat.scale.setTo(1, 1);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.enemyplat.create(6700, 3750, 'star');
		ePlat.scale.setTo(1, 1);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.enemyplat.create(7305, 4120, 'star');
		ePlat.scale.setTo(1, 1);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);

		ePlat = this.enemyplat.create(7870, 4450, 'star');
		ePlat.scale.setTo(1, 1);
		ePlat.body.clearShapes();
		ePlat.body.addRectangle(100, 25);
		ePlat.body.kinematic = true;
		ePlat.body.debug = true;
		ePlat.body.setCollisionGroup(this.collidePlat);
		
		// let platforms = this.platform.create(800, 613, 'bus');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;

		// platforms = this.platform.create(1240, 690, 'rcar');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;
		// platforms.body.clearShapes();
		// platforms.body.loadPolygon('physicsbox', 'yellowCar');

		// platforms = this.platform.create(1940, 640, 'wcar');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;
		// platforms.body.clearShapes();
		// platforms.body.angle = 30;
		// platforms.body.loadPolygon('physicsbox', 'yellowCar');

		// //double verticle bus
		// platforms = this.platform.create(2250, 480, 'busObs');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;
		// platforms.body.clearShapes();
		// platforms.body.loadPolygon('physicsbox', 'busObs');

		// platforms = this.platform.create(2580, 670, 'ycar');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;
		// platforms.body.clearShapes();
		// platforms.body.angle = -20;
		// platforms.body.loadPolygon('physicsbox', 'yellowCar');

		// platforms = this.platform.create(3260, 670, 'rcar');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;
		// platforms.body.clearShapes();
		// platforms.body.angle = 12;
		// platforms.body.loadPolygon('physicsbox', 'yellowCar');

		// platforms = this.platform.create(3520, 570, 'bus');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;
		// platforms.body.angle = 16;
		// platforms.angle = 180;

		// //stack of car and bus
		// platforms = this.platform.create(4600, 500, 'carObs');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;
		// platforms.body.clearShapes();
		// platforms.body.loadPolygon('physicsbox', 'carObs');

		// //more cars and buses
		// platforms = this.platform.create(5440, 690, 'wcar');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;
		// platforms.body.clearShapes();
		// platforms.body.angle = 180;
		// platforms.body.loadPolygon('physicsbox', 'yellowCar');

		// platforms = this.platform.create(6240, 640, 'rcar');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;
		// platforms.body.clearShapes();
		// platforms.body.loadPolygon('physicsbox', 'yellowCar');

		// platforms = this.platform.create(6040, 670, 'ycar');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;
		// platforms.body.clearShapes();
		// platforms.body.angle = -10;
		// platforms.body.loadPolygon('physicsbox', 'yellowCar');

		// platforms = this.platform.create(6740, 680, 'wcar');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;
		// platforms.body.clearShapes();
		// platforms.body.angle = 5;
		// platforms.body.loadPolygon('physicsbox', 'yellowCar');

		// platforms = this.platform.create(7340, 640, 'rcar');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;
		// platforms.body.clearShapes();
		// platforms.body.angle = 90;
		// platforms.body.loadPolygon('physicsbox', 'yellowCar');

		// //double verticle bus
		// platforms = this.platform.create(7650, 480, 'busObs');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;
		// platforms.body.clearShapes();
		// platforms.body.loadPolygon('physicsbox', 'busObs');

		// //crashed cars and bus in buildings
		// platforms = this.platform.create(1700, 320, 'wreckC');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;
		// platforms.body.clearShapes();
		// platforms.body.loadPolygon('physicsbox', 'wreckedcar');


		// platforms = this.platform.create(5530, 300, 'wreckB');
		// platforms.body.kinematic = true;
		// platforms.body.debug = true;

		this.platform.forEach(function(plat) {
			plat.body.setCollisionGroup(this.collidePlat);
			plat.body.collides([this.collidePlayer, this.collideEnemy, this.collidePB, this.collideEB]);
		}, this);

		// player
		player = new P2layer(game, 'player', null, 'poo');
		game.add.existing(player);
		player.body.setCollisionGroup(this.collidePlayer);
		player.body.collides([this.collidePlat, this.collideEnemy, this.collideEB]);
		player.friction = false;
		player.bullets.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collidePB);
			bull.body.collides([this.collidePlat, this.collideEnemy]);
			bull.body.debug = true;
		}, this);

		// enemy
		this.enemy = game.add.group();
		this.enemy.enableBody = true;
		this.enemy.physicsBodyType = Phaser.Physics.P2JS;
		
		for(var i = 0; i < 20; ++i){
			let en = new Enemy(game, game.rnd.integerInRange(600,7700),
				game.rnd.integerInRange(200,600), 'enemy', null, 'pepto');
			game.add.existing(en);
			this.enemy.add(en);
			en.body.setCollisionGroup(this.collideEnemy);
			en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
			en.body.createGroupCallback(this.collidePlat, function() {en.friction = true;}, en);
			en.bulletE.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collideEB);
			bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);
		}

		//test for flying enemy
		for(var i = 0; i < 5; ++i){
			en = new Enemy(game, game.rnd.integerInRange(1000,4800),
			 400, 'enemy');
			game.add.existing(en);
			this.enemy.add(en);
		}

		//sign for end of level
		let sign = this.platform.create(4800, 900, 'sign');
		sign.body.immovable = true;
		sign.scale.setTo(1,1);
		// Need to fix sign in the air (no collision) <- can we just make it as a part of bg?

		// Set camera to platformer follow up
		// lerp set for smooth camera movement
		game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, 0.25, 0.25);

		// Fix UI to the camera
		this.ui = this.pooMeter(player.pooCount);
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
		this.ui.destroy();
		this.ui = this.pooMeter(player.pooCount);
		
		//for end of level
		if(player.x +30 > game.world.width){
			game.state.start('end');
		}

	},
	movToPl: function(en, platform) {
		game.physics.arcade.moveToObject(en, player);
	}
	// Char control is implemented in player.js
}