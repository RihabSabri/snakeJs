import {
  headPosition,
  Intersection,
  update as updateSnake,
  draw as drawSnake,
  snakeSpeed,
} from "./snake.js";

import { update as updateSnack, draw as drawSnack } from "./food.js";
let lastRenderTime = 0;
let death = false;
const gameBoard = document.getElementById("snake-game");
const mainFrame = (currentTime) => {
  if (death) {
    if (confirm("Oops you lost, hit OK to replay")) {
      window.location = "/";
    }
    return;
  }
  window.requestAnimationFrame(mainFrame);
  const secondSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondSinceLastRender < 1 / snakeSpeed) return;
  lastRenderTime = currentTime;

  update();
  draw();
};

window.requestAnimationFrame(mainFrame);

const update = () => {
  updateSnake();
  updateSnack();
  gameOver();
};

const draw = () => {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawSnack(gameBoard);
};

const gameOver = () => {
  death = outsideGrid(headPosition()) || Intersection();
};

const outsideGrid = (position) => {
  return position.x < 1 || position.x > 21 || position.y < 1 || position.y > 21;
};
