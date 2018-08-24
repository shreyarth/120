// Global var for player prefab
var PIXBIT = 8;

function P2layer(game, key, frame, bulletKey) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	//Phaser.Sprite.call(this, game, 30, 500, key);
	//Phaser.Sprite.call(this, game, 30, 100, key);
	//for level 2 testing
	Phaser.Sprite.call(this, game, 30, 50, key);
	// Animation settings
	this.animations.add('idle', [0,1], 2);
	this.animations.add('jump', [2, 3, 4, 5, 4, 3, 2, 0], 15);
	this.animations.add('off', [6, 1], 1);
	this.animations.add('on', [1, 6], 1);
	this.animations.add('walk', [7, 8, 9, 10, 11, 10, 9, 8], 15);
	// Play animation
	this.animations.play('idle');

	game.physics.p2.enable(this, true);

	this.body.fixedRotation = true;
	move = game.input.keyboard.createCursorKeys();
	this.game.physics.p2.gravity.y = 100;
	this.body.data.gravityScale = 2;
	//this.body.mass = 200;
	this.body.setRectangle(this.width, this.height);
	this.pDown = true;
	this.state = 'idle';
	this.direction = 'right';
	this.isInvincible = false;
	this.friction = true;

	// Character info
	this.pooCount = MAXPOO/2;
	game.timer = game.time.create(true);
	game.timer.loop(4500, function() {
		this.pooCount++;
		this.death();
		this.pooSplat.forEach(function(poot) {
			poot.alpha -= 0.1;
			if (poot.alpha == 0)
				poot.destroy();
		});
	}, this);
	game.timer.start();

	// Bullets
	this.bullets = game.add.group();
	this.bullets.enableBody = true;
	this.bullets.physicsBodyType = Phaser.Physics.P2JS;
	this.bullets.createMultiple(300, bulletKey);
	this.bullets.checkWorldBounds = true;
	this.bullets.outOfBoundsKill = true;

	// Poo splats
	this.pooSplat = game.add.group();
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
P2layer.prototype = Object.create(Phaser.Sprite.prototype);
P2layer.prototype.constructor = P2layer;

// override Phaser.Sprite update
P2layer.prototype.update = function() {
	if(move.left.isDown){
		if (this.pDown) {
			this.animations.play('on');
			this.pDown = false;
			this.animations.currentAnim.onComplete.add(function(){console.log('aye');}, this);
		}
		this.body.velocity.x = -150;
		// Flip sprite
		if (this.direction == 'right')
			this.scale.x = -1;
		this.direction = 'left';
		this.animations.play('walk');
	}
	else if(move.right.isDown){
		if (this.pDown) {
			this.animations.play('on');
			this.pDown = false;
			this.animations.stop(null, true);
		}
		this.body.velocity.x = 150;
		if (this.direction == 'left')
			this.scale.x = 1;
		this.direction = 'right';
		this.animations.play('walk');
	}
	else if(this.friction == true) {
		// Decceleration
		console.log('friction on');
		if (this.body.velocity.x > 0) {
			this.body.velocity.x -= 9;
			if (this.body.velocity.x < 0)
				this.body.velocity.x = 0;
		}
		else if (this.body.velocity.x > 0) {
			this.body.velocity.x += 9;
			if (this.body.velocity.x > 0)
				this.body.velocity.x = 0;
		}
		if (this.body.velocity.x == 0 && this.state != 'jump') {
			this.animations.play('idle');
			this.status = 'idle';
		}
		else
			this.animations.play(this.animations.currentAnim);
	}
	else{
		console.log('friction off');
	}
	if (move.up.justDown)
    {
    	this.body.velocity.y = -600;
		this.jump();
		this.fire(true);
    }
    else{
		this.body.velocity.y += 10;
    	//game.physics.p2.gravity.y = 1000;
    	//this.body.data.gravityScale = 5;
		
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
    	console.log(player.x, player.y);
    }
    // Attack move
	if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		this.fire(false);

}

P2layer.prototype.jump = function() {
	this.animations.play('jump');
	this.state = 'jump';
	if (this.body.velocity.y > 0){
		this.animations.stop(null, true);
	}
}

// isJump: set to true if its not attack
P2layer.prototype.fire = function(isJump) {
	let star = this.bullets.getFirstExists(false);
	if(star){
		game.physics.p2.enable(star);

		if (isJump) {
			// star.body.restitution.y = 0.2;
			star.body.gravity.y = 90;
			star.reset(player.x + 2, player.y + 20);
			star.body.velocity.y = 250;
			star.body.angle = 90;
			console.log("jumping");
			var grunt = game.add.audio('grunt', 0.5);
			grunt.play();
			if(this.pooCount > 8){
				emitter = game.add.emitter(player.x +2, player.y, 5);
				emitter.makeParticles('turd1');
				emitter.start(false, 0,0);
				emitter.setYSpeed(100,400);
			}else{
				emitter = game.add.emitter(player.x +2, player.y, 5);
				emitter.makeParticles('turdB');
				emitter.start(false, 0,0);
				emitter.setYSpeed(100,400);
			}
		}
		else {

			//star.body.bounce.y = 1;
			star.body.gravity.y = 90;
			star.body.collideWorldBounds = false;
			// Need to tweak numbers for starting point for shooting
			if (this.direction == 'right') {
				star.reset(this.x + 10, this.y);
				star.body.velocity.x = 350;
				//recoil to player from shooting
				this.body.velocity.x = -70;
				console.log("shooting right");
				if(this.pooCount > 8){
					emitter = game.add.emitter(this.x + 25, this.y, 5);
					emitter.makeParticles('turd1');
					emitter.start(false, 0,0);
					emitter.setXSpeed(100,400);
					emitter.setYSpeed(100,200);
				}else{
					emitter = game.add.emitter(this.x + 25, this.y, 5);
					emitter.makeParticles('turdB');
					emitter.start(false, 0,0);
					emitter.setXSpeed(100,400);
					emitter.setYSpeed(100,200);
				}
			}
			else {
				star.reset(player.x - 10, player.y);
				star.body.velocity.x = -350;
				//recoil 
				this.body.velocity.x = 70;
				console.log("shooting left");
				if(this.pooCount > 8){
					emitter = game.add.emitter(this.x - 25, this.y, 5);
					emitter.makeParticles('turd1');
					emitter.start(false, 0,0);
					emitter.setXSpeed(-100,-400);
					emitter.setYSpeed(100,200);
				}else{
					emitter = game.add.emitter(this.x - 25, this.y, 5);
					emitter.makeParticles('turdB');
					emitter.start(false, 0,0);
					emitter.setXSpeed(-100,-400);
					emitter.setYSpeed(100,200);
				}
			}
		}
		console.log(this.pooCount);
		this.pooCount--;
		star.body.collideWorldBounds = false;
		var fart = game.add.audio('fart', 0.3);
		if(this.pooCount < MAXPOO && this.pooCount > -1){
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
	else if(this.pooCount > MAXPOO){
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
		deathSprite.fixedToCamera = true;
		deathSprite.cameraOffset.setTo(game.width/2, game.height/2+150);
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

// This is function for poo remainder on the ground
P2layer.prototype.groundSplat = function(x, y) {
	let ps = this.pooSplat.create(this.getPixbit(x, y));
}

P2layer.prototype.getPixbit = function(x, y) {
	let obj = null;

	// create primitive
	let g = game.add.graphics();
	g.beginFill(0x492008);
	g.drawRect(x, y, PIXBIT, PIXBIT);	// Starting point, width, height
	g.endFill();
	// transform primitive into sprite and destroy primitive
	obj = game.add.sprite(x, y, g.generateTexture());
	g.destroy();

	return obj;
}