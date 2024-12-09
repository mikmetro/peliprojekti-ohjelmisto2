import { API_URL } from "./constants.js";
import { ALL_AIRPORTS } from "./preloadAssets.js";
import { sendAirplane } from "./socketHandler.js";

let playerHandler;

class Player {
  constructor(key, money, co_level, airports) {
    this.key = key;
    this.money = money;
    this.co_level = co_level;
    this.airports = airports;
  }

  getKey() {
    return this.key;
  }

  getMoney() {
    return this.money;
  }

  getCoLevel() {
    return this.co_level;
  }

  getAirports() {
    return this.airports;
  }

  renderData() {
    const moneyDisplay = document.getElementById("player-money-counter");
    const co2Display = document.getElementById("player-co2-counter");
    moneyDisplay.textContent = `${this.money.toFixed(2)}$`;
    co2Display.textContent = `${this.co_level}kg`;
  }

  renderAirports() {
    for (const i of Object.keys(ALL_AIRPORTS)) {
      if (Object.keys(this.airports).includes(i)) {
        document.getElementById(i).classList.add("owned");
      } else if (ALL_AIRPORTS[i].price > this.money) {
        document.getElementById(i).classList.add("unavailable");
      } else {
        document.getElementById(i).classList.add("available");
      }
    }
  }

  updateValues(values) {
    if ("money" in values) this.money = values.money;
    if ("co_level" in values) this.co_level = values.co_level;
    if ("airports" in values) this.airports = values.airports;
  }

  sendAirplanes() {
    for (const i of Object.keys(this.airports)) {
      sendAirplane(i);
    }
  }
}

const loadPlayer = async (key) => {
  const response = await fetch(`${API_URL}/user/fetch/${key}`);
  const data = await response.json();

  if (!data.status) return null;

  playerHandler = new Player(key, data.money, data.co_level, data.airports);
};

const createPlayer = async () => {
  const response = await fetch(`${API_URL}/user/create`);
  const data = await response.json();

  const userKey = data.id;
  if (!userKey) return null;

  return loadPlayer(userKey);
};

export { createPlayer, loadPlayer, playerHandler };
