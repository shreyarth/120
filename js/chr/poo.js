// Constructor
function Poo(game, key) {
	
	Phaser.Sprite.call(this, game, null, null, 'poo');
	game.physics.enable(this, Phaser.Physics.ARCADE);
	//this.body.bounce.y = 0.2;	
	//this.body.gravity.y = 100;
	//this.body.collideWorldBounds = true;
	scale.setTo(0.2,0.2);

	
	// anchor: Origin of the texture
	// 0.5 = center
	this.anchor.set(0.5);

	//bullets = game.add.group();
	//bullets.enableBody = true;
	//bullets.physicsBodyType = Phaser.Physics.ARCADE;
	//bullets.createMultiple(200, 'star');
	//bullets.setAll('checkWorldBounds', true);
	//bullets.callAll('events.onOutOfBounds.add', 'events.outOfBounds', resetstar);
	//bullets.checkWorldBounds = true;
	//bullets.outOfBoundsKill = true;

	game.physics.enable(this, Phaser.Physics.ARCADE);
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
Poo.prototype = Object.create(Phaser.Sprite.prototype);
Poo.prototype.constructor = Poo;

Poo.prototype.update = function() {
	if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			fire();
	}
}