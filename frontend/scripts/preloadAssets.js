import { API_URL } from "./constants.js";

const ALL_AIRPORTS = await fetch(`${API_URL}/game/airports`).then((r) =>
  r.json(),
);

export default ALL_AIRPORTS;
