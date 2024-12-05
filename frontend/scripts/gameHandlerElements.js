const createHeader = () => {
  // Header missä näkyy pelaajan tilanne (raha etc)
  const gameHeader = document.createElement("header");
  gameHeader.classList.add("game-header");

  // Pelaajan raha
  const playerMoneySpan = document.createElement("span");
  playerMoneySpan.classList.add("game-header-money");
  playerMoneySpan.id = "player-money-counter";
  playerMoneySpan.textContent = "1000.00$";

  // Pelaajan co2 päästöt
  const playerCo2Span = document.createElement("span");
  playerCo2Span.classList.add("game-header-co2");
  playerCo2Span.id = "player-co2-counter";
  playerCo2Span.textContent = "150000kg";

  // Lisää elementit headeriin
  gameHeader.appendChild(playerMoneySpan);
  gameHeader.appendChild(playerCo2Span);

  return gameHeader;
};

const createSideMenu = () => {
  const sideMenu = document.createElement("div");
  sideMenu.classList.add("game-sidemenu");
  sideMenu.textContent = "Select airport";

  return sideMenu;
};

const createMap = () => {
  const gameMapContainer = document.createElement("div");
  gameMapContainer.classList.add("game-map");

  const gameMap = document.createElement("div");

  const gameMapImage = document.createElement("img");
  gameMapImage.src = "/assets/world_map.png";
  drawPointsOnMap(gameMap, [
    [60.3179, 24.9596],
    [51.468, 0.4551],
    [-33.3898, -70.7944],
    [33.9422, -118.4036],
    [0, 0],
  ]);

  gameMap.appendChild(gameMapImage);
  gameMapContainer.appendChild(gameMap);

  return gameMapContainer;
};

const drawPointsOnMap = (mapWrapper, coordinates) => {
  if (coordinates.length == 0)
    return console.error("Coordinates is array empty");
  for (const x of coordinates) {
    /* Tarkistus jos jokin kordinaatti puuttuu etc */
    if (
      (!x[0] && typeof x[0] !== "number") ||
      (!x[1] && typeof x[1] !== "number")
    ) {
      console.error(`Invalid coordinates X: "${x[0]}", Y: "${x[1]}"`);
      continue;
    }

    const mapButton = document.createElement("button");
    mapButton.classList.add("game-map-button");

    const point = coordinatesToPercent(x[0], x[1]);
    mapButton.style.left = `calc(${point.x} - 4px)`;
    mapButton.style.top = `calc(${point.y} - 4px)`;

    mapWrapper.appendChild(mapButton);
  }
};

const coordinatesToPercent = (lat, lng) => {
  /* vähä oudot arvot ku tää ei oo mikään yleinen kartta projektio. Nämä on silti suhtkoht OK */
  const x =
    (100 / 2 + 100 / (290 / lng)) * Math.cos(34 * (Math.PI / 180)) + "%";
  const y =
    (100 / 2 - 100 / (160 / lat)) / Math.cos(30 * (Math.PI / 180)) + "%";
  return { x, y };
};

export { createHeader, createSideMenu, createMap, drawPointsOnMap };
