// Constructor
function Enemy(game, key, frame) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	Phaser.Sprite.call(this, game, 500, 300, 'enemy', frame);
	
	// anchor: Origin of the texture
	// 0.5 = center
	this.scale.x = 0.1;
	this.scale.y = 0.1;
	// physics crap
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 300;
	this.body.collideWorldBounds = true;
	// needs enemy type

	game.physics.enable(this);
}
function turkey(){
	var turk = game.add.audio('turkey', 1);
	turk.allowMultiple = false;
	turk.play();
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// override Phaser.Sprite update
Enemy.prototype.update = function() {
	if(game.physics.arcade.collide(this, player, this.pooModifier, null, this)){
		console.log("colliding with player");
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
}

Enemy.prototype.pooModifier = function() {
	if (!player.isInvincible) {
		if(player.pooCount > 50)
			player.pooCount += 10;
		else
			player.pooCount -= 10;

		console.log(player.pooCount);
		player.death();
		player.isInvincible = true;
		player.timer.add(500, function() {console.log("fire timed event"); this.isInvincible = false;}, player);
		turkey();
	}
}

Enemy.prototype.death = function(player, bullet) {
	turkey();
	// game.camera.shake(0.005, 400);
	this.kill();
	this.reset(500, 400);
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