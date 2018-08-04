var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

// Global vars
var star;
var platform;
// Main char
var player;
// Enemy group
var enemy;

// State management
game.state.add('menu', menu);
game.state.add('play', play);
game.state.add('end', end);

// Start from menu screen
// Might need separate loading screen in case asset loading takes time
game.state.start('menu');
