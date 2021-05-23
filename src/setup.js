import { CANVAS_PROPERTIES, CONTAINER_ID, INTERVAL, PIPE, STARTING_OFFSET } from "./constants.js";
import { Pipe } from "./objects/Pipe.js";
import { Player } from "./objects/Player.js";

export class Game {
  constructor() {
    this.context = this.createCanvas();
    this.player = new Player(this.context);
    this.pipe1 = new Pipe(this.context, this.player, CANVAS_PROPERTIES.WIDTH);
    this.pipe2 = new Pipe(this.context, this.player, CANVAS_PROPERTIES.WIDTH * 1.5 + PIPE.WIDTH);
    this.score = 0;
    this.init();
  }

  createCanvas() {
    const containerElement = document.getElementById(CONTAINER_ID);
    if (!containerElement) {
      throw Error("Failed to get container element");
    }
  
    // remove content in case of restarting game
    containerElement.innerHTML = '';
  
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

  init() {
    window.addEventListener("keypress", (event) => {
      if (event.code === "Space") {
        this.player.flap();
      }
    });
    window.addEventListener("game-over", () => {
      console.log("Game over, your score is ", this.score);
      this.score = 0;
      this.restart();
    });
    window.addEventListener("point", () => {
      this.score++;
    });

    setInterval(() => {
      this.context.clearRect(0, 0, CANVAS_PROPERTIES.WIDTH, CANVAS_PROPERTIES.HEIGHT);
      this.draw();
    }, INTERVAL);
  }

  draw() {
    this.player.update();
    this.player.show();
    this.pipe1.update();
    this.pipe1.show();
    this.pipe2.update();
    this.pipe2.show();
  };
}
