var tutorial = function() {
	// state global var
	this.tplayer;
}

tutorial.prototype = {
	create: function() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.backgroundColor = "#1A7209";

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

		var stext = game.add.text(70,100, "    Hi, I'm D and I'm here to teach you how to play the game\nFirst use the RIGHT and LEFT arrow keys to move me around\n        You can also use the UP arrow to make me JUMP!\n      Please walk to the right side of the screen to continue.",
			{font: 'Helvetica', fontSize: '24px', fill: '#ffffff'});

		var text = game.add.text(200, 300, "Push ENTER to skip",{font: 'Helvetica', fontSize: '24px', fill: '#ffffff'});
		
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
		}else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.tplayer.body.velocity.x = 100;
			this.tplayer.animations.play('walk');
			this.tplayer.scale.x = -1;
		}else{
			this.tplayer.body.velocity.x = 0;
			this.tplayer.animations.stop();
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.UP)){
			this.tplayer.body.velocity.y = -400;
		}

		if(this.tplayer.x +100 > game.world.width){
			next();
		}

	}
}
function next(){
	stext = game.add.text(70,100, "In this world, you have to collect items to move on\nWalk towards the star on the screen",
			{font: 'Helvetica', fontSize: '24px', fill: '#ffffff'});
	game.add.sprite(90,game.world.height -30, 'star');
}

