var menu = function() {
	// Global state variables
	this.menu = ['start', 'settings', 'exit'];
	this.mCount = 0;
	this.select;
}

menu.prototype = {
	preload: function() {
		
	},
	create: function() {
		// Asset implementaion
		game.stage.backgroundColor = bgcolor;
		// Takes care of music in case player transitions from game state
		if (BGM[1].isPlaying) BGM[1].stop();
		if (BGM[2].isPlaying) BGM[2].stop();
		if (!BGM[0].isPlaying) BGM[0].play();
		
		let tt = game.add.sprite(570, 500, 'poosplat');
		tt.anchor.set(0.5);

		tt = game.add.sprite(game.width/2, 200, 'title');
		tt.anchor.set(0.5);

		style = {font: 'Press Start 2P', fontSize: '20px', fill: '#fff'};

		let playText = game.add.text(game.world.centerX, game.height*.76, 'Start', style);
		playText.anchor.setTo(0.5);

		let str;
		if (noset)
			str = 'Settings (there is no settings)';
		else
			str = 'NADA';
		playText = game.add.text(game.world.centerX, game.height*.82, str, style);
		playText.anchor.setTo(0.5);
		playText = game.add.text(game.world.centerX, game.height*.88, 'Exit (Alt + F4)', style);
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
					game.state.start('play2');
					BGM[0].stop();
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
					this.select = this.drawMark(game.world.centerX-75, game.height*.75);
					break;
				case 1:
					if (noset)
						this.select = this.drawMark(game.world.centerX-330, game.height*.81);
					else
						this.select = this.drawMark(game.world.centerX-85, game.height*.81);
					break;
				case 2:
					this.select = this.drawMark(game.world.centerX-175, game.height*.87);
					break;
		}
	},
	render: function() {
		game.debug.text('Arrow keys to select, SPACECBAR to select', 32, 32, 'yellow');
	}
}

