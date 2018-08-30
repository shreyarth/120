var setting = function() {
	// state global var
	this.select;
	this.mCount = 0;
}
setting.prototype = {
	create: function() {
		game.stage.backgroundColor = bgcolor;

		let style = {font: 'Press Start 2P', fontSize: '24px', fill: '#fff'};
		let txt = game.add.text(game.world.centerX, 32, 'SETTINGS', style);
		txt.anchor.set(0.5);

		game.add.text(32, 96, 'Define your skill level//', style);
		txt = game.add.text(58, 136, 'N00b    Standard    Guy Fieri', style);
		txt.fontSize = '16px';

		game.add.text(32, 190, 'isDeveloper//', style);
		txt = game.add.text(58, 230, 'true    false', style);
		txt.fontSize = '16px';

		game.add.text(32, 284, 'Nathan\'s Favorite Color//', style);
		txt = game.add.text(58, 324, 'true    false', style);
		txt.fontSize = '16px';

		txt = game.add.text(480, 500, 'Press space to exit', style);
		txt.anchor.set(0, 0.5);
		txt.fontSize = '16px';
		
		// Initialize thie.select
		this.select = this.drawMark(0, 0);
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
		this.selection();
		this.checkInput();
	},
	checkInput: function() {
		// Input function (menu selction)
		// Highlight the selected section (or any other indicator to show selected)
		if (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT)) {
			if (this.mCount == 0)	playMode++;
			if (this.mCount == 1)	devMode = false;
			if (this.mCount == 2) {
				bgcolor = '#000000';
				game.stage.backgroundColor = bgcolor;
			}
		}
		if (game.input.keyboard.justPressed(Phaser.Keyboard.LEFT)) {
			if (this.mCount == 0)	playMode--;
			if (this.mCount == 1)	devMode = true;
			if (this.mCount == 2) {
				bgcolor = '#facade';
				game.stage.backgroundColor = bgcolor;
			}
		}
		if (game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
			this.mCount--;
		}
		if (game.input.keyboard.justPressed(Phaser.Keyboard.DOWN)) {
			this.mCount++;
		}

		if (playMode < 0)	playMode = 0;
		else if (playMode > 2)	playMode = 2;

		if (this.mCount < 0)	this.mCount = 0;
		else if (this.mCount > 2)	this.mCount = 2;

		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			someShit.mode = playMode;
			someShit.dev = devMode;
			if (bgcolor != '#facade')	someShit.nathan = false;
			else someShit.nathan = true;
			localStorage.setItem('someShit', JSON.stringify(someShit));
			game.state.start('menu');
		}
	},
	selection: function() {
		this.select.destroy();
		if (this.mCount == 0) {
			switch (playMode%3) {
				case 0:
					this.select = this.drawMark(40, 142);
					break;
				case 1:
					this.select = this.drawMark(168, 142);
					break;
				case 2: this.select = this.drawMark(361, 142);
					break;
			}
		}
		if (this.mCount == 1) {
			if (devMode)	this.select = this.drawMark(40, 235);
			else	this.select = this.drawMark(168, 235);
		}
		if (this.mCount == 2) {
			if (bgcolor == '#facade')	this.select = this.drawMark(40, 332);
			else	this.select = this.drawMark(168, 332);
		}
	}
}

