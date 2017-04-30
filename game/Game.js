const Title = require('../game/states/Title');
const electron = require('electron');

class Game extends Phaser.Game {
  constructor() {
    const bounds = electron.screen.getPrimaryDisplay().bounds;
    super(bounds.width, bounds.height, Phaser.AUTO, '',
      {}, true);

    this.state.add('Title', Title, false);

    this.state.start('Title');
  }
}

new Game();