// Global var for player prefab
var PIXBIT = 8;

function P2layer(game, x, y, key, frame, bulletKey) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	Phaser.Sprite.call(this, game, 100, 100, key);
	//Phaser.Sprite.call(this, game, 9000, 4500, key);
	//for level 2 testing
	//Phaser.Sprite.call(this, game, 5940, 3610, key);
	// Animation settings
	this.animations.add('idle', [7], 2);
	this.animations.add('jump', [2, 3, 4, 5, 4, 3, 2], 15);
	this.animations.add('off', [6, 1], 1);
	this.animations.add('on', [1, 6], 1);
	this.animations.add('walk', [7, 8, 9, 10, 11, 10, 9, 8], 15);
	this.animations.add('shoot', [6, 1, 1, 6], 15);
	// Play animation
	this.animations.play('idle');

	// Player SFX
	this.sfx = [];
	this.sfx[0] = game.add.audio('fart');
	this.sfx[0].allowMultiple = true;
	this.sfx[1] = game.add.audio('rasp');
	this.sfx[2] = game.add.audio('grunt');
	this.sfx[2].allowMultiple = true;
	this.sfx[3] = game.add.audio('splat');
	this.sfx[3].allowMultiple = true;
	this.sfx[4] = game.add.audio('bgrunt');
	this.sfx[4].allowMultiple = true;
	this.sfx[5] = game.add.audio('bDeath');

	game.physics.p2.enable(this, true);

	this.body.fixedRotation = true;
	move = game.input.keyboard.createCursorKeys();
	this.game.physics.p2.gravity.y = 100;
	this.body.data.gravityScale = 2;
	//this.body.mass = 200;
	this.body.setRectangle(30, 70);
	this.pDown = true;
	this.state = 'idle';
	this.direction = 'right';
	this.isInvincible = false;
	this.friction = true;

	// Character info
	this.pooCount = MAXPOO/2;
	game.timer = game.time.create(true);
	game.timer.loop(600, function() {
		if (this.alive) {
		this.pooCount++;
		this.death();
		}}, this);

	// Bullets
	this.bullets = game.add.group();
	this.bullets.enableBody = true;
	this.bullets.physicsBodyType = Phaser.Physics.P2JS;
	this.bullets.createMultiple(50, bulletKey);
	this.bullets.outOfBoundsKill = true;

	// Poo splats
	this.pooSplat = game.add.group();
	
	// Timer events for groups
	game.timer.loop(500, function() {
		// console.log(this.bullets);
		if (this.alive) {
			this.pooSplat.forEach(function(splat) {
				splat.alpha -= 0.1;
				if (splat.alpha <= 0)
					splat.destroy();
			}, this.pooSplat);
		}
		this.bullets.forEachAlive(function(bull) {
			bull.alpha -= 0.05;
			if (bull.alpha <= 0)
				bull.alive = false;
		}, this.bullets);
	}, this);
	game.timer.start();

	// Devmode settings
	this.body.debug = devMode;
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
P2layer.prototype = Object.create(Phaser.Sprite.prototype);
P2layer.prototype.constructor = P2layer;

// override Phaser.Sprite update
P2layer.prototype.update = function() {
	if (this.alive) {
		if(move.left.isDown){
			this.body.velocity.x = -200;
			// Flip sprite
			if (this.direction == 'right')
				this.scale.x = -1;
			
			this.direction = 'left';
			if(this.state == 'jump')
				this.animations.play('jump');
			else if(this.state == 'shoot'){
				this.animations.play('shoot');
				this.animations.currentAnim.onComplete.add(function(){this.animations.play('walk');}, this);
			}else
				this.animations.play('walk');

			this.animations.currentAnim.onComplete.add(function(){this.animations.play('idle');}, this);
		}
		else if(move.right.isDown){
			this.state == 'walk';
			this.body.velocity.x = 200;
			if (this.direction == 'left')
					this.scale.x = 1;
			
			this.direction = 'right';
			if(this.state == 'jump')
				this.animations.play('jump');
			else if(this.state == 'shoot'){
				this.animations.play('shoot');
				this.animations.currentAnim.onComplete.add(function(){this.animations.play('walk');}, this);
			}else
				this.animations.play('walk');
			
			this.animations.currentAnim.onComplete.add(function(){this.animations.play('idle');}, this);
		}
		else if(this.friction) {
			// Decceleration
			// Non stage 2
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
			// For stage 2
			this.angle = 30;
			this.body.angle = 30;
		}
		if (move.up.justDown)
		{
			if(this.pooCount > MAXPOO * 0.65){
				this.body.velocity.y = game.rnd.integerInRange(-700,-550);
				this.fire(true);
				this.animations.play('jump');
				this.state = 'jump';
				this.animations.currentAnim.onComplete.add(function(){this.animations.play('idle'), this.state = 'idle';}, this);
			}else if(this.pooCount < MAXPOO * 0.41){
				this.body.velocity.y = game.rnd.integerInRange(-600,-470);
				this.fire(true);
				this.animations.play('jump');
				this.state = 'jump';
				this.animations.currentAnim.onComplete.add(function(){this.animations.play('idle'), this.state = 'idle';}, this);
			}
			else
				this.body.velocity.y = game.rnd.integerInRange(-650,-580);;
				this.fire(true);
				this.animations.play('jump');
				this.state = 'jump';
				this.animations.currentAnim.onComplete.add(function(){this.animations.play('idle'), this.state = 'idle';}, this);
		}
		else{
			this.body.velocity.y += 10;			
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && devMode){
			console.log(player.x, player.y);
		}
		//cheatmode
		if(game.input.keyboard.justPressed(Phaser.Keyboard.P)){
			this.pooCount = 5;
		}
		// Attack move
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
			this.fire(false);
	}

	// If player poo meter is too high, tirgger jittering behavior
	if (this.pooCount > MAXPOO * .8) {
		this.body.x += game.rnd.integerInRange(-5, 5);
		this.body.y += game.rnd.integerInRange(-5, 5);
	}
}


// isJump: set to true if its not attack
P2layer.prototype.fire = function(isJump) {
	let star = this.bullets.getFirstDead(false);
	star.alpha = 1;
	if(star){
		game.physics.p2.enable(star);
		let emitter;
		if (isJump) {	// Jump fire
			star.reset(player.x + 2, player.y + 20);
			star.body.collideWorldBounds = false;
			star.outOfBoundsKill = true;
			star.body.gravity.y = 90;
			star.scale.setTo(game.rnd.integerInRange(7,14)/10,
				game.rnd.integerInRange(7,14)/10);
			star.body.velocity.y = 250;
			star.body.angle = 90;
			emitter = game.add.emitter(player.x +2, player.y, 5);
			if(this.pooCount < MAXPOO * 0.41){	// When pooCount low, spray diff particle
				this.sfx[4].play();
				emitter.makeParticles('turdB');
			}
			else{
				this.sfx[2].play();
				emitter.makeParticles('turd1');
			}
			emitter.start(false, 1000, 0, 5);
			emitter.setYSpeed(100,400);
		}
		else {	// Actual shooting
			star.body.gravity.y = 90;
			star.body.collideWorldBounds = false;
			if (this.direction == 'right') {
				this.state = 'shoot';
				this.animations.play('shoot');
				star.reset(this.x + 10, this.y);
				star.scale.setTo(game.rnd.integerInRange(7,14)/10,
				game.rnd.integerInRange(7,14)/10);
				star.body.velocity.x = game.rnd.integerInRange(250,400);
				star.body.velocity.y = game.rnd.integerInRange(-60,0);
				//recoil to player from shooting
				this.body.velocity.x = -100;
				emitter = game.add.emitter(this.x + 25, this.y, 5);
				if(this.pooCount > MAXPOO * 0.41)
					emitter.makeParticles('turd1');
				else
					emitter.makeParticles('turdB');	// When pooCount low, spray diff particle
				emitter.setXSpeed(100,400);
			}
			else {
				this.scale.x = -1;
				this.state = 'shoot';
				this.animations.play('shoot');
				star.reset(player.x - 10, player.y);
				star.scale.setTo(game.rnd.integerInRange(7,14)/10,
				game.rnd.integerInRange(7,14)/10);
				star.body.velocity.x = game.rnd.integerInRange(-400, -200);
				star.body.velocity.y = game.rnd.integerInRange(-150, 30);
				//recoil 
				this.body.velocity.x = 100;
				emitter = game.add.emitter(this.x - 25, this.y, 5);
				if(this.pooCount > MAXPOO * 0.41)
					emitter.makeParticles('turd1');
				else
					emitter.makeParticles('turdB');	// When pooCount low, spray diff particle
				emitter.setXSpeed(-100,-400);
			}
			emitter.start(false, 1000, 0, 5);
			emitter.setYSpeed(100,200);
		}
		// Kill ye emitter
		game.time.events.add(1100, function() {this.destroy();}, emitter);
		if (devMode) console.log(this.pooCount);

		this.pooCount--;
		star.body.collideWorldBounds = false;
		if(this.pooCount < MAXPOO && this.pooCount > -1)
			this.sfx[0].play();

		// Check pooCount after action
		this.death();
	}
}

P2layer.prototype.death = function() {
	// Apply diff sprite for death cases
	let deathSprite;
	if(this.pooCount < 0)
		deathSprite = game.add.sprite(this.x, this.y, 'bloodsplat');

	else if(this.pooCount > MAXPOO)
		deathSprite = game.add.sprite(this.x, this.y, 'poosplat');

	if (deathSprite){
		if(this.pooCount < 0)
			this.sfx[5].play();
		else
			this.sfx[1].play();

		this.kill();
			
		game.camera.shake(0.005, 400);
		deathSprite.anchor.set(0.5);
		deathSprite.scale.x = 2;
		deathSprite.scale.y = 5;
		deathSprite.fixedToCamera = true;
		deathSprite.cameraOffset.setTo(game.width/2, game.height/2+150);
		game.time.events.add(Phaser.Timer.SECOND * 2, this.changeState, this);	// Display death animation(?) and move on
	}
}

P2layer.prototype.hit = function() {
	// Check if the player is already invincible
	// If it is, return nada
	if (this.isInvincible) return;
	// Else, run this code
	this.isInvincible = true;
	game.camera.shake(0.003, 100);
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
	let ps = this.pooSplat.add(this.getPixbit(x, y));
	this.sfx[3].play();
}

P2layer.prototype.getPixbit = function(x, y) {
	let obj = null;

	// create primitive
	let g = game.add.graphics();
	g.beginFill(0x492008);
	g.drawRect(x, y, PIXBIT * 2, PIXBIT);	// Starting point, width, height
	g.endFill();
	// transform primitive into sprite and destroy primitive
	obj = game.add.sprite(x, y, g.generateTexture());
	g.destroy();

	return obj;
}