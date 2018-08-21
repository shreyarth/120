var play = function() {
	// Global state variables
	this.bullets, this.enemy;
	this.platform; this.en3;
	this.obstacle;
	this.heller = null;
	this.ui;

	this.collidePlayer, this.collideEmeny, this.collidePlat;
}

play.prototype = {
	preload: function() {
		
	},
	create: function() {
		// Setting up game world
		game.world.setBounds(0, 0, 5000, 1200);
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		
		// Asset implementaion
		var background = game.add.sprite(0, 0, 'porter');
		background.width = game.world.width;
		background.height = game.world.height -32;
		
		// Setting up collision groups
		this.collidePlayer = game.physics.p2.createCollisionGroup();
		this.collideEnemy = game.physics.p2.createCollisionGroup();
		this.collidePlat = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup([this.collidePlayer, this.collideEnemy, this.collidePlat]);

		//ground
		this.platform = game.add.group();
		this.platform.physicsBodyType = Phaser.Physics.P2JS;
		this.platform.enableBody = true;

		let ground = this.platform.create(0, game.world.height -32, 'platform');
		ground.scale.setTo(game.world.width, 1 );
		ground.body.clearShapes();
		ground.body.addRectangle(game.world.width, 25);
		ground.body.kinematic = true;
		ground.body.debug = true;
		ground.body.setCollisionGroup(this.collidePlat);
		
		//platforms in order, left to right
		
		let platforms = this.platform.create(800, 1013, 'bus');
		platforms.body.kinematic = true;
		platforms.body.debug = true;

		platforms = this.platform.create(1240, 1090, 'rcar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(1940, 1040, 'wcar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.angle = 30;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		//double verticle bus
		platforms = this.platform.create(2250, 880, 'busObs');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.loadPolygon('physicsbox', 'busObs');

		platforms = this.platform.create(2580, 1070, 'ycar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.angle = -20;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(3260, 1070, 'rcar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.angle = 12;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(3520, 970, 'bus');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.angle = 16;
		platforms.angle = 180;

		//stack of car and bus
		platforms = this.platform.create(4600, 900, 'carObs');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.loadPolygon('physicsbox', 'carObs');

		//crashed cars and bus in buildings
		platforms = this.platform.create(1700, 420, 'wreckC');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.body.clearShapes();
		platforms.body.loadPolygon('physicsbox', 'wreckedcar');


		platforms = this.platform.create(2530, 400, 'wreckB');
		platforms.body.kinematic = true;
		platforms.body.debug = true;

		this.platform.forEach(function(plat) {
			plat.body.setCollisionGroup(this.collidePlat);
			plat.body.collides([this.collidePlayer, this.collideEnemy]);
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
		player.body.collides([this.collidePlat, this.collideEnemy]);

		// enemy
		this.enemy = game.add.group();
		this.enemy.enableBody = true;
		this.enemy.physicsBodyType = Phaser.Physics.P2JS;
		
		for(var i = 0; i < 10; ++i){
			let en = new Enemy(game, game.rnd.integerInRange(600,4900),
				game.rnd.integerInRange(200,1000), 'enemy', null, 'star');
			game.add.existing(en);
			this.enemy.add(en);
			en.body.setCollisionGroup(this.collideEnemy);
			en.body.collides([this.collidePlat, this.collidePlayer]);
			en.bulletE.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collideEnemy);
			bull.body.collides([this.collidePlayer, this.collidePlat]);
		}, this);
		}

		//test for 2nd enemy on screen
		// en = new Enemy(game, 30, 1000, 'enemy');
		// game.add.existing(en);
		// this.enemy.add(en);

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