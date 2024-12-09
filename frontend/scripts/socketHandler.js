import { SOCKET_URL } from "./constants.js";

const socket = io(SOCKET_URL);

const sendKey = () => {
  const userKey = localStorage.getItem("currentKey");
  if (userkey) socket.emit("set_key", userKey);
};

socket.on("set_key_response", () => {});

export { sendKey };
