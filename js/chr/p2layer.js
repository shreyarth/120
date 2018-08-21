function P2layer(game, key, frame, bulletKey) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	Phaser.Sprite.call(this, game, 30, 1100, key);
	// Animation settings
	this.animations.add('jump', [1, 2, 3, 4, 3, 2, 0], 15);

	game.physics.p2.enable(this, true);

	this.body.fixedRotation = true;
	move = game.input.keyboard.createCursorKeys();
	this.scale.x = 0.2;
	this.scale.y = 0.2;
	this.game.physics.p2.gravity.y = 500;
	this.body.setRectangle(this.width, this.height);
	this.direction = 'right';
	this.isInvincible = false;

	// Character info
	this.pooCount = 50;

	// Bullets
	this.bullets = game.add.group();
	//this.bullets.scale.setTo(0.1);
	this.bullets.enableBody = true;
	this.bullets.physicsBodyType = Phaser.Physics.P2JS;
	this.bullets.createMultiple(300, bulletKey);
	this.bullets.checkWorldBounds = true;
	this.bullets.outOfBoundsKill = true;
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
P2layer.prototype = Object.create(Phaser.Sprite.prototype);
P2layer.prototype.constructor = P2layer;

// override Phaser.Sprite update
P2layer.prototype.update = function() {
	if(move.left.isDown){
		this.body.velocity.x = -150;
		this.direction = 'left';
	}
	else if(move.right.isDown){
		this.body.velocity.x = 150;
		this.direction = 'right';
	}
	else {
		// Decceleration
		if (this.body.velocity.x > 0) {
			this.body.velocity.x -= 3;
			if (this.body.velocity.x < 0)
				this.body.velocity.x = 0;
		}
		else if (this.body.velocity.x > 0) {
			this.body.velocity.x += 3;
			if (this.body.velocity.x > 0)
				this.body.velocity.x = 0;
		}
	}
	if (move.up.justDown)
    {
    	this.body.velocity.y = -150;
		this.jump();
		this.fire(true);
    	//this.body.moveUp(5000);
    }
    else{
    	//game.physics.p2.gravity.y = 1000;
    	//this.body.data.gravityScale = 5;
		
    }
    // Attack move
	if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		this.fire(false);

}

P2layer.prototype.jump = function() {
	this.animations.play('jump');
	if (this.body.velocity.y > 0){
			this.animations.stop(null, true);
	}
}

// isJump: set to true if its not attack
P2layer.prototype.fire = function(isJump) {
	let star = this.bullets.getFirstExists(false);
	if(star){
			star.scale.setTo(0.1,0.1);
		game.physics.p2.enable(star);
		if (isJump) {
			// star.body.restitution.y = 0.2;
			star.body.gravity.y = 90;
			star.reset(player.x + 5, player.y + 20);
			star.body.velocity.y = 150;
			star.angle = 90;
			star.scale.x = 0.15;
			// game.camera.shake(0.005, 500);
			console.log("jumping");
		}
		else {

			//star.body.bounce.y = 1;
			star.body.gravity.y = 90;
			star.body.collideWorldBounds = false;
			// Need to tweak numbers for starting point for shooting
			if (this.direction == 'right') {
				star.reset(player.x + 10, player.y - 10);
				star.body.velocity.x = 250;
				//recoil to player from shooting
				this.body.velocity.x = -70;
				console.log("shooting right");
			}
			else {
				star.reset(player.x - 10, player.y - 10);
				star.body.velocity.x = -2500;
				//recoil 
				this.body.velocity.x = 70;
				console.log("shooting left");
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

P2layer.prototype.death = function() {
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

P2layer.prototype.hit = function() {
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

P2layer.prototype.changeState = function(){
	game.state.start('end');
}