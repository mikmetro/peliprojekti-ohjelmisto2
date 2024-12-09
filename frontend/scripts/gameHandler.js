import {
  createHeader,
  createMap,
  createSideMenu,
  drawPointsOnMap,
} from "./gameHandlerElements.js";
import { playerHandler } from "./playerDataHandler.js";

const gameHandler = () => {
  startGame();
  playerHandler.renderData();
  playerHandler.renderAirports();
  playerHandler.sendAirplanes();
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
