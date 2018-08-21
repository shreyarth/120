// Constructor
function Enemy(game, x, y, key, frame, bFrame) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	Phaser.Sprite.call(this, game, x, y, 'enemy', frame);
	
	// anchor: Origin of the texture
	// 0.5 = center
	this.scale.setTo(0.1);
	this.anchor.set(0.5);

	// physics crap
	game.physics.p2.enable(this);
	this.body.fixedRotation = true;
	this.game.physics.p2.gravity.y = 300;
	this.body.collideWorldBounds = true;
	// needs enemy type

	//enemy bullets
	this.bulletE = game.add.group();
	this.bulletE.enableBody = true;
	this.bulletE.physicsBodyType = Phaser.Physics.P2JS;
	this.bulletE.createMultiple(200, bFrame);
	this.bulletE.forEach(function(bull) {bull.body.clearShapes(), bull.body.addCircle(5);});
	// this.bulletE.
	//this.bulletE.checkWorldBounds = false;
	//this.bulletE.outOfBoundsKill = true;

	//timer
	timer = game.time.create(false);
	timer.loop(1300, this.fire, this);
	timer.start();

	// Collision
	this.body.createBodyCallback(player, this.collideBody, this);
	this.bulletE.forEach(function(bull) {bull.body.createBodyCallback(player, function(){if(!player.isInvincible) this.pooModifier();}, this);}, this);
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// override Phaser.Sprite update
Enemy.prototype.update = function() {
	if(this.body.velocity.x > 0){
		this.scale.setTo(-0.1, 0.1);
	}
	if(this.body.velocity.x < 0){
		this.scale.setTo(0.1, 0.1);
	}
}

Enemy.prototype.collideBody = function() {
	if (!player.isInvincible) {
	this.turkey();
	this.pooModifier();
	}
}

Enemy.prototype.pooModifier = function() {
		let rando = game.rnd.integerInRange(1, 1000);
		if (rando % 4 == 0) {
			if(player.pooCount > 15)
				player.pooCount += 1;
			else
				player.pooCount -= 1;
		}
		else {
			player.pooCount += 1;
		}

		console.log(player.pooCount);
		player.death();
		player.hit();
}
Enemy.prototype.fire = function() {
	let star = this.bulletE.getFirstExists(false);
	
	if(star){
		star.scale.setTo(0.05,0.05);
		game.physics.enable(this, Phaser.Physics.ARCADE);
		if(this.body.x > player.x){
			if(this.body.x < player.x+300){
				
				star.reset(this.x + 10, this.y - 10);
				star.body.velocity.x = -150;
			}
				
	}else{
		if(this.body.x > player.x-300){
		star.reset(this.x - 10, this.y - 10);
		star.body.velocity.x = 150;				
		}
	}
}
}
Enemy.prototype.death = function(player, bullet) {
	this.turkey();
	// game.camera.shake(0.005, 400);
	this.kill();
	this.reset(game.rnd.integerInRange(2500,5000),
		game.rnd.integerInRange(600,1000));
	bullet.kill();
}

Enemy.prototype.chasePlayer = function() {
	// When player is left
	if (player.body.x < this.body.x) {
		this.velocity.x = -50;
	}
	else if (player.body.x > this.body.x) {
		this.velocity.x = 50;
	}
}

Enemy.prototype.turkey = function(){
	let turk = game.add.audio('turkey', 1);
	turk.allowMultiple = false;
	turk.play();
}