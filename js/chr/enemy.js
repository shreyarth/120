// Constructor
function Enemy(game, x, y, key, frame) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	Phaser.Sprite.call(this, game, x, y, 'enemy', frame);
	
	// anchor: Origin of the texture
	// 0.5 = center
	// this.scale.x = 0.1;
	this.scale.setTo(0.1);
	this.anchor.set(0.5);
	// this.scale.y = 0.1;
	// // physics crap
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 300;
	this.body.collideWorldBounds = true;
	// needs enemy type

	game.physics.enable(this);

	//enemy bullets
	this.bulletE = game.add.group();
	//this.bulletE.scale.setTo(4);
	this.bulletE.enableBody = true;
	this.bulletE.physicsBodyType = Phaser.Physics.ARCADE;
	this.bulletE.createMultiple(200, 'star');
	this.bulletE.checkWorldBounds = true;
	this.bulletE.outOfBoundsKill = true;

	//timer
	timer = game.time.create(false);
	timer.loop(1300, this.fire, this);
	timer.start();
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// override Phaser.Sprite update
Enemy.prototype.update = function() {
	if (!player.isInvincible) {
		game.physics.arcade.collide(this, player, this.collideBody, null, this);
		game.physics.arcade.collide(this.bulletE, player, this.collideBullet, null, this);
	}
	game.physics.arcade.collide(this, player.bullets, this.death, null, this);
	// trying to get enemy to move towards player when its on a platform
	// not working, its floating around like a ghost
	/*
	if(game.physics.arcade.collide(this, platform)){
			game.physics.arcade.moveToObject(enemy, player);
			console.log("moving towards player");
		}
		game.physics.arcade.moveToObject(enemy, player);
*/
	if(this.body.velocity.x > 0){
		this.scale.setTo(-0.1, 0.1);
	}
	if(this.body.velocity.x < 0){
		this.scale.setTo(0.1, 0.1);
	}

	//shooting
	
	//this.fire();
	
}

Enemy.prototype.collideBody = function() {
	this.turkey();
	this.pooModifier();
}

Enemy.prototype.collideBullet = function(player, bull) {
	bull.kill();
	this.pooModifier();
}

Enemy.prototype.pooModifier = function() {
		let rando = game.rnd.integerInRange(1, 1000);
		if (rando % 4 == 0) {
			if(player.pooCount > 50)
				player.pooCount += 10;
			else
				player.pooCount -= 10;
		}
		else {
			player.pooCount += 10;
		}

		console.log(player.pooCount);
		player.death();
		player.hit();
}
Enemy.prototype.fire = function() {
	let star = this.bulletE.getFirstExists(false);
	
	if(star){
		star.scale.setTo(1,1);
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