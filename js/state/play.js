var play = function() {
	// Global state variables
	this.bullets, this.enemy;
	this.platform; this.en3;
	this.obstacle;
	this.heller = null;
	this.ui, this.full_width, this.cropRect;
	this.toil; this.toiletCount;

	this.collidePlayer, this.collideEmeny, this.collidePlat;
	this.collidePB, this.collideEB;
}

play.prototype = {
	preload: function() {
		
	},
	create: function() {
		if (devMode) game.time.advancedTiming = true;
		if (!BGM[1].isPlaying)
			BGM[1].play();

		// Setting up game world
		game.world.setBounds(0, 0, 8000, 800);
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		
		// Asset implementaion
		game.add.sprite(0, 0, 'porter');
		background = game.add.sprite(0, 0, 'porter');
		game.add.sprite(2000, 0, 'heller');
		game.add.sprite(3850, 0, 'heller');
		game.add.sprite(5680, 0, 'heller');
		game.add.sprite(6900, 0, 'nerdhill');

		// Setting up collision groups
		this.collidePlayer = game.physics.p2.createCollisionGroup();
		this.collideEnemy = game.physics.p2.createCollisionGroup();
		this.collidePlat = game.physics.p2.createCollisionGroup();
		this.collidePB = game.physics.p2.createCollisionGroup();
		this.collideEB = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup([this.collidePlayer, this.collideEnemy, this.collidePlat, 
			this.collidePB, this.collideEB]);	// Reconfigure bounds for collision groups

		//ground
		this.platform = game.add.group();
		this.platform.physicsBodyType = Phaser.Physics.P2JS;
		this.platform.enableBody = true;

		let ground = this.platform.add(game.add.tileSprite(3000, game.world.height, 10000, 25,'sidewalk'));
		ground.body.clearShapes();
		ground.body.addRectangle(20000, 25);
		
		//platforms in order, left to right
		let platforms = this.platform.create(800, 682, 'bus');
		platforms.body.clearShapes();
		platforms.body.addRectangle(394, 176);

		platforms = this.platform.create(1240, 722, 'rcar');
		platforms.body.clearShapes();
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(1940, 682, 'wcar');
		platforms.body.clearShapes();
		platforms.body.angle = 30;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(2250, 512, 'busObs');
		platforms.body.clearShapes();
		platforms.body.loadPolygon('physicsbox', 'busObs');

		platforms = this.platform.create(2580, 702, 'ycar');
		platforms.body.clearShapes();
		platforms.body.angle = -20;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(3260, 712, 'rcar');
		platforms.body.clearShapes();
		platforms.body.angle = 12;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(3520, 622, 'bus');
		platforms.body.clearShapes();
		platforms.body.addRectangle(394, 176);
		platforms.body.angle = 16;
		platforms.angle = 180;

		//stack of car and bus
		platforms = this.platform.create(4600, 537, 'carObs');
		platforms.body.clearShapes();
		platforms.body.loadPolygon('physicsbox', 'carObs');

		//more cars and buses
		platforms = this.platform.create(5440, 728, 'wcar');
		platforms.body.clearShapes();
		platforms.body.angle = 180;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(5990, 713, 'rcar');
		platforms.body.clearShapes();
		platforms.body.angle = 15;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(6240, 722, 'ycar');
		platforms.body.clearShapes();
		platforms.body.angle = -10;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(6740, 722, 'wcar');
		platforms.body.clearShapes();
		platforms.body.angle = 5;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		platforms = this.platform.create(7340, 668, 'rcar');
		platforms.body.clearShapes();
		platforms.body.angle = 90;
		platforms.body.loadPolygon('physicsbox', 'yellowCar');

		//double verticle bus
		platforms = this.platform.create(7600, 512, 'busObs');
		platforms.body.clearShapes();
		platforms.body.loadPolygon('physicsbox', 'busObs');

		//crashed cars and bus in buildings
		platforms = this.platform.create(1450, 320, 'wreckC');
		platforms.body.clearShapes();
		platforms.body.loadPolygon('physicsbox', 'wreckedcar');

		platforms = this.platform.create(6730, 400, 'wreckB');
		platforms.body.clearShapes();
		platforms.body.addRectangle(160, 276);
		platforms.body.angle = 80;

		this.platform.forEach(function(plat) {
			plat.body.kinematic = true;
			plat.body.debug = devMode;
			plat.body.setCollisionGroup(this.collidePlat);
			plat.body.collides([this.collidePlayer, this.collideEnemy, this.collidePB, this.collideEB]);
		}, this);

		//sign for end of level
		game.add.sprite(7000, 500, 'sign');

		//toilets, player must collide with all before moving on
		this.toil = game.add.group();
		this.toil.physicsBodyType = Phaser.Physics.P2JS;
		this.toil.enableBody = true;

		let toilets = new Toilet(game, 815, 559, 'toilet');
		this.toil.add(toilets);

		toilets = new Toilet(game, 1472, 224, 'toilet');
		this.toil.add(toilets);

		toilets = new Toilet(game, 1886, 756, 'toilet');
		this.toil.add(toilets);

		toilets = new Toilet(game, 3087, 756, 'toilet');
		this.toil.add(toilets);

		toilets = new Toilet(game, 4317, 756, 'toilet');
		this.toil.add(toilets);

		toilets = new Toilet(game, 4927, 756, 'toilet');
		this.toil.add(toilets);

		toilets = new Toilet(game, 6129, 680, 'toilet');
		this.toil.add(toilets);

		toilets = new Toilet(game, 6767, 275, 'toilet');
		this.toil.add(toilets);
		toilets.body.angle = -10;

		toilets = new Toilet(game, 7322, 510, 'toilet');
		this.toil.add(toilets);
		toilets.body.angle = -10;

		toilets = new Toilet(game, 7847, 756, 'toilet');
		this.toil.add(toilets);

		this.toil.forEach(function(tt) {
			tt.body.kinematic = true;
			tt.body.debug = devMode;
		});

		// player
		player = new P2layer(game, 64, game.world.height - 100, 'player', null, 'poo');
		game.add.existing(player);
		player.body.setCollisionGroup(this.collidePlayer);
		player.body.collides([this.collidePlat, this.collideEnemy, this.collideEB]);
		player.bullets.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collidePB);
			bull.body.collides([this.collidePlat, this.collideEnemy]);
			bull.body.createGroupCallback(this.collidePlat, function(bull, plat){
				if (bull.velocity != 0){
					player.groundSplat(bull.x, bull.y);
				}
			});
		}, this);

		// enemy
		this.enemy = game.add.group();
		this.enemy.physicsBodyType = Phaser.Physics.P2JS;
		this.enemy.enableBody = true;
		
		//hardcoding enemy placement from left to right
		let en = new Enemy(game, 696, 540, 'bad1', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.scale.setTo(0.2,0.2);
		en.body.clearShapes();
		en.body.addRectangle(30, 70);
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
		en.body.immovable = true;
		
		en = new Enemy(game, 960, 540, 'bad2', null, 'pepto');
		game.add.existing(en);
		this.enemy.add(en);
		en.scale.setTo(0.2,0.2);
		en.body.clearShapes();
		en.body.addRectangle(30, 70);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 1273, 615, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 1467, 214, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 1450, 746, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);

		en = new Enemy(game, 1864, 746, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);

		en = new Enemy(game, 2111, 223, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 2373, 205, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 2717, 746, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);

		en = new Enemy(game, 3110, 746, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 4020, 746, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 3263, 608, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 4308, 746, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);

		en = new Enemy(game, 4472, 270, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 4775, 264, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 4944, 746, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);

		en = new Enemy(game, 5200, 746, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);

		en = new Enemy(game, 5600, 746, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);

		en = new Enemy(game, 5278, 746, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);

		en = new Enemy(game, 6290, 605, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 6678, 267, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 6841, 267, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 7354, 498, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 7492, 221, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 7598, 214, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		en = new Enemy(game, 7743, 205, 'deer', null, 'pepto');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, false);
		en.body.immovable = true;

		// Randomly placed enemies
		// TURKEYS
		for(var i = 0; i < 15; ++i){
			en = new Enemy(game, game.rnd.integerInRange(1800,8000), 
				game.rnd.integerInRange(80, 250), 'enemy', null, null, 'kamikaze_turkey');
			this.enemy.add(en);
			this.assignCollisionGroup_Enemy(en, true);
		}
		
		en= new Enemy(game, 700, 250, 'enemy', null, null, 'kamikaze_turkey');
		this.enemy.add(en);
		this.assignCollisionGroup_Enemy(en, true);

		en = new Enemy(game, 600, 250, 'enemy', null, null, 'kamikaze_turkey');
		this.enemy.add(en);
		en.body.velocity.x = -1;
		this.assignCollisionGroup_Enemy(en, true);

		// Set camera to platformer follow up
		// lerp set for smooth camera movement
		game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, 0.25, 0.25);

		// Fix UI to the camera
		this.ui = barUI();
		this.full_width = this.ui.width;
		this.cropRect = new Phaser.Rectangle(0, 0, player.pooCount/MAXPOO * this.ui.width, this.ui.height);
		this.ui.crop(this.cropRect);

		t_ui = game.add.sprite(game.width - 128, 8, 'toilet');
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
		// UI update
		if (player.pooCount >= 0) {
			this.cropRect.width = player.pooCount/MAXPOO * this.full_width;
			this.ui.updateCrop();
		}
		this.toiletCounter.text = this.toil.total;
		
		//for end of level
		if(player.x +50 > game.world.width && this.toil.total == 0)
			game.state.start('play2');

	},
	movToPl: function(en, platform) {
		game.physics.arcade.moveToObject(en, player);
	},
	assignCollisionGroup_Enemy: function(ene, isTurk) {
		ene.body.setCollisionGroup(this.collideEnemy);
		ene.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		ene.body.createGroupCallback(this.collidePB, function(ene, bull) {
			ene.sprite.kill();
			bull.sprite.kill();
		}, ene);
		if (isTurk){
			ene.body.createGroupCallback(this.collidePlat, function() {this.kill();}, ene);
		 	ene.body.createGroupCallback(this.collidePlayer, function() {this.kill();}, ene);
		}
		else {
			ene.bulletE.forEach(function(bull) {
				bull.body.setCollisionGroup(this.collideEB);
				bull.body.collides([this.collidePlayer, this.collidePlat], function() {bull.kill();}, this);
			}, this);
		}
	},
	render: function() {
		if (devMode){
			game.debug.text('fps: ' + game.time.fps, 32, 86, 'yellow');
			game.debug.text('num of enemy: ' + this.enemy.total, 32, 102, 'yellow');
		}
	}
}