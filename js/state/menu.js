var menu = function() {
	// Global state variables
	this.menu = ['start', 'settings', 'exit'];
	this.mCount = 0;
	this.select;
	this.music;
}

menu.prototype = {
	preload: function() {
		
	},
	create: function() {
		// Asset implementaion
		game.stage.backgroundColor = bgcolor;
		if (!this.music || this.music.isPlaying === false) {
			this.music = game.add.audio('menumusic', 0.5, true);
			this.music.play();
		}
		
		style = {font: 'Helvetica', fontSize: '24px', fill: '#fff'};
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
		if (game.input.keyboard.justPressed(Phaser.Keyboard.DOWN))
			this.mCount++;
		if (game.input.keyboard.justPressed(Phaser.Keyboard.UP))
			this.mCount--;

		if (this.mCount < 0)
			this.mCount = 0;
		
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			switch (this.mCount%3) {
				case 0:
<<<<<<< HEAD
=======
					game.state.start('play2');
>>>>>>> 01b47ab856be69be2be7c2cbac1a10cd9b03e4de
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

