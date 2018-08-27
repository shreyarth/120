var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

// Global vars
//var star;
var keys = [];
var bgcolor = "#000"
var noset = true;
var BGM = [];	// Array to sava all loaded BG's
var SFX = [];	// Array to save all loaded SFX's
const BGVOL = 0.5;
// Main char
var player;
const MAXPOO = 20;
var inPlay2 = false;

// State management
game.state.add('boot', boot);
game.state.add('load', load);
game.state.add('menu', menu);
game.state.add('setting', setting);
game.state.add('play', play);
game.state.add('play2', play2);
game.state.add('boss', boss);
game.state.add('end', end);
game.state.add('tutorial', tutorial);

// Start from menu screen
// Might need separate loading screen in case asset loading takes time
game.state.start('boot');

// Global function for UI
function barUI() {
	let t_ui = game.add.sprite(32, 32, 'poo_ico');
	t_ui.animations.add('idle', [0, 1], 2, true);
	t_ui.animations.play('idle');
	t_ui.fixedToCamera = true;
	t_ui.cameraOffset.setTo(16, 8);
	pooMeter(MAXPOO, 0x000000);
	return pooMeter(player.pooCount, 0x492008);
}

function pooMeter(pooNum, color) {
	let obj = null;
	if (pooNum >= 0){
		// create primitive
		let g = game.add.graphics();
		g.beginFill(color);
		g.drawRect(82, 24, pooNum * 15, 32);	// Starting point, width, height
		g.endFill();

		// transform primitive into sprite and destroy primitive
		obj = game.add.sprite(82, 24, g.generateTexture());
		obj.fixedToCamera = true;
		obj.cameraOffset.setTo(82, 24);
		g.destroy();
	}
	return obj;
}