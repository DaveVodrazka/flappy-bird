import { CANVAS_PROPERTIES } from "../constants.js";

export class ScoreBoard {
  constructor(context) {
    this.x = CANVAS_PROPERTIES.WIDTH / 2;
    this.y = CANVAS_PROPERTIES.HEIGHT / 3;
    this.score = 0;
    this.topScore = 0;
    this.context = context;
  }

  show() {
    this.context.font = "48px sans-serif";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillStyle = "white";
    this.context.fillText(this.score, this.x, this.y);
    this.context.font = "30px sans-serif";
    this.context.textAlign = "start";
    this.context.textBaseline = "top";
    this.context.fillText(`topscore: ${this.topScore}`, 10, 10);
  }

  update(score) {
    this.score = score;
  }

  updateTopScore(score) {
    this.topScore = score;
  }
}
