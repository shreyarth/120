// Constructor
function Player(game, key, frame) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	//Phaser.Sprite.call(this, game, 64, 110, key, frame);
	//Phaser.Sprite.call(this, game, 470, 500, 0,'player', 33);
	
	Phaser.Sprite.call(this, game, 300, 300, 'player');
	this.scale.x = 0.1;
	this.scale.y = 0.1;
	// physics crap
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 200;
	this.body.collideWorldBounds = true;


	
	// anchor: Origin of the texture
	// 0.5 = center
	this.anchor.set(0.5);

	// Character info
	this.health = 100;
	this.pooCount = 100;

	//game.physics.enable(this);
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// override Phaser.Sprite update
Player.prototype.update = function() {
	// Controls
	if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		this.body.velocity.x -= 5;
		console.log("left");
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		this.body.velocity.x += 5;
		console.log("right");
	}

	// Jump (need double jump)
	if(game.input.keyboard.justPressed(Phaser.Keyboard.UP)){
		this.body.velocity.y -= 200;
		console.log("jump");
	}

	// Attack move
}
