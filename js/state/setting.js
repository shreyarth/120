var setting = function() {
	// state global var
	this.select;
	this.mCount = 1;
}
setting.prototype = {
	create: function() {
		game.stage.backgroundColor = bgcolor;

		let style = {font: 'Helvetica', fontSize: '24px', fill: '#fff'};
		if (bgcolor == "#facade"){
			let playText = game.add.text(game.world.centerX, game.height*.3, 'What? You want to change the bgcolor again?', style);
			playText.anchor.set(0.5);
			playText = game.add.text(game.world.centerX, game.height*.35, 'You are making me work too much. I\'m done here.', style);
			playText.anchor.set(0.5);
			noset = false;

			playText = game.add.text(game.world.centerX, game.height*.5, 'SPACEBAR to K', style);
			playText.anchor.set(0.5);
		}
		else {
			let style = {font: 'Helvetica', fontSize: '24px', fill: '#fff'};
			let playText = game.add.text(game.world.centerX, game.height*.3, ':/ Have not much to offer but we can pretty up the bgcolor', style);
			playText.anchor.set(0.5);

			playText = game.add.text(game.world.centerX, game.height*.35, 'Do you want to change background color?', style);
			playText.anchor.set(0.5);

			playText = game.add.text(game.world.centerX, game.height*.5, 'YES										NO', style);
			playText.anchor.set(0.5);

			this.select = this.drawMark(game.world.centerX+25, game.height*.5);
		}
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
		if (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT))
			this.mCount = 1;
		if (game.input.keyboard.justPressed(Phaser.Keyboard.LEFT))
			this.mCount = 0;

		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			switch (this.mCount%2) {
				case 0:
					bgcolor = "#facade"
					break;
				case 1:
					break;
			}
			game.state.start('menu');
		}
	},
	selection: function() {
		this.select.destroy();
		switch (this.mCount%2) {
				case 0:
					this.select = this.drawMark(game.world.centerX-100, game.height*.5);
					break;
				case 1:
					this.select = this.drawMark(game.world.centerX+25, game.height*.5);
					break;
		}
	}
}

