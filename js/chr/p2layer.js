function P2layer(game, key, frame, bulletKey) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	Phaser.Sprite.call(this, game, 30, 1100, key);

	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.enable(this, true);

	this.body.fixedRotation = true;
	move = game.input.keyboard.createCursorKeys();
	this.scale.x = 0.2;
	this.scale.y = 0.2;
	game.physics.p2.gravity.y = 3000;
	this.body.setRectangle(this.width, this.height);

}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
P2layer.prototype = Object.create(Phaser.Sprite.prototype);
P2layer.prototype.constructor = P2layer;

// override Phaser.Sprite update
P2layer.prototype.update = function() {
	this.body.setZeroVelocity();
	if(move.left.isDown){
		this.body.moveLeft(150);
	}
	else if(move.right.isDown){
		this.body.moveRight(150);
	}

	if (move.up.isDown)
    {
    	this.body.moveUp(100);
    }
}