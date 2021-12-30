import { getInputDirection } from "./input.js";
export let snakeSpeed = 2;

let newSegment = 0;
const increaseSpeed = () => {
  if (snakeSpeed < 8) {
    snakeSpeed = snakeSpeed + 2;
    console.log(snakeSpeed);
  }
};
const decreaseSpeed = () => {
  if (snakeSpeed > 2) {
    snakeSpeed = snakeSpeed - 2;
  }
};
document
  .getElementById("increase-btn")
  .addEventListener("click", increaseSpeed);
document
  .getElementById("decrease-btn")
  .addEventListener("click", decreaseSpeed);

const snakeBody = [{ x: 11, y: 11 }];

export const update = () => {
  addSeg();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
};

export const draw = (gameBoard) => {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
};

export const grow = (amount) => {
  newSegment += amount;
};

export const onSnake = (position, { ignoreHead = false } = {}) => {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index == 0) return false;
    return samePosition(segment, position);
  });
};

const samePosition = (p1, p2) => {
  return p1.x === p2.x && p1.y === p2.y;
};

const addSeg = () => {
  for (let i = 0; i < newSegment; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegment = 0;
};

export const headPosition = () => {
  return snakeBody[0];
};

export const Intersection = () => {
  return onSnake(snakeBody[0], { ignoreHead: true });
};
