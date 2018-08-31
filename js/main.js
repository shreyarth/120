var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

// Global vars
// Defaults
var keys = [];
var BGM = [];	// Array to sava all loaded BG's
var SFX = [];	// Array to save all loaded SFX's
const BGVOL = 0.5;

// Settings
var bgcolor = "#000"
var MAXPOO = 10000;
var someShit;	// For local data storage
var playMode = 1;	// 0: Easy, 1: Reg, 2: Guy Fieri
var devMode = false;

// Main char
var player;
var inPlay2 = false;

// State management
game.state.add('cut1', cut1);
game.state.add('cut2', cut2);
game.state.add('cut3', cut3);
game.state.add('cut3_5', cut3_5);
game.state.add('cut4', cut4);
game.state.add('cutfinal', cutfinal);
game.state.add('boot', boot);
game.state.add('load', load);
game.state.add('pre', pre);
game.state.add('menu', menu);
game.state.add('setting', setting);
game.state.add('play', play);
game.state.add('play2', play2);
game.state.add('boss', boss);
game.state.add('end', end);
game.state.add('tutorial', tutorial);
 game.state.add('credit', credit);

// Start from menu screen
// Might need separate loading screen in case asset loading takes time
game.state.start('boot');

// Global function for UI
function barUI() {
	// Gauge sprite
	let t_ui = game.add.sprite(79, 10, 'poo_gauge');
	t_ui.fixedToCamera = true;
	t_ui.cameraOffset.setTo(79, 10);
	
	// Icons
	t_ui = game.add.sprite(16, 8, 'boo_ico');
	t_ui.animations.add('idle', [0, 1], 2, true);
	t_ui.animations.play('idle');
	t_ui.fixedToCamera = true;
	t_ui.cameraOffset.setTo(16, 8);
	t_ui = game.add.sprite(390, 8, 'poo_ico');
	t_ui.animations.add('idle', [0, 1], 2, true);
	t_ui.animations.play('idle');
	t_ui.fixedToCamera = true;
	t_ui.cameraOffset.setTo(375, 8);

	// Gauge fill
	t_ui = game.add.sprite(83, 19, 'poo_fill');
	t_ui.fixedToCamera = true;
	t_ui.cameraOffset.setTo(83, 19);
	return t_ui;
}