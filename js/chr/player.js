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
	this.body.gravity.y = 300;
	this.body.collideWorldBounds = true;


	
	// anchor: Origin of the texture
	// 0.5 = center
	this.anchor.set(0.5);

	// Character info
	this.health = 100;
	this.pooCount = 100;

	//game.physics.enable(this);
}
function fire(){
	var star = bullets.getFirstExists(false);
	if(star){
		star.reset(player.x - 10, player.y + 17);
		star.body.velocity.y = 30;
		pooCount --;
		console.log(pooCount);
	}
};

function death(){
	if(pooCount < 0){
		player.kill();
		player.reset(300,300);
		console.log("death from no poo");
		pooCount = 10;
	}
	if(pooCount > 100){
		player.kill();
		player.reset(300,300);
		console.log("death from too much poo");
		pooCount = 90;
	}
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// override Phaser.Sprite update
Player.prototype.update = function() {
	// Controls
	if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		this.body.acceleration.x -= 3;
		
		if(this.body.acceleration.x < -150){
			this.body.velocity.x = -150;
		}else
		this.body.velocity.x = this.body.acceleration.x;
		console.log("left");
	}else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		this.body.acceleration.x += 3;

		if(this.body.acceleration.x > 150){
			this.body.velocity.x = 150;
			console.log(this.body.velocity.x);
		}else
		this.body.velocity.x = this.body.acceleration.x;
		console.log(this.body.velocity.x);
		
		console.log("right");
	}else{
		this.body.acceleration.x = 0;
		this.body.velocity.x = 0;
	}

	// poopack for jumping
	if(game.input.keyboard.justPressed(Phaser.Keyboard.UP)){
		this.body.velocity.y = -175;
		fire();
		console.log("jump");
		if(pooCount < 0 || pooCount > 100){
			death();
		}
	}

	// Attack move
}