var play = function() {
	// Global state variables
	this.bullets, this.enemy;
	this.platform; this.en3;
	this.obstacle;
	this.heller = null;
	this.ui, this.music;

	this.collidePlayer, this.collideEmeny, this.collidePlat;
	this.collidePB, this.collideEB;
}

play.prototype = {
	preload: function() {
		
	},
	create: function() {
		if (!this.music || this.music.isPlaying === false) {
			this.music = game.add.audio('stage1bgm', 0.5, true);
			this.music.play();
		}
		// Setting up game world
		game.world.setBounds(0, 0, 8000, 800);
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		
		// Asset implementaion
		var background = game.add.sprite(0, 0, 'porter');
		game.add.tileSprite(1800, 0, 6200, 800, 'heller');

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

		let ground = this.platform.create(4000, game.world.height, 'platform');
		ground.scale.setTo(game.world.width, 1 );
		ground.body.clearShapes();
		ground.body.addRectangle(10000, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);
		
		//platforms in order, left to right
		
		let platforms = this.platform.create(800, 682, 'bus');
		platforms.body.kinematic = true;
		platforms.body.debug = true;

		platforms = this.platform.create(1240, 722, 'rcar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(1940, 682, 'wcar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.angle = 30;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		//double verticle bus
		platforms = this.platform.create(2250, 512, 'busObs');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.loadPolygon('physicsbox', 'busObs');

		platforms = this.platform.create(2580, 702, 'ycar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.angle = -20;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(3260, 712, 'rcar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.angle = 12;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(3520, 622, 'bus');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.angle = 16;
		platforms.angle = 180;

		//stack of car and bus
		platforms = this.platform.create(4600, 537, 'carObs');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.loadPolygon('physicsbox', 'carObs');

		//more cars and buses
		platforms = this.platform.create(5440, 728, 'wcar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.angle = 180;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(5990, 713, 'rcar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.angle = 15;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(6240, 722, 'ycar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.angle = -10;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(6740, 722, 'wcar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.angle = 5;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(7340, 668, 'rcar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.angle = 90;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		//double verticle bus
		platforms = this.platform.create(7600, 512, 'busObs');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.loadPolygon('physicsbox', 'busObs');

		//crashed cars and bus in buildings
		platforms = this.platform.create(1450, 320, 'wreckC');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.loadPolygon('physicsbox', 'wreckedcar');


		platforms = this.platform.create(6630, 400, 'wreckB');
		platforms.body.kinematic = true;
		platforms.body.angle = 75;
		platforms.body.debug = true;

		this.platform.forEach(function(plat) {
			plat.body.setCollisionGroup(this.collidePlat);
			plat.body.collides([this.collidePlayer, this.collideEnemy, this.collidePB, this.collideEB]);
		}, this);

		// the background wrap 
		// var wrapGround = game.add.sprite(0, game.world.height - 300, 'heller');
		// wrapGround.scale.setTo(2,0.8);
		// wrapGround.width = game.width;
		// this.heller = this.add.tileSprite(0, game.world.height - 500, game.world.width, game.height/2, 'heller');

		// player
		player = new P2layer(game, 'player', null, 'poo');
		game.add.existing(player);
		player.body.setCollisionGroup(this.collidePlayer);
		player.body.collides([this.collidePlat, this.collideEnemy, this.collideEB]);
		player.bullets.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collidePB);
			bull.body.collides([this.collidePlat, this.collideEnemy]);
		}, this);

		// enemy
		this.enemy = game.add.group();
		this.enemy.enableBody = true;
		this.enemy.physicsBodyType = Phaser.Physics.P2JS;
		
		for(var i = 0; i < 20; ++i){
			let en = new Enemy(game, game.rnd.integerInRange(600,7700),
				game.rnd.integerInRange(200,600), 'deer', null, 'pepto');
			game.add.existing(en);
			this.enemy.add(en);
			en.body.setCollisionGroup(this.collideEnemy);
			en.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
			// NEED TO FIX PLAYER BULLET AND ENEMY BODY COLLSION CALLBACK EVENT
			//en.body.createGroupCallback(this.collidePB, en.death, en);
			en.bulletE.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collideEB);
			bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();},this);
		}, this);
		}

		//test for 2nd enemy on screen
		// en = new Enemy(game, 30, 1000, 'enemy');
		// game.add.existing(en);
		// this.enemy.add(en);

		//test for flying enemy
		for(var i = 0; i < 7; ++i){
			enfl = new Enemy(game, game.rnd.integerInRange(100,600),
			 100, 'enemy', null, null, 'kamikaze_turkey');
			game.add.existing(enfl);
			this.enemy.add(enfl);
			enfl.body.setCollisionGroup(this.collideEnemy);
			enfl.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
			enfl.body.createGroupCallback(this.collidePlat, function() {this.kill();}, enfl);
		}

		//sign for end of level
		let sign = this.platform.create(7400, 300, 'sign');
		sign.body.immovable = true;
		//sign.scale.setTo(1,1);
		// Need to fix sign in the air (no collision) <- can we just make it as a part of bg?

		// Set camera to platformer follow up
		// lerp set for smooth camera movement
		game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, 0.25, 0.25);

		// Fix UI to the camera
		this.pooMeter(MAXPOO, 0x000000);
		this.ui = this.pooMeter(player.pooCount, 0x492008);
	},
	pooMeter: function(pooNum, color) {
		let obj = null;

		// create primitive
		let g = game.add.graphics();
		g.beginFill(color);
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
		this.ui = this.pooMeter(player.pooCount, 0x492008);
		
		//for end of level
		if(player.x +50 > game.world.width){
			game.state.start('play2');
			this.music.stop();
		}

	},
	movToPl: function(en, platform) {
		game.physics.arcade.moveToObject(en, player);
	},

	ded: function() {
		// enfl.kill();

	}
	// Char control is implemented in player.js
}