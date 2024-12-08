import { ALL_AIRPORTS } from "./preloadAssets.js";

const displayShop = (icaoCode) => {
  const sideMenu = document.querySelector(".game-sidemenu");
  sideMenu.innerHTML = "";

  const contents = purchaseMenuElements(icaoCode); // Testi funktio, myöhemmin pitää lisää tarkastukset

  sideMenu.append(...contents);
};

const purchaseMenuElements = (icaoCode) => {
  const titleSpan = document.createElement("span");
  titleSpan.textContent = `${ALL_AIRPORTS[icaoCode].name} Airport`;

  const purchaseButton = document.createElement("button");
  purchaseButton.textContent = "Purchase";
  purchaseButton.classList.add("game-sidemenu-purchase");

  return [titleSpan, purchaseButton];
};

const upgradeMenuElements = (icaoCode) => {
  const titleSpan = document.createElement("span");
  titleSpan.textContent = `${ALL_AIRPORTS[icaoCode].name} Airport`;

  const upgradesWrapper = document.createElement("div");
  upgradesWrapper.classList.add("game-sidemenu-upgrades");

  // --- Väliaikanen testi miltä päivitys menu näyttää ---
  const buttonNames = ["Income", "Environmentalist", "Security"];
  for (let i = 0; i < 3; i++) {
    const upgradeCard = document.createElement("div");
    upgradeCard.classList.add("game-sidemenu-upgrade");

    const upgradeTitle = document.createElement("span");
    upgradeTitle.textContent = `${buttonNames[i]} Upgrade`;

    const upgradeButton = document.createElement("button");
    upgradeButton.textContent = "Purchase";
    upgradeButton.classList.add("game-sidemenu-purchase");

    upgradeCard.append(upgradeTitle, upgradeButton);

    upgradesWrapper.appendChild(upgradeCard);
  }
  // --- Väliaikanen testi koodi loppu tähän ---

  return [titleSpan, upgradesWrapper];
};

const purchaseAirport = (icaoCode) => {};

const upgradeAirport = (icaoCode, upgrade) => {};

export { displayShop };
