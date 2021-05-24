import {
  CANVAS_PROPERTIES,
  PIPE,
  PLAYER,
  STARTING_OFFSET,
} from "../constants.js";
import { isColliding, getPipeY } from "../utils.js";

export class Pipe {
  constructor(context, player, x) {
    this.initialX = x + STARTING_OFFSET;
    this.startingX = CANVAS_PROPERTIES.WIDTH + PIPE.WIDTH;
    this.x = this.initialX + STARTING_OFFSET;
    this.y = getPipeY();
    this.velX = 0;
    this.context = context;
    this.player = player;
    this.currentlyColliding = false;
    this.hasScored = false;
  }

  reset(goToStart) {
    if (goToStart) {
      this.x = this.startingX;
    } else {
      this.x = this.initialX;
    }
    this.y = getPipeY();
    this.hasScored = false;
    this.currentlyColliding = false;
  }

  pause() {
    this.velX = 0;
  }

  play() {
    this.velX = PIPE.SPEED;
  }

  collision() {
    if (
      isColliding(this.player.x, this.player.y, this.x, this.y) &&
      !this.currentlyColliding
    ) {
      this.currentlyColliding = true;
      window.dispatchEvent(new CustomEvent("game-over"));
    }
  }

  check() {
    this.collision();
    // passed the player
    if (
      this.x < PLAYER.INITITAL_X - PIPE.WIDTH - PLAYER.SIZE &&
      !this.hasScored
    ) {
      window.dispatchEvent(new CustomEvent("point"));
      this.hasScored = true;
    }
    // out of the board
    if (this.x < -PIPE.WIDTH) {
      this.reset(true);
    }
  }

  show() {
    this.context.fillStyle = PIPE.COLOR;
    this.context.fillRect(this.x, this.y, PIPE.WIDTH, CANVAS_PROPERTIES.HEIGHT);
    this.context.fillRect(
      this.x,
      this.y - CANVAS_PROPERTIES.HEIGHT - PIPE.HOLE_SIZE,
      PIPE.WIDTH,
      CANVAS_PROPERTIES.HEIGHT
    );
  }

  update() {
    this.x += this.velX;
    this.check();
  }
}
