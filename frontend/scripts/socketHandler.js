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
  /*
  if (!data.status) return;
  console.log(data);
  // Extract start and end airports
  const startAirport = ALL_AIRPORTS[data.start];
  const endAirport = ALL_AIRPORTS[data.destination];

  // Convert coordinates to percentage positions on the map
  const startPoint = coordinatesToPercent(startAirport.lat, startAirport.lng);
  const endPoint = coordinatesToPercent(endAirport.lat, endAirport.lng);

  // Select the game map
  const map = document.querySelector(".game-map");
  if (map) {
    const appendToThis = map.querySelector("div");
    if (appendToThis) {
      // Create the airplane image
      const img = document.createElement("img");
      img.src = "../assets/airplane-icon.jpg"; // Ensure this path is correct
      img.alt = "airplane";
      img.width = 50; // Adjust the width of the airplane image
      img.classList.add("plane-image");

      // Set the initial position of the image based on start point
      img.style.position = "absolute";
      appendToThis.appendChild(img);

      img.style.transform = `translateX(calc(${startPoint.x} - 1rem)) translateY(calc(${startPoint.y} - 1rem))`;
      img.style.transition = `transform 1s ease-in-out`;
      img.style.transform = `translateX(calc(${endPoint.x} - 1rem)) translateY(calc(${endPoint.y} - 1rem))`;
      console.log(img);
    } else {
      console.error("No div found inside .game-map");
    }
  } else {
    console.error("No element with class 'game-map' found.");
    }*/
});

export { sendKey, purchaseAirport, sendAirplane, upgradeAirport };
