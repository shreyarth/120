// Constructor
function Poo(game, key) {
	
	Phaser.Sprite.call(this, game, 'star');
	game.physics.enable(this, Phaser.Physics.ARCADE);
	//this.body.bounce.y = 0.2;
	//this.body.gravity.y = 100;
	//this.body.collideWorldBounds = true;


	
	// anchor: Origin of the texture
	// 0.5 = center
	//this.anchor.set(0.5);

	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
	bullets.createMultiple(200, 'star');
	//bullets.setAll('checkWorldBounds', true);
	//bullets.callAll('events.onOutOfBounds.add', 'events.outOfBounds', resetstar);
	bullets.checkWorldBounds = true;
	bullets.outOfBoundsKill = true;

	//game.physics.enable(this);
}
/*
function fire(){
	poo = bullets.getFirstExists(false);
	if(poo){
		poo.reset(player.x - 10, player.y + 17);
		poo.body.velocity.y = 30;
		pooCount --;
		console.log(pooCount);
	}
};

*/
// explicitly define prefab's prototype (Phaser.Sprite) and constructor
Poo.prototype = Object.create(Phaser.Sprite.prototype);
Poo.prototype.constructor = Poo;

// override Phaser.Sprite update
Poo.prototype.update = function() {
	
	/*
	if(game.physics.arcade.collide(star, platform)){
			poo.kill();
		}
	*/
	if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			fire();
	}
	// Attack move
}