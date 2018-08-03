// Constructor
function Enemy(game, key, frame) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	Phaser.Sprite.call(this, game, game.rnd.integerInRange(0,game.width), game.rnd.integerInRange(37,game.height-37), key, frame);
	
	// anchor: Origin of the texture
	// 0.5 = center
	this.anchor.set(0.5);

	// Enemy info
	this.health = 100;
	// needs enemy type

	game.physics.enable(this);
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// override Phaser.Sprite update
Enemy.prototype.update = function() {
	// Random movement
	// Simple AI when protag approaches within the param
}