var menu = function() {
	// Global state variables
	this.menu = ['start', 'settings', 'exit'];
	this.mCount = 0;
	this.select;
	this.music;
}

menu.prototype = {
	preload: function() {
		game.load.path = 'assets/';
		game.load.image('player', 'img/player.png');
		game.load.image('poo', 'img/poo.png');
		game.load.image('platform', 'img/platform.png');
		game.load.image('star', 'img/star.png');
		game.load.image('enemy', 'img/enemy.png');
		game.load.image('turd', 'img/turd.png');
		game.load.image('porter', 'img/porter.png');
		game.load.image('heller', 'img/HellerDr.png');
		game.load.image('bcar', 'img/blackCar.png');
		game.load.image('ycar', 'img/yellowCar.png');
		game.load.image('poosplat', 'img/shit.png');
		game.load.image('bloodsplat', 'img/blood.png');
		game.load.image('bus', 'img/bus.png');

		//sounds
		game.load.audio('fart', 'audio/fart.mp3');
		game.load.audio('rasp', 'audio/Rasp.mp3');
		game.load.audio('turkey', 'audio/turkey.mp3');
		game.load.audio('menumusic', 'audio/blocks.wav');
		// Call menu assets
	},
	create: function() {
		// Asset implementaion
		game.stage.backgroundColor = bgcolor;
		this.music = game.add.audio('menumusic', 0.5);
		this.music.play();
		
		let style = {font: 'Helvetica', fontSize: '24px', fill: '#fff'};
		let playText = game.add.text(game.world.centerX, game.height*.3,
		'				To shit or not to shit...\nPush spacebar to continue', style);
		playText.anchor.setTo(0.5);

		playText = game.add.text(game.world.centerX, game.height*.6, 'Start', style);
		playText.anchor.setTo(0.5);

		let str;
		if (noset)
			str = 'Settings (there is no settings)';
		else
			str = 'NADA';
		playText = game.add.text(game.world.centerX, game.height*.65, str, style);
		playText.anchor.setTo(0.5);
		playText = game.add.text(game.world.centerX, game.height*.71, 'Exit (Alt + F4)', style);
		playText.anchor.setTo(0.5);

		this.select = this.drawMark(game.world.centerX-50, game.height*.6-5);
	},
	drawMark: function(x, y) {
		let obj = null;

		// create primitive
		let g = game.add.graphics();
		g.beginFill(0xffffff);
		g.drawCircle(x, y, 15);	// Starting point, radius
		g.endFill();

		// transform primitive into sprite and destroy primitive
		obj = game.add.sprite(x, y, g.generateTexture());
		obj.anchor.set(0.5, 0.5);
		g.destroy();

		return obj;
	},
	update: function() {
		// Update function
		// This is test function for state check
		this.selection();
		this.checkInput();
	},
	checkInput: function() {
		// Input function (menu selction)
		// Highlight the selected section (or any other indicator to show selected)
		if (game.input.keyboard.justPressed(Phaser.Keyboard.DOWN)) {
			this.mCount++;
			console.log(this.mCount);
		}
		if (game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
			this.mCount--;
			console.log(this.mCount);
		}
		if (this.mCount < 0)
			this.mCount = 0;
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			switch (this.mCount%3) {
				case 0:
					game.state.start('play');
					this.music.stop();
					break;
				case 1:
					if (noset)
						game.state.start('setting');
					break;
				case 2:
					game.state.start('end');
					break;
			}
		}
	},
	selection: function() {
		this.select.destroy();
		switch (this.mCount%3) {
				case 0:
					this.select = this.drawMark(game.world.centerX-50, game.height*.6);
					break;
				case 1:
					if (noset)
						this.select = this.drawMark(game.world.centerX-180, game.height*.65);
					else
						this.select = this.drawMark(game.world.centerX-55, game.height*.65);
					break;
				case 2:
					this.select = this.drawMark(game.world.centerX-90, game.height*.71);
					break;
		}
	},
	render: function() {
		game.debug.text('Arrow keys to select, SPACECBAR to select', 32, 32, 'yellow');
	}
}
