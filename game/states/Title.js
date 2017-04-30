class Title extends Phaser.State {
  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#cecece';
    this.circle = new Phaser.Circle(this.game.world.centerX, 100, 64);
    this.t = 0;
  }
  update() {
    this.t += 0.15;
    this.circle.x = this.game.world.centerX + Math.sin(this.t)*50;
  }
  render() {
    this.game.debug.geom(this.circle, '#cfffff');
  }
}

module.exports = Title;
