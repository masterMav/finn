  // Draws player, controls movement: walk & jump.
  
  export default class Player {
    constructor(gameWidth, gameHeight, pX, pY) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 128;
      this.height = 128;
      this.x = pX;
      this.y = pY;
      this.image = document.getElementById("playerImage");
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 7;
      this.speed = 0;
      this.vy = 0;
      this.weight = 1;
      this.frameTimer = 0;
      this.fps = 10;
      this.frameInterval = 1000 / this.fps;
    }

    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    update(input, deltaTime) {
      if (input.keys.indexOf("ArrowRight") > -1) {
        if (this.frameTimer > this.frameInterval) {
          if (this.frameX >= this.maxFrame) this.frameX = 0;
          else this.frameX++;
          this.frameTimer = 0;
        } else {
          this.frameTimer += deltaTime;
        }
        this.speed = 5;
      } else if (input.keys.indexOf("ArrowLeft") > -1) {
        this.speed = -5;
      } else if (input.keys.indexOf("ArrowUp") > -1 && this.onGround()) {
        this.vy -= 20;
      } else {
        this.speed = 0;
      }

      // Horizontal Movement
      this.x += this.speed;
      if (this.x < 0) this.x = 0;
      else if (this.x > this.gameWidth - this.width)
        this.x = this.gameWidth - this.width;

      // Vertical Movement
      this.y += this.vy;
      if (!this.onGround()) {
        this.vy += this.weight;
      } else {
        this.vy = 0;
      }
      if (this.y > this.gameHeight - this.height)
        this.y = this.gameHeight - this.height;
    }

    onGround() {
      return this.y >= this.gameHeight - this.height;
    }
  }