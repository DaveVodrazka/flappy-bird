import { CANVAS_PROPERTIES, CONTAINER_ID, INTERVAL, PIPE, STARTING_OFFSET } from "./constants.js";
import { Pipe } from "./objects/Pipe.js";
import { Player } from "./objects/Player.js";

const createCanvas = () => {
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
};

const restart = (player, pipe1, pipe2) => {
  player.reset();
  pipe1.reset(CANVAS_PROPERTIES.WIDTH + STARTING_OFFSET);
  pipe2.reset(CANVAS_PROPERTIES.WIDTH * 1.5 + PIPE.WIDTH + STARTING_OFFSET);
};

const control = (player, pipe1, pipe2) => {
  let score = 0;

  window.addEventListener("keypress", (event) => {
    if (event.code === "Space") {
      player.flap();
    }
  });
  window.addEventListener("game-over", () => {
    console.log("Game over, your score is ", score);
    score = 0;
    restart(player, pipe1, pipe2);
  });
  window.addEventListener("point", () => {
    score++;
  });
};

const draw = (...items) => {
  items.forEach((item) => {
    item.update();
    item.show();
  });
};

export const setup = () => {
  const context = createCanvas();
  const player = new Player(context);
  const pipe1 = new Pipe(context, player, CANVAS_PROPERTIES.WIDTH + STARTING_OFFSET);
  const pipe2 = new Pipe(context, player, CANVAS_PROPERTIES.WIDTH * 1.5 + PIPE.WIDTH + STARTING_OFFSET);

  control(player, pipe1, pipe2);

  setInterval(() => {
    context.clearRect(0, 0, CANVAS_PROPERTIES.WIDTH, CANVAS_PROPERTIES.HEIGHT);
    draw(player, pipe1, pipe2);
  }, INTERVAL);
};
