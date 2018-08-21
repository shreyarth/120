// Constructor
function Poo(game, key) {
	Phaser.Sprite.call(this, game, null, null, key);
	game.physics.p2.enable(this);
	//this.body.bounce.y = 0.2;	
	//this.body.gravity.y = 100;
	
	this.body.outOfBoundsKill = true;
	scale.setTo(0.2,0.2);
	// anchor: Origin of the texture
	// 0.5 = center
	this.anchor.set(0.5);
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
Poo.prototype = Object.create(Phaser.Sprite.prototype);
Poo.prototype.constructor = Poo;

Poo.prototype.update = function() {
}