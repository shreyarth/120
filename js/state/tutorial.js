var tutorial = function() {
	this.tplayer;
	this.bubble, this.b_txt, this.txtStyle, this.tut_sprite, this.tut_score;
	this.step = 0;
}

tutorial.prototype = {
	create: function() {
		BGM[3].play();	// Really nice forest vibe
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.backgroundColor = "#1A7209";

		// Background
		game.add.sprite(0, 0, 'c9-10');

		// var playText = game.add.text(game.width/2, game.height*.8, 
		// 	"Hello, I'm D and I'm here to teach you how to play the game\n",
		// 	"First, lets start with movement, use the right and left arrow keys to move",
		// 	{font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		// playText.anchor.set(0.5);

		this.tplayer = game.add.sprite(300, game.world.height - 150, 'deer');
		this.tplayer.animations.add('walk', [0, 1], 4);
		this.tplayer.anchor.set(0.5);
		game.physics.arcade.enable(this.tplayer);
		this.tplayer.body.bounce.y = 0.1;
		this.tplayer.body.gravity.y = 700;
		this.tplayer.body.collideWorldBounds = true;

		this.bubble = this.drawBubble(game.width/2, 138, 720, 76);

		this.txtStyle = {font: 'Press Start 2P', fontSize: '12px', fill: '#333', align: 'center'};

		this.b_txt = game.add.text(game.width/2, 142,
			"Hi, I'm D and I'm here to teach you how to play the game.\n\n                               > hit SPACEBAR to proceed", this.txtStyle);
		this.b_txt.anchor.set(0.5);

		let tt = game.add.text(570, game.height - 16, "Push ENTER to skip", this.txtStyle);
		tt.fill = '#fff';
		tt.strokeThickness = 3;
	},
	update: function() {
		if (this.tut_sprite)
			game.physics.arcade.collide(this.tplayer, this.tut_sprite, this.collectStar, null, this);
		//to return to game
		if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)){
			BGM[3].stop();
			game.state.start('menu');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.tplayer.body.velocity.x = -100;
			this.tplayer.animations.play('walk');
			this.tplayer.scale.x = 1;
			if (this.step == 1) this.proceed();
		}else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.tplayer.body.velocity.x = 100;
			this.tplayer.animations.play('walk');
			this.tplayer.scale.x = -1;
			if (this.step == 1) this.proceed();
		}else{
			this.tplayer.body.velocity.x = 0;
			this.tplayer.animations.stop();
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.UP)){
			this.tplayer.body.velocity.y = -400;
			if (this.step == 2)	this.proceed();
		}

		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			if (this.step == 0 || this.step == 3 || this.step == 4 || this.step == 5 || this.step == 6 || this.step == 8)
				this.proceed();
		}

		if(this.tplayer.x +100 > game.world.width && this.step == 9){
			this.proceed();
		}

	},
	drawBubble: function(x, y, w, h) {
		let obj = null;

		// create primitive
		let g = game.add.graphics();
		g.beginFill(0xffffff);
		g.drawRoundedRect(x, y, w, h, 12);	// Starting point, width, height, radius (for rounded edges)
		g.endFill();

		// transform primitive into sprite and destroy primitive
		obj = game.add.sprite(x, y, g.generateTexture());
		obj.alpha = 0.87;
		obj.anchor.set(0.5, 0.5);
		g.destroy();

		return obj;
	},
	proceed: function() {
		this.bubble.destroy();
		this.b_txt.destroy();
		this.step++;
		this.tutDirections();
	},
	tutDirections: function() {
		switch (this.step){
			case 1:
				this.bubble = this.drawBubble(game.width/2, 140, 725, 52);
				this.b_txt = game.add.text(game.width/2, 142, "First use the RIGHT and LEFT arrow keys to move me around.",
					this.txtStyle);
				break;
			case 2:
				this.bubble = this.drawBubble(game.width/2, 140, 575, 52);
				this.b_txt = game.add.text(game.width/2, 142, "You can also use the UP arrow to make me JUMP!",
					this.txtStyle);
				break;
			case 3:
				let bar = game.add.graphics();
				bar.beginFill(0x232616);
				bar.drawRoundedRect(80, 21, 300, 36, 7);
				bar.endFill();
				bar.beginFill(0x829443);
				bar.drawRect(82, 27, 145, 24);
				bar.endFill();
				let uii = game.add.sprite(16, 8, 'leaf_ico');
				uii.animations.add('idle', [0, 1], 2, true);
				uii.animations.play('idle');
				this.bubble = this.drawBubble(575, 140, 425, 96);
				this.b_txt = game.add.text(575, 142,
					"On the top left of the screen,\nyou'll be able to see HEALTH BAR.\n\n          > SPACEBAR to continue",
					this.txtStyle);
				this.tut_sprite = game.add.sprite(395, 67, 'arrow');
				this.tut_sprite.anchor.set(0.5);
				this.tut_sprite.angle = -142;
				break;
			case 4:
				this.bubble = this.drawBubble(575, 140, 425, 96);
				this.b_txt = game.add.text(575, 142,
					"This health bar works like a life.\nYou need to balance it well.\n\n          > SPACEBAR to continue",
					this.txtStyle);
				break;
			case 5:
				this.tut_sprite.x = game.width - 162;
				this.tut_sprite.angle = -36;
				let st = game.add.sprite(game.width-128, 16, 'star');
				st.scale.setTo(1.5, 1.5);
				this.tut_score = game.add.text(game.width - 78, 16, '1', this.txtStyle);
				this.tut_score.fill = '#fff';
				this.tut_score.strokeThickness = 5;
				this.tut_score.fontSize = '32px';
				this.bubble = this.drawBubble(game.width/2, 140, 570, 76);
				this.b_txt = game.add.text(game.width/2, 142,
					"To move on, you need to collect certain items.\n\n                       > SPACEBAR to continue", this.txtStyle);
				break;
			case 6:
				this.bubble = this.drawBubble(game.width/2 + 64, 140, 440, 76);
				this.b_txt = game.add.text(game.width/2 + 64, 142,
					"The number shows how many are left.\n\n            > SPACEBAR to continue", this.txtStyle);
				break;
			case 7:
				this.tut_sprite.destroy();
				this.bubble = this.drawBubble(game.width/2, 140, 510, 52);
				this.b_txt = game.add.text(game.width/2, 142,
					"Lets try to collect the star right now.", this.txtStyle);
				this.tut_sprite = game.add.sprite(game.width/2 + 120, game.height - 100, 'star');
				game.physics.arcade.enable(this.tut_sprite);
				this.tut_sprite.body.collideWorldBounds = true;
				this.tut_sprite.body.gravity.y = 150;
				this.tut_sprite.body.bounce.y = 0.7;
				break;
			case 8:
				this.bubble = this.drawBubble(game.width/2, 140, 710, 76);
				this.b_txt = game.add.text(game.width/2, 142,
					"Now you can move on to the actual game! Congratulations!\n\n                               > SPACEBAR to continue", this.txtStyle);
				break;
			case 9:
				this.bubble = this.drawBubble(game.width/2, 140, 580, 52);
				this.b_txt = game.add.text(game.width/2, 142,
					"You can leave this area by\nwalking towards the right side of the screen.", this.txtStyle);
				break;
			case 10:
				this.bubble = this.drawBubble(game.width/2, 140, 670, 108);
				this.b_txt = game.add.text(game.width/2, 142,
					"On the side note, in the actual game world\nyou might need to defend yourself.\n\nIn such cases, just remember to press SPACEBAR", this.txtStyle);
				game.time.events.add(5000, this.moveOn, this);
				break;
		}
		this.b_txt.anchor.set(0.5);
	},
	collectStar: function(player, star) {
		star.destroy();
		this.tut_score.text = '0';
		this.proceed();
	},
	moveOn: function() {
		BGM[3].stop();
		someShit.progress = 1;
		localStorage.setItem('someShit', JSON.stringify(someShit));
		game.state.start('menu');
	}
}
