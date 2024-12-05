import {
  createHeader,
  createMap,
  createSideMenu,
  drawPointsOnMap,
} from "./gameHandlerElements.js";

const gameHandler = () => {
  startGame();
};

const startGame = () => {
  /* Luo pelin elementit */
  const gameContainer = document.createElement("main");
  gameContainer.classList.add("game-container", "background-gradient");

  gameContainer.appendChild(createHeader());
  gameContainer.appendChild(createSideMenu());
  gameContainer.appendChild(createMap());

  document.body.appendChild(gameContainer);
};

export default gameHandler;
