import { ALL_AIRPORTS } from "./preloadAssets.js";
import { purchaseAirport } from "./socketHandler.js";

const displayShop = (icaoCode) => {
  const sideMenu = document.querySelector(".game-sidemenu");
  sideMenu.innerHTML = "";

  const contents = purchaseMenuElements(icaoCode); // Testi funktio, myöhemmin pitää lisää tarkastukset

  sideMenu.append(...contents);
};

const purchaseMenuElements = (icaoCode) => {
  const titleSpan = document.createElement("span");
  titleSpan.textContent = `Purchase ${ALL_AIRPORTS[icaoCode].name} Airport for ${ALL_AIRPORTS[icaoCode].price.toFixed(2)}$`;

  const purchaseButton = document.createElement("button");
  purchaseButton.textContent = "Purchase";
  purchaseButton.classList.add("game-sidemenu-purchase");

  purchaseButton.addEventListener("click", () => {
    purchaseAirport(icaoCode);
  });

  const cashGenerationWrapper = document.createElement("div");
  cashGenerationWrapper.classList.add(
    "game-sidemenu-detail-wrapper",
    "money-generation",
  );
  const cashGenerationTitle = document.createElement("span");
  cashGenerationTitle.textContent = "Cash Generation";
  const cashGenerationEffect = document.createElement("span");
  cashGenerationEffect.textContent = `${ALL_AIRPORTS[icaoCode].cash_generation}$/flight`;

  cashGenerationWrapper.append(cashGenerationTitle, cashGenerationEffect);

  const co2GenerationWrapper = document.createElement("div");
  co2GenerationWrapper.classList.add(
    "game-sidemenu-detail-wrapper",
    "co2-generation",
  );
  const co2GenerationTitle = document.createElement("span");
  co2GenerationTitle.textContent = "Co2 Generation";
  const co2GenerationEffect = document.createElement("span");
  co2GenerationEffect.textContent = `${ALL_AIRPORTS[icaoCode].co_generation}kg/flight`;

  co2GenerationWrapper.append(co2GenerationTitle, co2GenerationEffect);

  const detailsWrapper = document.createElement("div");
  detailsWrapper.classList.add("game-sidemenu-details");
  detailsWrapper.append(cashGenerationWrapper, co2GenerationWrapper);

  return [titleSpan, purchaseButton, detailsWrapper];
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

export { displayShop };
