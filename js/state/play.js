var play = function() {
	// Global state variables
	this.bullets, this.enemy;
	this.platform;
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
		game.load.path = 'assets/';
		game.load.image('player', 'img/player.png');
		game.load.image('poo', 'img/star.png');
		game.load.image('platform', 'img/platform.png');
		game.load.image('star', 'img/star.png');
		game.load.image('enemy', 'img/enemy.png');
	},
	create: function() {
		// Asset implementaion
		console.log("play state to check implementation");
		game.stage.backgroundColor = "#facade";

		game.physics.startSystem(Phaser.Physics.ARCADE);

		//ground
		this.platform = game.add.group();
		this.platform.enableBody = true;
		let ground = this.platform.create(0, game.world.height -64, 'platform');
		ground.scale.setTo(2,2);
		ground.body.immovable = true;

		// player
		player = new Player(game, 'player', null, 'star');
		game.add.existing(player);

		// enemy
		this.enemy = new Enemy(game, 'enemy', 3, 3);
		game.add.existing(this.enemy);


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
		game.physics.arcade.collide(this.enemy, this.platform);

		// enemy movement towards player
		// if(game.physics.arcade.collide(enemy, platform)){
		// 	game.physics.arcade.moveToObject(enemy, player);
		// }

		//shooting
		/*
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			player.fire();
		}*/
		if(game.physics.arcade.collide(star, this.platform)){
			star.kill();
		}
	},
	render: function() {
		game.debug.text('Events: ' + player.timer.events, 32, 32, '#ffff00');
	}
	// Char control is implemented in player.js
}