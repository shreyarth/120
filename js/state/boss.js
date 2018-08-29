var boss = function() {
	// Global state variables
	this.bullets, this.enemy, this.boss;
	this.platform;

	this.ui, this.full_width, this.cropRect;
	this.bossHealthUI, this.bossMaxHP, this.full_widthBH, this.cropRect_BH;

	this.collidePlayer, this.collidePlat, this.collideEnemy, this.collideBoss;
	this.collidePB, this.collideBB;
}

boss.prototype = {
	preload: function() {
		
	},
	create: function() {
		if (!BGM[2].isPlaying) BGM[2].play();
		
		// Game world setting
		game.world.setBounds(0, 0, 1000, 600);
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		// Setting up collision groups
		this.collidePlayer = game.physics.p2.createCollisionGroup();
		this.collidePlat = game.physics.p2.createCollisionGroup();
		this.collidePB = game.physics.p2.createCollisionGroup();
		this.collideBB = game.physics.p2.createCollisionGroup();
		this.collideBoss = game.physics.p2.createCollisionGroup();
		this.collideEnemy = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup([this.collidePlayer, this.collidePlat, this.collideBoss,
			this.collideEnemy, this.collidePB, this.collideBB]);
		
		var background = game.add.sprite(-500, 0, 'bookstore');
		

		// ground
		this.platform = game.add.group();
		this.platform.physicsBodyType = Phaser.Physics.P2JS;
		this.platform.enableBody = true;
		this.platform.collideWorldBounds = true;

		let ground = this.platform.create(500, 600, 'sidewalk');
		ground.body.clearShapes();
		ground.body.addRectangle(1000, 42);
		ground.body.anchor = 0.5;
		ground.body.setCollisionGroup(this.collidePlat);
		ground.body.collides([this.collidePlayer, this.collideBB, this.collideBoss, this.collidePB]);
		ground.scale.y = 0.5;	
		// ground.scale.x = 0.5;
		ground.body.kinematic = true;

		
		// Player
		let temp_poo = 0;
		if (player) temp_poo = player.pooCount;
		player = new P2layer(game, 100, 100, 'player', null, 'poo');
		if (temp_poo != 0) player.pooCount = temp_poo;	// Rollover from prev stage
		game.add.existing(player);
		player.body.setCollisionGroup(this.collidePlayer);
		player.body.collides([this.collidePlat, this.collideBB, this.collideBoss, this.collideEnemy]);
		player.bullets.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collidePB);
			bull.body.collides([this.collidePlat, this.collideBoss]);
			bull.body.createGroupCallback(this.collidePlat, function(bull, plat){
				if (bull.velocity.x != 0){
					player.groundSplat(bull.x, bull.y);
				}
			});
		}, this);

		//camera
		game.camera.follow(player);

		//boss
		this.boss = new Boss(game, 410, 400, 'boss', 'eyes', 'lax');
		game.add.existing(this.boss);
		console.log(this.boss);
		this.boss.body.setCollisionGroup(this.collideBoss);
		this.boss.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		this.boss.body.createGroupCallback(this.collidePB, function(boss, bull) {
			this.health--;
			bull.sprite.kill();
		}, this.boss);
		this.boss.bulletB.forEach(function(bull) {
			bull.body.setCollisionGroup(this.collideBB);
			bull.body.collides([this.collidePlayer, this.collidePlat], function(bull) {this.kill();}, bull);
		}, this);
		// game.camera.follow(this.boss);
		
		// Set camera to platformer follow up
		// lerp set for smooth camera movement
		// game.camera.follow('player', FOLLOW_PLATFORMER, 0.25, 0.25);

		// Fix UI to the camera
		this.ui = barUI();
		this.full_width = this.ui.width;
		this.cropRect = new Phaser.Rectangle(0, 0, player.pooCount/MAXPOO * this.ui.width, this.ui.height);
		this.ui.crop(this.cropRect);

		// Boss health bar UI that follows
		this.full_widthBH = 120;
		this.bossMaxHP = this.boss.health;
		this.bossHealthUI = this.bossHealthBar();
	},
	update: function() {
		// Update function
		// if(this.boss.x > 800){
		// 	bossmouth.body.velocity.x -= 500;
		// 	console.log(bossmouth.body.velocity.x);
		// }
		// if(this.boss.health == 0 && this.boss.type == 'eyes'){
			// this.changeBoss();
		// }
		// UI update
		if (player.pooCount >= 0) {
			this.cropRect.width = player.pooCount/MAXPOO * this.full_width;
			this.ui.updateCrop();
		}
		this.bossHealthUI.destroy();
		this.bossHealthUI = this.bossHealthBar();
	},

	changeBoss: function(){
		console.log('asfad');
		this.boss1 = new Boss(game, boss.x, boss.y, 'boss', 'mouth', 'lax');
		game.add.existing(this.boss1);
		this.boss1.health = 100;
		this.boss1.body.setCollisionGroup(this.collideBoss);
		this.boss1.body.collides([this.collidePlat, this.collidePlayer]);
		this.boss.kill();
	},

	bossHealthBar: function() {
		let obj = null;
		
		let g = game.add.graphics();
		g.beginFill(0x00ff00);
		g.drawRect(0, 0, this.boss.health/this.bossMaxHP * this.full_widthBH, 12);	// Starting point, width, height
		g.endFill();

		// transform primitive into sprite and destroy primitive
		obj = game.add.sprite(this.boss.x - this.boss.width/4, this.boss.y - this.boss.height/2 - 32, g.generateTexture());
		g.destroy();

		return obj;
	}
}