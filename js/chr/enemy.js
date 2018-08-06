// Constructor
function Enemy(game, key, frame) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	Phaser.Sprite.call(this, game, 500, 300, 'enemy', frame);
	// needs enemy type

	// anchor: Origin of the texture
	// 0.5 = center
	this.scale.x = 0.1;
	this.scale.y = 0.1;

	// physics crap
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 300;
	this.body.collideWorldBounds = true;
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// override Phaser.Sprite update
Enemy.prototype.update = function() {
	game.physics.arcade.collide(this, player, this.pooModifier, null, this);
	game.physics.arcade.collide(this, player.bullets, this.death, null, this);
	this.chasePlayer();
	// trying to get enemy to move towards player when its on a platform
	// not working, its floating around like a ghost

	//game.physics.arcade.moveToObject(this, player);
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
	}
}

Enemy.prototype.death = function(player, bullet) {
	this.kill();
	this.reset(500, 400);
	bullet.kill();
}

Enemy.prototype.chasePlayer = function() {
	/*
	// When player is left
	if (player.body.x < this.body.x) {
		this.velocity.x = -50;
	}
	else if (player.body.x > this.body.x) {
		this.velocity.x = 50;
	}
	*/
}