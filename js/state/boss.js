var boss = function() {
	// Global state variables
	this.bullets, this.enemy, this.boss, this.phase;
	this.platform;

	this.ui, this.full_width, this.cropRect;
	this.bossHealthUI, this.bossMaxHP, this.full_widthBH, this.cropRect_BH;

	this.collidePlayer, this.collidePlat, this.collideEnemy, this.collideBoss;
	this.collidePB, this.collideBB;

	this.boss_ps, this.bx, this.by, this.end;
}

boss.prototype = {
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
		if (player && player.pooCount >= 5)
				temp_poo = player.pooCount - 3;
		player = new P2layer(game, 64, 250, 'player', null, 'poo', 850);
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
		game.time.events.loop(Phaser.Timer.SECOND * 10, this.spawnDeer, this);
		game.time.events.add(Phaser.Timer.SECOND * 6, this.spawnTurk, this);
		this.phase = 1;
		this.boss_ps = true;

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
		if((this.boss.health == 10 && this.phase == 1) || (this.boss.health <= 0 && this.phase < 5))
			this.changeBoss();
		if (this.phase == 5){
			// Boss defeated
			let temp = game.add.sprite(this.boss.x, this.boss.y, 'boss4');
			temp.anchor.setTo(0.5);
			this.boss.destroy();
			this.boss = temp;
			this.phase++;
		}
		if (this.phase > 5) {
			if (this.boss_ps) {
				this.bx = this.boss.x;
				this.by = this.boss.y;

				this.boss.x += game.rnd.integerInRange(5, 5);
				this.boss.y += game.rnd.integerInRange(5, 5);
				this.boss_ps = false;
			}
			else{
				this.boss.x = this.bx;
				this.boss.y = this.by;
				this.boss_ps = true;
			}
			// Shake cam
			game.camera.shake(0.005, 500);
			if (this.end == null || this.end == undefined){
				SFX[15].play();
				this.end = game.time.events.add(5000, this.moveOn, this);
				someShit.cleared = true;
				localStorage.setItem('someShit', JSON.stringify(someShit));
			}
		}

		// UI update
		if (player.pooCount >= 0) {
			this.cropRect.width = player.pooCount/MAXPOO * this.full_width;
			this.ui.updateCrop();
		}
		if (this.boss.health >= 0){
			this.bossHealthUI.destroy();
			this.bossHealthUI = this.bossHealthBar();
		}
	},

	changeBoss: function(){
		let key = 'boss' + this.phase;
		console.log(key);
		let temp;
		if (this.boss.type == 'eyes')
			temp = new Boss(game, this.boss.x, this.boss.y, key, 'mouth', 'lax');
		if (this.boss.type == 'mouth')
			temp = new Boss(game, this.boss.x, this.boss.y, key, 'eyes', 'lax');
		
		game.add.existing(temp);
		temp.health = 10;
		temp.body.setCollisionGroup(this.collideBoss);
		temp.body.collides([this.collidePlat, this.collidePlayer, this.collidePB]);
		this.boss.destroy();
		// Reinitialize
		this.boss = temp;
		this.bossMaxHP = this.boss.health;
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

		this.phase++;	// Count phases
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
	},
	spawnDeer: function(){
		d1 = new Enemy(game, 0, 550, 'deer', null, null, 'deer');
		game.add.existing(d1);
		d1.body.setCollisionGroup(this.collideEnemy);
		d1.body.collides([this.collidePlat,  this.collidePlayer, this.collidePB]);
		d1.body.createGroupCallback(this.collidePB, function(d1, bull) {
			d1.sprite.kill();
			bull.sprite.kill();
		}, d1);
		d1.body.createGroupCallback(this.collidePlayer, function() {
			d1.kill();
		}, d1);

		d2 = new Enemy(game, 800, 550, 'deer', null, null, 'deer');
		game.add.existing(d2);
		d2.body.setCollisionGroup(this.collideEnemy);
		d2.body.collides([this.collidePlat,  this.collidePlayer, this.collidePB]);
		d2.body.createGroupCallback(this.collidePB, function(d2, bull) {
			d2.sprite.kill();
			bull.sprite.kill();
		}, d2);
		d2.body.createGroupCallback(this.collidePlayer, function() {
			d2.kill();
		}, d2);
	},
	spawnTurk: function(){
		console.log('In kamikaze_turkey');
		for(var i = 0; i < 3; ++i){
			turkie = new Enemy(game, game.rnd.integerInRange(100, 1000), 100, 'enemy', null, null, 'kamikaze_turkey');
			game.add.existing(turkie);
		}
		turkie.body.setCollisionGroup(this.collideEnemy);
		turkie.body.collides([this.collidePlat,  this.collidePlayer, this.collidePB]);
		turkie.body.createGroupCallback(this.collidePB, function(turkie, bull) {
			turkie.sprite.kill();
			bull.sprite.kill();
		}, turkie);
		turkie.body.createGroupCallback(this.collidePlayer, function() {
			turkie.kill();
		}, turkie);
	},
	moveOn: function() {
		BGM[2].stop();
		if (SFX[15].isPlaying)	SFX[15].stop();
		game.state.start('cutfinal');
	}
}