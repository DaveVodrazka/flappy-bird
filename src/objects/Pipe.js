import { CANVAS_PROPERTIES, PIPE, PLAYER } from "../constants.js";
import { isColliding, getPipeY } from "../utils.js";

export class Pipe {
  constructor(context, player, x) {
    this.x = x;
    this.y = getPipeY();
    this.velX = PIPE.SPEED;
    this.context = context;
    this.player = player;
    this.currentlyColliding = false;
    this.hasScored = false;
  }

  reset(x) {
    this.x = x;
    this.y = getPipeY();
  }

  collision() {
    if (isColliding(this.player.x, this.player.y, this.x, this.y) && !this.currentlyColliding) {
      this.currentlyColliding = true;
      window.dispatchEvent(new CustomEvent("game-over"));
    }
  }

  check() {
    this.collision();
    // passed the player
    if (this.x < PLAYER.INITITAL_X - PIPE.WIDTH - PLAYER.SIZE && !this.hasScored) {
      window.dispatchEvent(new CustomEvent("point"));
      this.hasScored = true;
    }
    // out of the board
    if (this.x < -PIPE.WIDTH) {
      this.hasScored = false;
      this.currentlyColliding = false;
      this.x = CANVAS_PROPERTIES.WIDTH + PIPE.WIDTH;
      this.y = getPipeY();
    }
  }

  show() {
    this.context.fillStyle = PIPE.COLOR;
    this.context.fillRect(this.x, this.y, PIPE.WIDTH, CANVAS_PROPERTIES.HEIGHT);
    this.context.fillRect(this.x, this.y - CANVAS_PROPERTIES.HEIGHT - PIPE.HOLE_SIZE, PIPE.WIDTH, CANVAS_PROPERTIES.HEIGHT);
  }

  update() {
    this.x += this.velX;
    this.check();
  }
}
