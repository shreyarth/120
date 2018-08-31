var menu = function() {
	// Global state variables
	this.menu = ['start', 'settings', 'exit'];
	this.mCount = 0;
	this.select, this.mAlign;
	this.cont = null;
}

menu.prototype = {
	create: function() {
		// Asset implementaion
		if (someShit && someShit.nathan)	bgcolor = "#facade";
		game.stage.backgroundColor = bgcolor;
		this.mAlign = 180;
		// Takes care of music in case player transitions from game state
		if (BGM[1].isPlaying) BGM[1].stop();
		if (BGM[2].isPlaying) BGM[2].stop();
		if (!BGM[0].isPlaying) BGM[0].play();

		// Initialization based on prevData (or new data)
		if (someShit) {
			this.cont = someShit.progress;
			playMode = someShit.mode;
			devMode = someShit.dev;

		}

		if (playMode == 0)	MAXPOO = 20;
		else if (playMode == 1)	MAXPOO = 10;	// Default setting
		else if (playMode == 2)	MAXPOO = 5;
		
		let tt = game.add.sprite(570, 500, 'poosplat');
		tt.anchor.set(0.5);

		tt = game.add.sprite(game.width/2, 200, 'title');
		tt.anchor.set(0.5);

		game.add.sprite(game.width-110, game.height-120, 'rate_this');

		// Cleared trophy asset
		if (someShit && someShit.cleared)	game.add.sprite(game.width-290, 370, 'tPPr');

		let style = {font: 'Press Start 2P', fontSize: '20px', fill: '#fff'};

		let playText = game.add.text(this.mAlign, game.height*.74, 'START', style);
		playText.anchor.setTo(0.5);
		let str = '';
		if (someShit.progress > 1)	str = 'CONTINUE';
		else	str = '(NO SAVES)';
		playText = game.add.text(this.mAlign, game.height*.80, str, style);
		playText.anchor.setTo(0.5);
		playText = game.add.text(this.mAlign, game.height*.87, 'SETTINGS', style);
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
					game.state.start('cut1');
					BGM[0].stop();
					break;
				case 1:
					if (someShit.progress == 2)	game.state.start('play2');
					if (someShit.progress == 3)	game.state.start('boss');
					BGM[0].stop();
					break;
				case 2:
					game.state.start('setting');
					break;
			}
		}
	},
	selection: function() {
		this.select.destroy();
		switch (this.mCount%3) {
				case 0:
					this.select = this.drawMark(this.mAlign-75, game.height*.73);
					break;
				case 1:
					if (someShit.progress > 1)	this.select = this.drawMark(this.mAlign-100, game.height*.79);
					else	this.select = this.drawMark(this.mAlign-120, game.height*.79);
					break;
				case 2:
					this.select = this.drawMark(this.mAlign-102, game.height*.86);
					break;
		}
	}
}

