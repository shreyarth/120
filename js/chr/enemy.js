// Constructor
function Enemy(game, key, frame) {
	// Phaser.Sprite(game, x, y, key)
	// game.rnd.integerInRange(min, max) returns rand int between min, max
	Phaser.Sprite.call(this, game, 500, 300, 'enemy', frame);
	
	// anchor: Origin of the texture
	// 0.5 = center
	this.scale.x = 0.1;
	this.scale.y = 0.1;
	// physics crap
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 300;
	this.body.collideWorldBounds = true;
	// needs enemy type

	game.physics.enable(this);
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// override Phaser.Sprite update
Enemy.prototype.update = function() {
	
	if(game.physics.arcade.collide(enemy, player)){
		if(pooCount > 50){
			pooCount = pooCount +10;
		}else
		pooCount = pooCount -10;
	}
	if(game.physics.arcade.collide(enemy, star)){
		this.kill();
		this.reset(500, 400);
		star.kill();
	// Random movement
	// Simple AI when protag approaches within the param
	}
	// trying to get enemy to move towards player when its on a platform
	// not working, its floating around like a ghost
	if(game.physics.arcade.collide(enemy, platform)){
			game.physics.arcade.moveToObject(enemy, player);
			console.log("moving towards player");
		}
		game.physics.arcade.moveToObject(enemy, player);

	
	
}