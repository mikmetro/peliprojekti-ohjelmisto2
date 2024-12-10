import { API_URL } from "./constants.js";

const ALL_AIRPORTS = await fetch(`${API_URL}/game/airports`).then((r) =>
  r.json(),
);

const ALL_UPGRADES = await fetch(`${API_URL}/game/upgrades`).then((r) =>
  r.json(),
);

export { ALL_AIRPORTS, ALL_UPGRADES };
