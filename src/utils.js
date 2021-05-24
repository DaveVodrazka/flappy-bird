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

export const composeData = (playerData, pipeOneData, pipeTwoData) => {
  let currentPipe = null;

  if (pipeOneData.x < playerData.x) {
    currentPipe = pipeTwoData;
  } else if (pipeTwoData.x < playerData.x) {
    currentPipe = pipeOneData;
  } else if (pipeOneData.x < pipeTwoData.x) {
    currentPipe = pipeOneData;
  } else {
    currentPipe = pipeTwoData;
  }
  
  return {
    distance: currentPipe.x - playerData.x,
    height: playerData.y,
    velocity: playerData.velY,
    bottomPipe: currentPipe.y,
    topPipe: currentPipe.y - PIPE.HOLE_SIZE,
  }
};
