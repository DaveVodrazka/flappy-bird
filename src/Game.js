import {
  CANVAS_PROPERTIES,
  CONTAINER_ID,
  INTERVAL,
  PIPE,
  STARTING_OFFSET,
} from "./constants.js";
import { Pipe } from "./objects/Pipe.js";
import { Player } from "./objects/Player.js";
import { ScoreBoard } from "./objects/ScoreBoard.js";
import { composeData } from "./utils.js";

export class Game {
  constructor() {
    this.context = this.createCanvas();
    this.player = new Player(this.context);
    this.pipe1 = new Pipe(this.context, this.player, CANVAS_PROPERTIES.WIDTH);
    this.pipe2 = new Pipe(
      this.context,
      this.player,
      CANVAS_PROPERTIES.WIDTH * 1.5 + PIPE.WIDTH
    );
    this.scoreBoard = new ScoreBoard(this.context);
    this.score = 0;
    this.topScore = 0;
    this.paused = true;
    this.init();
  }

  createCanvas() {
    const containerElement = document.getElementById(CONTAINER_ID);
    if (!containerElement) {
      throw Error("Failed to get container element");
    }

    // remove content in case of restarting game
    containerElement.innerHTML = "";

    const canvas = document.createElement("canvas");
    canvas.id = CANVAS_PROPERTIES.ID;
    canvas.width = CANVAS_PROPERTIES.WIDTH;
    canvas.height = CANVAS_PROPERTIES.HEIGHT;
    containerElement.appendChild(canvas);

    return canvas.getContext("2d");
  }

  restart() {
    this.player.reset();
    this.pipe1.reset();
    this.pipe2.reset();
  }

  draw() {
    this.player.update();
    this.player.show();
    this.pipe1.update();
    this.pipe1.show();
    this.pipe2.update();
    this.pipe2.show();
    this.scoreBoard.show();

    const playerData = this.player.data;
    const pipeOneData = this.pipe1.data;
    const pipeTwoData = this.pipe2.data;

    const data = composeData(playerData, pipeOneData, pipeTwoData);
  }

  updateScore(restart) {
    if (restart) {
      this.score = 0;
    } else {
      this.score++;
    }
    this.scoreBoard.update(this.score);
  }

  pause() {
    this.paused = true;
    this.player.pause();
    this.pipe1.pause();
    this.pipe2.pause();
  }

  play() {
    this.player.play();
    this.pipe1.play();
    this.pipe2.play();
    // set score to 0 at the start of new game
    this.updateScore(true);
    this.paused = false;
  }

  init() {
    window.addEventListener("keypress", (event) => {
      if (event.code === "Space") {
        if (this.paused) {
          this.play();
        }
        this.player.flap();
      }
    });
    window.addEventListener("game-over", () => {
      console.log("Game over, your score is ", this.score);
      this.pause();
      if (this.score > this.topScore) {
        this.topScore = this.score;
        this.scoreBoard.updateTopScore(this.topScore);
      }
      this.restart();
    });
    window.addEventListener("point", () => {
      this.updateScore();
    });

    setInterval(() => {
      this.context.clearRect(
        0,
        0,
        CANVAS_PROPERTIES.WIDTH,
        CANVAS_PROPERTIES.HEIGHT
      );
      this.draw();
    }, INTERVAL);
  }
}
