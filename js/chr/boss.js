//Prefab for boss
function Boss(game, x, y, key, type, bFrame){
	Phaser.Sprite.call(this, game, x, y, key);
	game.physics.p2.enable(this, false);
	this.body.fixedRotation = true;
	this.body.velocity.x = 150;
	this.game.physics.p2.gravity.y = 100;
	this.body.data.gravityScale = 2;
	this.type = type;
	this.key = key;
	this.anchor.setTo(0.5, 0.5);
	this.health = 20;
	this.isInvincible = false;
	this.body.kinematic = true;
	this.animations.add('half', [0,1], 2);
	this.animations.add('ded', [0,1], 2);
	
	// sound effects for boss
	this.sfx = [];
	this.sfx[7] = game.add.audio('bossdeath');
	this.sfx[8] = game.add.audio('bossyell');
	this.sfx[8].allowMultiple = true;

	// Typecheck
	if(this.type == 'eyes') {
		this.body.setRectangle(72, 36, -29, -100);
		this.body.addRectangle(190, 90 , -20, 90);
	}
	if(this.type == 'mouth') {
		this.body.setRectangle(72, 75, -20, 0);
		this.body.addRectangle(190, 90 , -20, 90);	
	}
	
	this.body.collideWorldBounds = true;

	this.bulletB = game.add.group();
	this.bulletB.enableBody = true;
	this.bulletB.physicsBodyType = Phaser.Physics.P2JS;
	this.bulletB.createMultiple(50, bFrame);
	this.bulletB.forEach(function(bull) {bull.body.clearShapes(), bull.body.addCircle(35);});
	this.bulletB.forEach(function(bull) {bull.body.createBodyCallback(player, function(){if(!player.isInvincible) this.pooModifier();}, this);}, this);

	// Timer events for groups
	this.timer = game.time.create();
	this.timer.loop(game.rnd.integerInRange(700,1300), this.fire, this);
	this.timer.loop(500, function() {
		this.bulletB.forEachAlive(function(bull) {
			bull.alpha -= 0.05;
			if (bull.alpha <= 0)
				bull.alive = false;
		}, this.bullets);
	}, this);
	this.timer.loop(Phaser.Timer.SECOND * 3, this.charge, this);
	this.timer.start();

	// Devmode
	this.body.debug = devMode;
}

Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.update = function() {
	if(player.body.x > this.body.x){
		this.scale.x = -1;
	}
	else{
		this.scale.x = 1;
	}
}

Boss.prototype.charge = function() {
	if (this.body){
		if(this.body.x < player.body.x){
			this.scale.x = -1;
			this.body.velocity.x = 600;
		}
		else{
			this.body.velocity.x = -600;
		}
		game.camera.shake(0.005, 400);
	}
	else
		this.timer.destroy();
}

Boss.prototype.fire = function() {
	if (this.alive){
		let star = this.bulletB.getFirstDead(false);
		star.alpha = 1;
		var throwing = game.add.audio("throw", 0.3);
		
		if(star){
			star.scale.setTo(0.2,0.2);
			game.physics.enable(this, Phaser.Physics.ARCADE);
			if(this.body.x > player.x){
				if(this.body.x < player.x + game.rnd.integerInRange(250,400)){
					star.reset(this.x + 10, this.y - 10);
					star.alpha = 1;
					star.body.velocity.x = game.rnd.integerInRange(-300, -100);
					star.body.velocity.y = game.rnd.integerInRange(-250, -100);	
					throwing.play();
				}
			}
			else {
				if(this.body.x > player.x - game.rnd.integerInRange(250, 400)){
					star.reset(this.x - 10, this.y - 10);
					star.body.velocity.x = game.rnd.integerInRange(100, 300);
					star.body.velocity.y = game.rnd.integerInRange(-250, -100);	
					throwing.play();			
				}
			}
		}
	}
}


Boss.prototype.hit = function() {
	// Check if the boss is already invincible
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

Boss.prototype.death = function(player, bullet) {
	SFX[2].play();
	this.kill();
	bullet.kill();
	//game.state.start('cutfinal');
}

Boss.prototype.pooModifier = function() {
		player.pooCount += 2;
		if (devMode) console.log(player.pooCount);
		player.death();
		player.hit();
}
