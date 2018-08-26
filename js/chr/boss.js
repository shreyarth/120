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
	// if(this.alive){
	// 	if(this.body.x >= 800){
	// 		this.body.velocity.x = -200;
	// 	}else if(this.body.x <= 200){
	// 		this.body.velocity.x = 100;
	// 	}else{
	// 		this.body.velocity.x = 100;
	// 	}
	// }
}
