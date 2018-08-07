var play = function() {
	// Global state variables
	this.bullets, this.enemy;
	this.platform;
}

play.prototype = {
	preload: function() {
		// game.load.path = 'assets/';
		// game.load.image('player', 'img/player.png');
		// game.load.image('poo', 'img/poo.png');
		// game.load.image('platform', 'img/platform.png');
		// game.load.image('star', 'img/star.png');
		// game.load.image('enemy', 'img/enemy.png');
		// game.load.image('turd', 'img/turd.png');
		// game.load.image('porter', 'img/porter.png');

		// //sounds
		// game.load.audio('fart', 'audio/fart.mp3');
		// game.load.audio('rasp', 'audio/Rasp.mp3');
		// game.load.audio('turkey', 'audio/turkey.mp3');
	},
	create: function() {
		// Asset implementaion
		console.log("play state to check implementation");
		//game.stage.backgroundColor = "#facade";
		
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

		// //ground
		// this.platform = game.add.group();
		// this.platform.enableBody = true;
		// let ground = this.platform.create(0, game.world.height -64, 'platform');
		// ground.scale.setTo(2,2);
		// ground.body.immovable = true;

		// player
		player = new Player(game, 'player', null, 'poo');
		game.add.existing(player);

		// enemy
		this.enemy = game.add.group();
		this.enemy.enableBody = true;
		let en = new Enemy(game, 'enemy', null, this.platform);
		game.add.existing(en);
		this.enemy.add(en);

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