// Constructor
function Player(game, key, frame, bulletKey) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	Phaser.Sprite.call(this, game, 300, 480, key);

	this.scale.x = 0.2;
	this.scale.y = 0.2;
	
	// physics crap
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 300;
	this.body.collideWorldBounds = true;


	
	// anchor: Origin of the texture
	// 0.5 = center
	this.anchor.set(0.5);
	this.body.drag.set(100);
	this.direction = 'right';
	// Timer obj for invincible time or any other stuffs.. in cases for need of timer...
	this.timer = game.time.create(game, false);
	this.timer.start();
	this.isInvincible = false;

	// Character info
	// this.health = 100;	// pooCount = health. left the line in case we need it later for some reason
	this.pooCount = 50;

	// Bullets
	this.bullets = game.add.group();
	//this.bullets.scale.setTo(0.1);
	this.bullets.enableBody = true;
	this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
	this.bullets.createMultiple(200, bulletKey);
	this.bullets.checkWorldBounds = true;
	this.bullets.outOfBoundsKill = true;
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// override Phaser.Sprite update
Player.prototype.update = function() {
	// Controls
	if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		this.body.acceleration.x -= 3;
		
		if(this.body.acceleration.x < -150 || this.body.velocity.x < -150)
			this.body.velocity.x = -150;

		this.direction = 'left';
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		this.body.acceleration.x += 3;

		if(this.body.acceleration.x > 150 || this.body.velocity.x > 150)
			this.body.velocity.x = 150;

		this.direction = 'right';
	}
	else{
		this.body.acceleration.x = 0;
		if (this.body.velocity.x < 0) {
			if (this.body.velocity.x > 0)
				this.body.velocity.x = 0;
			else
				this.body.velocity.x += 3;
		}
		if (this.body.velocity.x > 0)
			if (this.body.velocity.x < 0)
				this.body.velocity.x = 0;
			else
				this.body.velocity.x -= 3;
	}

	// poopack for jumping
	if(game.input.keyboard.justPressed(Phaser.Keyboard.UP)){
		this.body.velocity.y = -175;
		this.fire(true);
		console.log("jump");
	}

	// Attack move
	if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		this.fire(false);
}

// isJump: set to true if its not attack
Player.prototype.fire = function(isJump) {
	let star = this.bullets.getFirstExists(false);
	if(star){
			star.scale.setTo(0.1,0.1);
		game.physics.enable(this, Phaser.Physics.ARCADE);
		if (isJump) {
			star.body.bounce.y = 0.2;
			star.body.gravity.y = 90;
			star.reset(player.x + 27, player.y + 20);
			star.body.velocity.y = 150;
			star.angle = 90;
			// game.camera.shake(0.005, 500);
		}
		else {

			star.body.bounce.y = 1;
			star.body.gravity.y = 90;
			star.body.collideWorldBounds = false;
			// Need to tweak numbers for starting point for shooting
			if (this.direction == 'right') {
				star.reset(player.x + 10, player.y - 10);
				star.body.velocity.x = 250;
				//recoil to player from shooting
				this.body.velocity.x = -70;
			}
			else {
				star.reset(player.x - 10, player.y - 10);
				star.body.velocity.x = -250;
				//recoil 
				this.body.velocity.x = 70;
			}
		}
		console.log(this.pooCount);
		this.pooCount--;
		star.body.collideWorldBounds = false;
		var fart = game.add.audio('fart', 0.5);
		if(this.pooCount < 100 && this.pooCount > -1){
			fart.play();
		}

		// Check pooCount after action
		this.death();
	}
}

Player.prototype.death = function() {
	var rasp = game.add.audio('rasp', 0.5);
	if(this.pooCount < 0){
		this.kill();
		//var rasp = game.add.audio('rasp', 0.5);
		rasp.play();
		this.reset(300,300);
		console.log("death from no poo");
		this.pooCount = 10;
		game.camera.shake(0.005, 400);
	}
	if(this.pooCount > 100){
		this.kill();
		rasp.play();
		this.reset(300,300);
		console.log("death from too much poo");
		this.pooCount = 90;
		game.camera.shake(0.005, 400);
	}
}