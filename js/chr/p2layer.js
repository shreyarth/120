function P2layer(game, key, frame, bulletKey) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	Phaser.Sprite.call(this, game, 30, 1100, key);
	// Animation settings
	this.animations.add('jump', [1, 2, 3, 4, 3, 2], 15);

	game.physics.p2.enable(this, true);

	this.body.fixedRotation = true;
	move = game.input.keyboard.createCursorKeys();
	this.scale.x = 0.2;
	this.scale.y = 0.2;
	this.game.physics.p2.gravity.y = 500;
	this.body.setRectangle(this.width, this.height);

}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
P2layer.prototype = Object.create(Phaser.Sprite.prototype);
P2layer.prototype.constructor = P2layer;

// override Phaser.Sprite update
P2layer.prototype.update = function() {
	if(move.left.isDown){
		this.body.velocity.x = -150;
	}
	else if(move.right.isDown){
		this.body.velocity.x = 150;
	}
	else {
		// Decceleration
		if (this.body.velocity.x > 0) {
			this.body.velocity.x -= 3;
			if (this.body.velocity.x < 0)
				this.body.velocity.x = 0;
		}
		else if (this.body.velocity.x > 0) {
			this.body.velocity.x += 3;
			if (this.body.velocity.x > 0)
				this.body.velocity.x = 0;
		}
	}
	if (move.up.justDown)
    {
    	this.body.velocity.y = -150;
		this.animations.play('jump');
    	//this.body.moveUp(5000);
    }
    else{
    	//game.physics.p2.gravity.y = 1000;
    	//this.body.data.gravityScale = 5;
		if (this.animations.isFinished)
			this.animations.stop(null, true);
    }

}