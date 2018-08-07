var play = function() {
	// Global state variables
	this.bullets, this.enemy;
	this.platform; var en3;
}

play.prototype = {
	preload: function() {
		
	},
	create: function() {
		// Asset implementaion
		console.log("play state to check implementation");
		
		var background = game.add.sprite(0, 0, 'porter');
		background.scale.setTo(2,1);
		background.width = game.width;
		//background.height = game.height;

		//ground
		this.platform = game.add.group();
		this.platform.enableBody = true;
		let ground = this.platform.create(0, game.world.height -32, 'platform');
		ground.scale.setTo(2,1);
		ground.body.immovable = true;

		// the background wrap
		var wrapGround = game.add.sprite(0, game.world.height - 300, 'heller');
		wrapGround.scale.setTo(2,0.8);
		wrapGround.width = game.width;

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// player
		player = new Player(game, 'player', null, 'poo');
		game.add.existing(player);

		// enemy
		this.enemy = game.add.group();
		this.enemy.enableBody = true;
		let en = new Enemy(game, 'enemy', null, this.platform);
		game.add.existing(en);
		this.enemy.add(en);

		//test for 2nd enemy on screen
		let en2 = new Enemy(game, 'enemy', null);
		game.add.existing(en2);
		this.enemy.add(en2);

		//test for flying enemy
		en3 = new Enemy(game, 'enemy');
		game.add.existing(en3);
		en3.body.reset(30,400);

		this.bullets = game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.createMultiple(200, 'star');
		//bullets.setAll('checkWorldBounds', true);
		//bullets.callAll('events.onOutOfBounds.add', 'events.outOfBounds', resetstar);
		this.bullets.checkWorldBounds = true;
		this.bullets.outOfBoundsKill = true;
		//bullets.gravity = 300;

		//pooCount = 100;

		// Set camera to platformer follow up
		// lerp set for smooth camera movement
		// game.camera.follow('player', FOLLOW_PLATFORMER, 0.25, 0.25);

		// Fix UI to the camera
		// var ui = something;
		// ui.fixedToCamera = true;
	},
	update: function() {
		// Update function
		// player and enemies collision with platforms
		game.physics.arcade.collide(player, this.platform);
		game.physics.arcade.collide(this.enemy, this.platform, this.movToPl, null, this);

		// enemy movement towards player
		// if(game.physics.arcade.collide(enemy, platform)){
		// 	game.physics.arcade.moveToObject(enemy, player);
		// }
		game.physics.arcade.moveToObject(en3, player);

		//shooting
		/*
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			player.fire();
		}*/
	},
	movToPl: function(en, platform) {
		game.physics.arcade.moveToObject(en, player);
	},
	render: function() {
		game.debug.text('Events: ' + player.timer.events, 32, 32, '#ffff00');
		game.debug.text('Enemy: ' + this.enemy, 32, 64, '#ffff00');
	}
	// Char control is implemented in player.js
}