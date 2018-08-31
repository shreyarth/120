var credit = function() {
	this.credLines;
};

credit.prototype = {
	create: function() {
		if (!BGM[4].isPlaying)
			BGM[4].play();
		game.world.setBounds(0, 0, game.width, game.height);

		// Define lines thats going to be printed out for credits
		let style = {font: 'Press Start 2P', fontSize: '16px', fill: '#fff'};
		let linesArr = [
			"ART & SOUND ENGINEERING",
			"ANTHONY MENDOZA MEDINA",
			"","",
			"PROGRAMMING & KINDA SOUND ENGINEERING",
			"SUNG BAEK aka PHOTOSHOP EXPERT",
			"","",
			"PROGRAMMING & VEGETARIAN",
			"SHREYARTH BHATT",
			"","",
			"PROGRAMMING & UI & CURRENTLY WRITING THIS",
			"HANEUL JUNG",
			"", "", "", "", "","","",
			"Special Thanks To",
			"SUNG \"Good cop and bad cop\"",
			"HANEUL \"C8H10N4O2, R3COH, C12H22O11\"",
			"","","","","",
			"No animal was harmed", "in the making of this shit game.",
			"Except for these developers."
		];

		this.credLines = game.add.group();
		let tt = this.credLines.create(game.world.centerX, game.height + 216, 'title');
		tt.anchor.setTo(0.5);
		for (let i = 0; i < linesArr.length; i++){
			if (devMode)	console.log(i+" "+linesArr[i]);
			let line = game.add.text(game.world.centerX, game.height + 516 + 23 * i, linesArr[i], style);
			line.anchor.set(0.5);
			if (i == 31)	line.fill = 'red';
			this.credLines.add(line);
		}
		tt = this.credLines.create(game.world.centerX, game.height * 3.5, 'team_logo');
		tt.anchor.setTo(0.5);
		this.credLines.add(tt);
		tt = this.credLines.create(game.world.centerX, game.height * 4.5 - 25, 'toilet');
		tt.anchor.setTo(0.5);
		tt.tint = 0xffc600;
		this.credLines.add(tt);
		tt = game.add.text(game.world.centerX, game.height * 4.5 + 36, "Thank You for Playing", style);
		tt.anchor.setTo(0.5);
		this.credLines.add(tt);
		game.add.tween(this.credLines).to({y: game.height * -4}, 40000, Phaser.Easing.Linear.In, true);

		// skip
		let txt = game.add.text(500, 570, 'Press Spacebar to Exit', style);
		txt.alpha = 0.5;
		txt.fontSize = '12px';
	},
	moveOn: function(){
	//c3.2
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cut3_2');
		logo.anchor.set(0.5);
		logo.alpha = 0;
		game.add.tween(logo).to({alpha: 1}, 5000, Phaser.Easing.Linear.None, true, 0, 0, true);

		game.time.events.add(8000, this.moveOn2, this);
	},
	moveOn2: function() {
		game.state.start('boss');
	},
	update: function(){
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			game.state.start('boss');
		}
	}
}