//Prefab for boss
function Boss(game, x, y, key, type, bFrame){
	Phaser.Sprite.call(this, game, x, y, key);
	game.physics.p2.enable(this, false);
	this.body.fixedRotation = true;
	this.body.velocity.x = 150;
	this.body.data.gravityScale = 0;
	this.type = type;
	this.anchor.setTo(0.5, 0.5);
	// this.alpha = 0.5;
	this.health = 50;
	game.time.events.add(Phaser.Timer.SECOND * 3, this.charge, this);
	game.time.events.add(Phaser.Timer.SECOND * 3, this.deer , this);
	this.isInvincible = false;
	
	// sound effects for boss
	this.sfx = [];
	this.sfx[7] = game.add.audio('bossdeath');
	this.sfx[8] = game.add.audio('bossyell');

	// this.typecheck();
	if(this.type == 'eyes')
		this.body.setRectangle(72, 36, -29, -100);
		this.body.addRectangle(190, 90 , -20, 90);
	
	if(this.type == 'mouth')
		this.body.setRectangle(72, 75, -20, 0);
		this.body.addRectangle(190, 90 , -20, 90);	
	
	
	this.body.collideWorldBounds = true;
	// this.shapeCount = 2;

	this.bulletB = game.add.group();
	this.bulletB.enableBody = true;
	this.bulletB.physicsBodyType = Phaser.Physics.P2JS;
	this.bulletB.createMultiple(50, bFrame);
	this.bulletB.forEach(function(bull) {bull.body.clearShapes(), bull.body.addCircle(35);});

	// Timer events for groups
	timer = game.time.create(false);
	timer.loop(game.rnd.integerInRange(700,1300), this.fire, this);
	game.timer.loop(500, function() {
		this.bulletB.forEachAlive(function(bull) {
			bull.alpha -= 0.05;
			if (bull.alpha <= 0)
				bull.alive = false;
		}, this.bullets);
	}, this);
	timer.start();

	// Collision
	this.body.createBodyCallback(player, this.collideBody, this);
	// this.body.createBodyCallback(player, this.healthDec, this);
	this.bulletB.forEach(function(bull) {bull.body.createBodyCallback(player, function(){if(!player.isInvincible) this.pooModifier();}, this);}, this);
}

Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.update = function() {
	//Wut?
	console.log(this.health);
	if(Math.abs((game.world.width - 990) - this.body.x) < 100){
		this.spawn();
	}
}

Boss.prototype.charge = function() {
	console.log('cahgingings?');
	if(this.body.x < player.body.x){
		this.scale.x = -1;
		this.body.velocity.x = 500;
	}
	else{
		this.body.velocity.x = -500;
	}
	
}

Boss.prototype.spawn = function() {
	kami = new Enemy(game, game.rnd.integerInRange(100, 1000), 300, 'enemy', null, null, 'kamikaze_turkey');
	game.add.existing(kami);
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
					star.body.velocity.x = game.rnd.integerInRange(-200, -100);
					star.body.velocity.y = game.rnd.integerInRange(-250, -100);	
					throwing.play();
				}
			}
			else {
				if(this.body.x > player.x - game.rnd.integerInRange(250, 400)){
					star.reset(this.x - 10, this.y - 10);
					star.body.velocity.x = game.rnd.integerInRange(100, 200);
					star.body.velocity.y = game.rnd.integerInRange(-250, -100);	
					throwing.play();			
				}
			}
		}
	}
}

Boss.prototype.hp = function() {
	console.log('in hp fn');
	this.health --;
	console.log('hheaaaallllllttthhhhh: ' + this.health);
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

Boss.prototype.collideBody = function() {
	this.health -= 1;
}

Boss.prototype.death = function(player, bullet) {
	//this.turkey();
	SFX[2].play();
	// game.camera.shake(0.005, 400);
	this.kill();
	//this.reset(game.rnd.integerInRange(2500,5000),
	//	game.rnd.integerInRange(600,1000));
	bullet.kill();
}

Boss.prototype.deer = function(){
	deer1 = new Enemy(game, 0, 100, 'deer', null, null, 'deer');
	game.add.existing(deer1);

	deer2 = new Enemy(game, 800, 100, 'deer', null, null, 'deer');
	game.add.existing(deer2);
}