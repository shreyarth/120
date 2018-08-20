var play = function() {
	// Global state variables
	this.bullets, this.enemy;
	this.platform; this.en3;
	this.obstacle;
	this.heller = null;
	this.ui;
}

play.prototype = {
	preload: function() {
		
	},
	create: function() {
		// Asset implementaion
		game.world.setBounds( 0, 0, 5000, 1200);
		console.log("play state to check implementation");
		game.physics.startSystem(Phaser.Physics.P2JS);
		
		var background = game.add.sprite(0, 0, 'porter');
		//background.scale.setTo(5,2);
		background.width = game.world.width;
		background.height = game.world.height -32;
		// this.heller = this.add.tileSprite(0, game.world.height - 500, game.world.width, 1000, 'heller');
		// this.heller.height = 800;

		//ground
		this.platform = game.add.group();
		this.platform.physicsBodyType = Phaser.Physics.P2JS;
		this.platform.enableBody = true;
		this.platform.debug = true;
		let ground = this.platform.create(0, game.world.height -32, 'platform');
		ground.scale.setTo(game.world.width, 1 );
		ground.body.kinematic = true;
		
		//platforms in order, left to right
		
		let platforms = this.platform.create(400, 890, 'bus');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.scale.setTo(1,1);
		// platforms.body.setRectangle(this.width, this.height);

		platforms = this.platform.create(1000, 1040, 'rcar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		// platforms.scale.setTo(0.5,0.5); 
		// platforms.body.setRectangle(this.width + 64, this.height + 32);
		platforms.body.clearShapes();
		platforms.body.loadPolygon('yellocar', 'yellowCar');

		platforms = this.platform.create(2900, 700, 'bus');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.anchor.setTo(0.5, 0.5);
		platforms.angle = 180;
		platforms.scale.setTo(1,1);
		platforms.body.setRectangle(this.width, this.height);

		platforms = this.platform.create(2400, 1040, 'ycar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		// platforms.scale.setTo(0.5,0.5);
		platforms.body.clearShapes();
		platforms.body.loadPolygon('yellocar', 'yellowCar');

		platforms = this.platform.create(2960, 1040, 'rcar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		// platforms.scale.setTo(0.5,0.5);
		platforms.body.clearShapes();
		// platforms.body.setRectangle(this.width, this.height);
		platforms.body.loadPolygon('yellocar', 'yellowCar');

		platforms = this.platform.create(1600, 1040, 'ycar');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		// platforms.scale.setTo(0.5,0.5);
		platforms.body.clearShapes();
		// platforms.body.setRectangle(this.width, this.height);
		platforms.body.loadPolygon('yellocar', 'yellowCar');

		//double verticle bus
		platforms = this.platform.create(1850, 630, 'busObs');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.scale.setTo(0.35,0.35);
		platforms.body.setRectangle(this.width, this.height);


		//stack of car and bus
		platforms = this.platform.create(3300, 670, 'carObs');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.scale.setTo(0.4,0.4);
		platforms.body.setRectangle(this.width, this.height);

		//crashed cars and bus in buildings
		platforms = this.platform.create(1680, 420, 'wreckC');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.scale.setTo(0.6,0.6); 
		platforms.body.setRectangle(this.width, this.height);

		platforms = this.platform.create(2530, 300, 'wreckB');
		platforms.body.kinematic = true;
		platforms.body.debug = true;
		platforms.scale.setTo(1,1);
		platforms.body.setRectangle(this.width, this.height);

		// the background wrap
		// var wrapGround = game.add.sprite(0, game.world.height - 300, 'heller');
		// wrapGround.scale.setTo(2,0.8);
		// wrapGround.width = game.width;
		// this.heller = this.add.tileSprite(0, game.world.height - 500, game.world.width, game.height/2, 'heller');

		game.physics.startSystem(Phaser.Physics.P2JS);

		// player
		player = new P2layer(game, 'player', null, 'poo');
		game.add.existing(player);

		// enemy
		this.enemy = game.add.group();
		this.enemy.enableBody = true;
		this.enemy.physicsBodyType = Phaser.Physics.P2JS;
		
		for(var i = 0; i < 10; ++i){
			let en = new Enemy(game, game.rnd.integerInRange(600,4900),
				game.rnd.integerInRange(200,1000), 'enemy');
			game.add.existing(en);
			this.enemy.add(en);
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
		// player and enemies collision with platforms
		// game.physics.arcade.collide(player, this.platform);
		// game.physics.arcade.collide(this.enemy, this.platform, this.movToPl, null, this);
		// player.body.collides(player, this.platform);

		// if(player.body.velocity.x == 0){
		// 	this.heller.tilePosition.x = this.heller.tilePosition.x;
		// }else if(player.body.velocity.x > 0){
		// 	this.heller.tilePosition.x -= 4;
		// }else{
		// 	this.heller.tilePosition.x += 4;
		// }
		
		// enemy movement towards player
		// if(game.physics.arcade.collide(enemy, platform)){
		// 	game.physics.arcade.moveToObject(enemy, player);
		// }
		//game.physics.arcade.moveToObject(this.en3, player);

		// UI update
		this.ui.destroy();
		this.ui = this.pooMeter(player.pooCount);

		//shooting
		/*
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			player.fire();
		}*/
		//for end of level
		if(player.x +30 > game.world.width){
			game.state.start('end');
		}
	},
	movToPl: function(en, platform) {
		game.physics.arcade.moveToObject(en, player);
	},

	// render : function() {
	// 	// game.debug.physicsGroup(this.platform);
	// 	this.platform.forEachAlive(this.renderGroup, this);
	// },
	// renderGroup: function() {    game.debug.body(this.platforms);}
	
	// Char control is implemented in player.js
}