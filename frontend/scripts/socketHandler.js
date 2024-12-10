import { SOCKET_URL } from "./constants.js";
import { ALL_AIRPORTS } from "./preloadAssets.js";
import { playerHandler } from "./playerDataHandler.js";
import { coordinatesToPercent } from "./gameHandlerElements.js";

const socket = io(SOCKET_URL);

const sendKey = () => {
  const userKey = localStorage.getItem("currentKey");
  if (userKey) socket.emit("set_key", userKey);
};

const purchaseAirport = (icaoCode) => {
  socket.emit("purchase", { id: playerHandler.getKey(), airport_id: icaoCode });
};

const upgradeAirport = (icaoCode, upgrade) => {
  socket.emit("upgrade", {
    id: playerHandler.getKey(),
    airport_id: icaoCode,
    upgrade: upgrade,
  });
};

const sendAirplane = (icaoCode) => {
  socket.emit("send", { id: playerHandler.getKey(), icao: icaoCode });
};

socket.on("purchase_response", (data) => {
  if (!data.status) return;
  playerHandler.updateAndRender(data.new_user_data);
});

socket.on("upgrade_response", (data) => {
  console.log(data);
  if (!data.status) return;
  playerHandler.updateAndRender(data.new_user_data);
});

socket.on("airplane_event", (data) => {
  playerHandler.updateAndRender(data.new_user_data);
  playerHandler.sendAirplanes();
});

socket.on("send_response", (data) => {
  if (!data.success) return;
  const startAirport = ALL_AIRPORTS[data.start];
  const endAirport = ALL_AIRPORTS[data.destination];

  const startPoint = coordinatesToPercent(startAirport.lat, startAirport.lng);
  const endPoint = coordinatesToPercent(endAirport.lat, endAirport.lng);
});

export { sendKey, purchaseAirport, sendAirplane, upgradeAirport };
