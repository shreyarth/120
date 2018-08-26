//Prefab for boss
function Boss(game, x, y, key){
	Phaser.Sprite.call(this, game, x, y, key);
	game.physics.p2.enable(this, true);
	this.body.fixedRotation = true;
	this.body.velocity.x = 50;
	this.body.data.gravityScale = 0;
}

Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.update = function() {
	//Wut?
	this.changeDir();
}

Boss.prototype.changeDir = function() {
	if(this.body.x >= 800){
		console.log('inifififiifififio');
		this.body.velocity.x = -200;
		console.log(this.body.velocity.x);
	}
	if(this.body.x <= 200){
		console.log('inifififiifififio');
		this.body.velocity.x = 200;
		console.log(this.body.velocity.x);
	}
}
