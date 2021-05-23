import { CANVAS_PROPERTIES, PIPE, PLAYER } from "./constants.js";

export const getPipeY = () => {
  const min = CANVAS_PROPERTIES.HEIGHT / 6 + PIPE.HOLE_SIZE;
  const max = CANVAS_PROPERTIES.HEIGHT * (5 / 6);

  return Math.random() * (max - min) + min;
};

export const isColliding = (playerX, playerY, pipeX, pipeY) => {
  if (pipeX - PLAYER.SIZE <= playerX && pipeX + PIPE.WIDTH > playerX + PLAYER.SIZE && (playerY + PLAYER.SIZE > pipeY || playerY - PLAYER.SIZE < pipeY - PIPE.HOLE_SIZE)) {
    return true;
  } else {
    return false;
  }
};
