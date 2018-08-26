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

Boss.prototype.charge = function() {
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

Boss.prototype.spawnKami = function() {
	if(Math.abs(player.x - this.x) < 100){
		kami = new Enemy(game, this.x, 100, 'enemy', null, null, 'kaimkaze_turkey');
	}
}