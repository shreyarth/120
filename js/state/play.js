var play = function() {
	// Global state variables
	this.bullets, this.enemy;
	this.platform;
}
function death(){
	if(pooCount < 0){
		// deathpoo = game.add.audio('fartdead', 1);
		// deathpoo.play();
		player.kill();
		console.log("death from no poo");
		player.reset(300,300);
		pooCount = 10;
		
	}else
		// deathpoo = game.add.audio('fartdead', 0.6);
		deathpoo.allowMultiple = false;
		deathpoo.play();
		player.kill();
		player.reset(-200,300);
		console.log("death from too much poo");
		// var playText = game.add.text(game.width/2, game.height*.3, 
		// 		'You have just Shat yourself\nPush Enter to respawn', 
		// 		{font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
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
		pooCount = 100;

		// sounds
		deathpoo = game.add.audio('fartdead', 0.6);
		deathpoo.allowMultiple = false;


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
		if(pooCount < 0 || pooCount > 100){
			death();
		}
	},


	fire: function(){
		star = bullets.getFirstExists(false);
		if(star){
			// gravity for poo
			game.physics.enable(this, Phaser.Physics.ARCADE);
			star.body.bounce.y = 1;
			star.body.gravity.y = 90;
			star.body.collideWorldBounds = false;
			star.reset(player.x + 10, player.y - 10);
			star.body.velocity.x = 250;

			// poo decrement
			pooCount --;
			shootpoo = game.add.audio('fart', 0.5);
			shootpoo.play();

			// checking pooCount
			console.log(pooCount);
			
		}
	},


	resetstar: function(star){
		star.kill();
	}
	// Char control is implemented in player.js
}