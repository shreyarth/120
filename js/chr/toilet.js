function Toilet(game, x, y, key) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	Phaser.Sprite.call(this, game, x, y, key);
	
	// anchor: Origin of the texture
	// 0.5 = center
	this.anchor.set(0.5);

	// physics crap
	game.physics.p2.enable(this);
	
	//this.game.physics.p2.gravity.y = 300;
	this.body.collideWorldBounds = true;
	

	//timer
	// timer = game.time.create(false);
	// timer.loop(1300, this.fire, this);
	// timer.start();
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
Toilet.prototype = Object.create(Phaser.Sprite.prototype);
Toilet.prototype.constructor = Toilet;

Toilet.prototype.toiletmeter = function(){
	emitter = game.add.emitter(this.x - 10, this.y, 40);
	emitter.makeParticles('twater');
	emitter.start(false, 0,0);
	emitter.setYSpeed(-50,-150);
	console.log("toilet not working");

};
// override Phaser.Sprite update
Toilet.prototype.update = function() {

	if(this.x > player.x -5 && this.x < player.x +5
		&& this.y > player.y -10 && this.y < player.y +10){
		this.toiletmeter();
	}
}

