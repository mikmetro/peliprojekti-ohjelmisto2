import { API_URL } from "./constants.js";

class Player {
  constructor(key, money, co_level, airports) {
    this.key = key;
    this.money = money;
    this.co_level = co_level;
    this.airports = airports;
  }

  get key() {
    return this.key;
  }

  get money() {
    return this.money;
  }

  get co_level() {
    return this.co_level;
  }

  get airports() {
    return this.airports;
  }

  renderData() {}
}

const loadPlayer = async (key) => {
  const response = await fetch(`${API_URL}/user/fetch/${key}`);
  const data = await response.json();

  if (!data.status) return null;

  const player = new Player(userKey, data.money, data.co_level, data.airports);

  return player;
};

const createPlayer = async () => {
  const response = await fetch(`${API_URL}/user/create`);
  const data = await response.json();

  const userKey = data.id;
  if (!userKey) return null;

  return loadPlayer(userKey);
};

export { createPlayer, loadPlayer };
