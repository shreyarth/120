// Constructor
function Player(game, key, frame, bulletKey) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	Phaser.Sprite.call(this, game, 30, 1100, key);
	
	// Need to rescale the sprite img file
	this.scale.x = 0.2;
	this.scale.y = 0.2;
	
	// physics crap
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 300;
	this.body.drag.set(50);
	this.body.collideWorldBounds = true;
	
	// anchor: Origin of the texture
	// 0.5 = center
	this.anchor.set(0.5);
	this.direction = 'right';
	this.isInvincible = false;

	// Character info
	this.pooCount = 50;

	// Bullets
	this.bullets = game.add.group();
	//this.bullets.scale.setTo(0.1);
	this.bullets.enableBody = true;
	this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
	this.bullets.createMultiple(100, bulletKey);
	this.bullets.checkWorldBounds = true;
	this.bullets.outOfBoundsKill = true;
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// override Phaser.Sprite update
Player.prototype.update = function() {
	if (this.alive) {
		// Controls
		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.body.velocity.x -= 3;
			// changing values for test, uncomment out commented code for normal value
			this.body.velocity.x -= 10;
			
			// if(this.body.acceleration.x < -150 || this.body.velocity.x < -150)
			// 	this.body.velocity.x = -150;

			this.direction = 'left';
			this.scale.x = -0.2;
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			//this.body.velocity.x += 3;
			this.body.velocity.x += 10;
			// if(this.body.acceleration.x > 150 || this.body.velocity.x > 150)
			// 	this.body.velocity.x = 150;

			this.direction = 'right';
			this.scale.x = 0.2;
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
		}

		// Attack move
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
			this.fire(false);

		// Bullet rotation
		this.bullets.forEachAlive(function(bullet){bullet.rotation += Phaser.Math.degToRad(2); }, this);
	}
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
			star.scale.x = 0.15;
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
	let deathSprite, overflow;

	if(this.pooCount < 0){
		console.log("death from no poo");
		deathSprite = game.add.sprite(this.x, this.y, 'bloodsplat');
		overflow = false;
	}
	else if(this.pooCount > 100){
		console.log("death from too much poo");
		deathSprite = game.add.sprite(this.x, this.y, 'poosplat');
		overflow = true;
	}
	if (deathSprite){
		var rasp = game.add.audio('rasp', 0.5);
		this.kill();
		rasp.play();
		game.camera.shake(0.005, 400);
		deathSprite.anchor.set(0.5);
		deathSprite.scale.x = 2;
		deathSprite.scale.y = 5;
		game.time.events.add(Phaser.Timer.SECOND * 2, this.changeState, this);
	}
}

Player.prototype.hit = function() {
	// Check if the player is already invincible
	// If it is, return nada
	if (this.isInvincible) return;
	// Else, run this code
	this.isInvincible = true;
	var inviTime = game.time.create(true);
	// Blinking sprite while invincible
	// timer.repeat(delay time, num repeat, function(pls don't touch this), ref(also, don't touch this))
	inviTime.repeat(50, 10, function() {if (this.alpha == 1) this.alpha = 0; else this.alpha = 1;}, this);
	// After super invincibility time, go back to normal state
	inviTime.onComplete.add(function(){this.isInvincible = false; this.alpha = 1;}, this);

	inviTime.start();
}

Player.prototype.changeState = function(){
	game.state.start('end');
}