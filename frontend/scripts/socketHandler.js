import { SOCKET_URL } from "./constants.js";
import { playerHandler } from "./playerDataHandler.js";

const socket = io(SOCKET_URL);

const sendKey = () => {
  const userKey = localStorage.getItem("currentKey");
  if (userKey) socket.emit("set_key", userKey);
};

const purchaseAirport = (icaoCode) => {
  socket.emit("purchase", { id: playerHandler.getKey(), airport_id: icaoCode });
};

const sendAirplane = (icaoCode) => {
  socket.emit("send", { id: playerHandler.getKey(), icao: icaoCode });
};

socket.on("purchase_response", (data) => {
  if (!data.status) return;
  playerHandler.updateValues(data.new_user_data);
  playerHandler.renderData();
  playerHandler.renderAirports();
});

socket.on("airplane_event", (data) => {
  console.log(data);
});

export { sendKey, purchaseAirport, sendAirplane };
