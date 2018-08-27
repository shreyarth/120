//Prefab for boss
function Boss(game, x, y, key, type, bFrame){
	Phaser.Sprite.call(this, game, x, y, key);
	game.physics.p2.enable(this, true);
	this.body.fixedRotation = true;
	this.body.velocity.x = 150;
	this.body.data.gravityScale = 0;
	this.type = type;

	this.bulletE = game.add.group();
	this.bulletE.enableBody = true;
	this.bulletE.physicsBodyType = Phaser.Physics.P2JS;
	this.bulletE.createMultiple(50, bFrame);
	this.bulletE.forEach(function(bull) {bull.body.clearShapes(), bull.body.addCircle(5);});
	// this.bulletE.
	//this.bulletE.checkWorldBounds = false;
	//this.bulletE.outOfBoundsKill = true;

	// Timer events for groups
	timer = game.time.create(false);
	timer.loop(game.rnd.integerInRange(700,1300), this.fire, this);
	game.timer.loop(500, function() {
		this.bulletE.forEachAlive(function(bull) {
			bull.alpha -= 0.05;
			if (bull.alpha <= 0)
				bull.alive = false;
		}, this.bullets);
	}, this);
	timer.start();

	// Collision
	this.body.createBodyCallback(player, this.collideBody, this);
	this.bulletE.forEach(function(bull) {bull.body.createBodyCallback(player, function(){if(!player.isInvincible) this.pooModifier();}, this);}, this);
}

Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.update = function() {
	//Wut?
	if(this.body.x >= 800){
		this.charge();
	}
	if(Math.abs((game.world.width - 990) - this.body.x) < 7){
		this.spawn();
	}
}

Boss.prototype.charge = function() {
	this.body.velocity.x = -500;
}
Boss.prototype.spawn = function() {
	kami = new Enemy(game, game.rnd.integerInRange(100, 1000), 300, 'enemy', null, null, 'kamikaze_turkey');
	game.add.existing(kami);
}

Boss.prototype.fire = function() {
	if (this.alive){
		let star = this.bulletE.getFirstDead(false);
		star.alpha = 1;
		var throwing = game.add.audio("throw", 0.3);
		
		if(star){
			// star.scale.setTo(0.05,0.05);
			game.physics.enable(this, Phaser.Physics.ARCADE);
			if(this.body.x > player.x){
				if(this.body.x < player.x + game.rnd.integerInRange(250,400)){
					star.reset(this.x + 10, this.y - 10);
					star.alpha = 1;
					star.body.velocity.x = game.rnd.integerInRange(-200, -100);
					star.body.velocity.y = game.rnd.integerInRange(-250, -100);	
					throwing.play();
				}
			}
			else {
				if(this.body.x > player.x - game.rnd.integerInRange(250, 400)){
					star.reset(this.x - 10, this.y - 10);
					star.body.velocity.x = game.rnd.integerInRange(100, 200);
					star.body.velocity.y = game.rnd.integerInRange(-250, -100);	
					throwing.play();			
				}
			}
		}
	}
}