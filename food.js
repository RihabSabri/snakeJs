import { onSnake, grow } from "./snake.js";

const randomPosition = () => {
  return {
    x: Math.floor(Math.random() * 21) + 1,
    y: Math.floor(Math.random() * 21) + 1,
  };
};
const randomFoodPosition = () => {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomPosition();
  }
  return newFoodPosition;
};

let food = randomFoodPosition();

const growth = 1;

export const update = () => {
  if (onSnake(food)) {
    grow(growth);
    food = randomFoodPosition();
  }
};

export const draw = (gameBoard) => {
  const snackElement = document.createElement("div");
  snackElement.style.gridRowStart = food.y;
  snackElement.style.gridColumnStart = food.x;
  snackElement.classList.add("snack");
  gameBoard.appendChild(snackElement);
};
