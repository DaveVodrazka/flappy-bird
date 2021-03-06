import { CANVAS_PROPERTIES, FLAP_SPEED, GRAVITY, PLAYER } from "../constants.js";

export class Player {
  constructor(context) {
    this.x = PLAYER.INITITAL_X;
    this.y = PLAYER.INITIAL_Y;
    this.gravity = 0;
    this.velY = 0;
    this.context = context;
  }

  get data() {
    return {
      x: this.x,
      y: this.y,
      velY: this.velY,
    }
  }

  reset() {
    this.x = PLAYER.INITITAL_X;
    this.y = PLAYER.INITIAL_Y;
    this.velY = 0;
  }

  pause() {
    this.gravity = 0;
  }

  play() {
    this.gravity = GRAVITY;
  }

  check() {
    if (this.y > CANVAS_PROPERTIES.HEIGHT) {
      window.dispatchEvent(new CustomEvent("game-over"));
    }
  }

  show() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, PLAYER.SIZE, 0, 2 * Math.PI);
    this.context.fillStyle = PLAYER.COLOR;
    this.context.fill();
    this.context.closePath();
  }

  flap() {
    if (this.y > 0) {
      this.velY = FLAP_SPEED;
    }
  }

  update() {
    this.velY += this.gravity;
    this.y += this.velY;
    this.check();
  }
}
