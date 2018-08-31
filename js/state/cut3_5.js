var cut3_5 = function(game){
	this.collideEnemy, this.collidePlat;
};

cut3_5.prototype = {
	create: function(){
		game.world.setBounds(0, 0, 1000, 600);
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		this.collideEnemy = game.physics.p2.createCollisionGroup();
		this.collidePlat = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup([this.collideEnemy, this.collidePlat]);

		var background = game.add.sprite(-500, 0, 'bookstore');

		this.platform = game.add.group();
		this.platform.physicsBodyType = Phaser.Physics.P2JS;
		this.platform.enableBody = true;
		this.platform.collideWorldBounds = true;

		let ground = this.platform.create(500, 600, 'sidewalk');
		ground.body.clearShapes();
		ground.body.addRectangle(1000, 42);
		ground.body.anchor = 0.5;
		ground.body.setCollisionGroup(this.collidePlat);
		ground.body.collides(this.collideEnemy);
		ground.scale.y = 0.5;	
		// ground.scale.x = 0.5;
		ground.body.kinematic = true;

		this.enemy = game.add.group();
		this.enemy.physicsBodyType = Phaser.Physics.P2JS;
		this.enemy.enableBody = true;
		for(var i = 0; i < 12; ++i){
			en = new Enemy(game, game.rnd.integerInRange(100, 1000), 555, 'bad', null, null, 'hooman');
			game.add.existing(en);
			this.enemy.add(en);
			}
		en.body.setCollisionGroup(this.collideEnemy);
		en.body.collides(this.collidePlat);
		// game.time.events.add(Phaser.Timer.SECOND * 4, this.changeState, this);

	},
	update: function(){
		game.camera.shake(0.005, 500);
	},

	changeState: function(){
		// game.state.start('cut4');
	}
}