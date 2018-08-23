var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

// Global vars
var star;
var keys = [];
var bgcolor = "#895f2b"
var noset = true;
//var platform;
// Main char
var player;
const MAXPOO = 30;
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

// Start from menu screen
// Might need separate loading screen in case asset loading takes time
game.state.start('boot');

