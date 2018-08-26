//Prefab for boss
function Boss(game, x, y, key){
	Phaser.Sprite.call(this, game, x, y, key);
	game.physics.p2.enable(this, true);
	this.body.fixedRotation = true;
	// this.body.velocity.x = 50;
	this.body.data.gravityScale = 0;
}

Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.update = function() {
	//Wut?
}
