<<<<<<< HEAD
var play = function() {
	// Global state variables
	var platform;
}
function death(){
	if(pooCount < 0){
		player.kill();
		console.log("death from no poo");
		player.reset(300,300);
		pooCount = 10;
	}
	if(pooCount > 100){
		player.kill();
		console.log("death from too much poo");
		player.reset(300,300);
		pooCount = 90;
	}
};

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

		pooCount = 100;



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
			star.reset(player.x + 10, player.y - 10);
			star.body.velocity.x = 80;
			pooCount --;

			console.log(pooCount);
			if(pooCount < 0 || pooCount > 100){
				death();
			}
		}
	},

	resetstar: function(star){
		star.kill();
	}
	// Char control is implemented in player.js
}
=======
var play = function() {
	// Global state variables
	var platform;
}
function death(){
	if(pooCount < 0){
		player.kill();
		console.log("death from no poo");
		player.reset(300,300);
		pooCount = 10;
	}
	if(pooCount > 100){
		player.kill();
		console.log("death from too much poo");
		player.reset(300,300);
		pooCount = 90;
	}
};

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
		//bullets.gravity = 300;

		pooCount = 100;



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
		if(game.physics.arcade.collide(star, platform)){
			star.kill();
		}
	},

	fire: function(){
		star = bullets.getFirstExists(false);
		if(star){
			game.physics.enable(this, Phaser.Physics.ARCADE);
			star.body.bounce.y = 0.2;
			star.body.gravity.y = 10;
			star.body.collideWorldBounds = false;
			star.reset(player.x + 10, player.y - 10);
			star.body.velocity.x = 200;
			//star.gravity = 100;
			pooCount --;

			console.log(pooCount);
			if(pooCount < 0 || pooCount > 100){
				death();
			}
		}
	},

	resetstar: function(star){
		star.kill();
	}
	// Char control is implemented in player.js
}
>>>>>>> d0b4420bad1ad227d451e226dda7b9ce70b5a2ba
