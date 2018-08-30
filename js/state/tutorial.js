var tutorial = function() {
	this.tplayer;
	this.bubble, this.b_txt, this.txtStyle;
	this.step = 0;
}

tutorial.prototype = {
	create: function() {
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

		let tt = game.add.text(570, 16, "Push ENTER to skip", this.txtStyle);
		tt.fill = '#fff';
		tt.strokeThickness = 3;
	},
	update: function() {
		//to return to game
		if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)){
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
			if (this.step == 2)	this.proceed();		}

		if(this.tplayer.x +100 > game.world.width){
			this.next();
		}

		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			if (this.step == 0)	this.proceed();
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
		if (this.step == 1){
			this.bubble = this.drawBubble(game.width/2, 140, 725, 52);
			this.b_txt = game.add.text(game.width/2, 142, "First use the RIGHT and LEFT arrow keys to move me around.",
				this.txtStyle);
		}
		if (this.step == 2){
			this.bubble = this.drawBubble(game.width/2, 140, 575, 52);
			this.b_txt = game.add.text(game.width/2, 142, "You can also use the UP arrow to make me JUMP!",
				this.txtStyle);
		}
		if (this.step == 3){
			this.bubble = this.drawBubble(game.width/2, 140, 425, 64);
			this.b_txt = game.add.text(game.width/2, 142, "On the top left of the screen,\nyou'll be able to see HEALTH BAR.",
				this.txtStyle);
		}
		this.b_txt.anchor.set(0.5);
	}
	,
	next: function() {
		stext = game.add.text(70,100, "In this world, you have to collect items to move on\nWalk towards the star on the screen",
			{font: 'Helvetica', fontSize: '24px', fill: '#ffffff'});
		game.add.sprite(90,game.world.height -30, 'star');
	}
}
