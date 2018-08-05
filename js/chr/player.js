// Constructor
function Player(game, key, frame, bulletKey) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	Phaser.Sprite.call(this, game, 300, 300, key);
	this.scale.x = 0.1;
	this.scale.y = 0.1;
	
	// physics crap
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 300;
	this.body.collideWorldBounds = true;
	
	// anchor: Origin of the texture
	// 0.5 = center
	this.anchor.set(0.5);
	this.body.drag.set(100);
	this.body.maxVelocity.x = 200;

	// Character info
	// this.health = 100;	// pooCount = health. left the line in case we need it later for some reason
	this.pooCount = 100;

	// Bullets
	this.bullets = game.add.group();
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
		console.log("left");
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		this.body.acceleration.x += 3;

		if(this.body.acceleration.x > 150 || this.body.velocity.x > 150)
			this.body.velocity.x = 150;
		console.log("right");
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
		this.fire();
		console.log("jump");
		// death if poo count is too high or low
		if(this.pooCount < 0 || this.pooCount > 100){
			this.death();
		}
	}
	// Attack move
}

// Might have to move certain portion to bullet prefab
Player.prototype.fire = function() {
	// Where the hell the bullets came from?
	let star = this.bullets.getFirstExists(false);
	if(star){
		game.physics.enable(this, Phaser.Physics.ARCADE);
		star.body.bounce.y = 0.2;
		star.body.gravity.y = 50;
		star.body.collideWorldBounds = false;	
		star.reset(player.x - 10, player.y + 17);
		star.body.velocity.y = 30;
		this.pooCount --;
		console.log(this.pooCount);
	}
}

Player.prototype.death = function() {
	if(this.pooCount <= 0){
		this.kill();
		this.reset(300,300);
		console.log("death from no poo");
		this.pooCount = 10;
	}
	if(this.pooCount >= 100){
		this.kill();
		this.reset(300,300);
		console.log("death from too much poo");
		this.pooCount = 90;
	}
}