var play = function() {
	// Global state variables
	var platform;
}

play.prototype = {
	preload: function() {
		// Call menu assets
	},
	create: function() {
		// Asset implementaion
		console.log("play state to check implementation");
		game.stage.backgroundColor = "#facade";

		game.physics.startSystem(Phaser.Physics.ARCADE);

		//ground
		platform = game.add.group();
		platform.enableBody = true;
		var ground = platform.create(0, game.world.height -64, 'platform');
		ground.scale.setTo(2,2);
		ground.body.immovable = true;

		// player
		player = new Player(game, 'player', 3,3);
		game.add.existing(player);


		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(200, 'star');
		//bullets.setAll('checkWorldBounds', true);
		//bullets.callAll('events.onOutOfBounds.add', 'events.outOfBounds', resetstar);
		bullets.checkWorldBounds = true;
		bullets.outOfBoundsKill = true;



		// Set camera to platformer follow up
		// lerp set for smooth camera movement
		// game.camera.follow('player', FOLLOW_PLATFORMER, 0.25, 0.25);

		// Fix UI to the camera
		// var ui = something;
		// ui.fixedToCamera = true;
	},
	update: function() {
		// Update function
		game.physics.arcade.collide(player, platform);
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			this.fire();
		}
	},

	fire: function(){
		var star = bullets.getFirstExists(false);
		if(star){
			star.reset(player.x, player.y - 20);
			star.body.velocity.x = 30;
		}
	},

	resetstar: function(star){
		star.kill();
	}
	// Char control is implemented in player.js
}
