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
			"BGM SOURCES", "",
			"Crusing for Goblins       Mega Hyper Ultrastorm",
			"Kevin MacLeod              Kevin MacLeod",
			"",
			"Townie Loop                   SPY    ",
			"Kevin MacLeod                 Eddy    ",
			"","","",
			"SE SOURCES", "came from these websites", "",
			"Free SFX                 freesfx.co.uk       ", 
			"Freesound                freesound.org       ",
			"Free Sound Effects.com   freesoundeffects.com",
			"", "", "", "", "","","",
			"Special Thanks To", "",
			"NATHAN ALTICE",
			"You might not want to be on this list,",
			"but still we wanted to thank you.", "",
			"MARCELO VIANA NETO",
			"The 'Juciness'! YEAH!", "",
			"NICK JUNIUS",
			"It must been horrible to keep track of our git.",
			"Sorry about spamming your watch notifications.",
			"Now you are free.",
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
			if (i == linesArr.length - 1)	line.fill = 'red';
			this.credLines.add(line);
		}
		tt = game.add.graphics();
		tt.beginFill(0xffffff);
		tt.drawRect(game.world.centerX-52, game.height + 533, 117, 3);
		tt.endFill();
		this.credLines.add(tt);
		tt = game.add.text(game.world.centerX, game.height * 4.7, "This game is made with", style);
		tt.anchor.setTo(0.5);
		this.credLines.add(tt);
		tt = this.credLines.create(game.world.centerX, game.height * 5, 'phaser');
		tt.anchor.setTo(0.5);
		this.credLines.add(tt);
		tt = this.credLines.create(game.world.centerX, game.height * 5.7, 'team_logo');
		tt.anchor.setTo(0.5);
		this.credLines.add(tt);
		tt = this.credLines.create(game.world.centerX, game.height * 6.5 - 25, 'toilet');
		tt.anchor.setTo(0.5);
		tt.tint = 0xffc600;
		this.credLines.add(tt);
		tt = game.add.text(game.world.centerX, game.height * 6.5 + 36, "Thank You for Playing", style);
		tt.anchor.setTo(0.5);
		this.credLines.add(tt);
		game.add.tween(this.credLines).to({y: game.height * -6}, 43000, Phaser.Easing.Linear.In, true);

		// skip
		let txt = game.add.text(500, 570, 'Press Spacebar to Exit', style);
		txt.alpha = 0.5;
		txt.fontSize = '12px';
	},
	update: function(){
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			BGM[4].stop();
			game.state.start('menu');
		}
	}
}