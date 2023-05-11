// Draws cave no movement.
// For intersection left boundary = -60, right boundary = -120

export default class Cave {
  constructor(gameWidth, gameHeight, plotX) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById("caveImage");
    this.x = plotX;
    this.y = 470;
    this.width = 129;
    this.height = 152;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
