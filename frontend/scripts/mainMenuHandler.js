import gameHandler from "./gameHandler.js";
import { API_URL } from "./constants.js";
import { sendKey } from "./socketHandler.js";
import {
  createPlayer,
  loadPlayer,
  playerHandler,
} from "./playerDataHandler.js";

const mainMenuHandler = async () => {
  const menuButtons = document.querySelector(".main-menu-buttons");
  menuButtons
    .querySelector("#start-game")
    .addEventListener("click", async () => {
      const mainMenu = document.querySelector(".main-menu");
      mainMenu.innerHTML = "";

      const createGameText = document.createElement("p");
      createGameText.textContent =
        "This is your key to load your game progress later";

      const userKeyTextBox = document.createElement("p");

      await createPlayer();
      const user_ID_key = playerHandler.getKey();

      const userKeys = JSON.parse(localStorage.getItem("userKeys")) || [];
      userKeys.push(user_ID_key);
      localStorage.setItem("userKeys", JSON.stringify(userKeys));
      localStorage.setItem("currentKey", user_ID_key);

      sendKey();

      userKeyTextBox.textContent = user_ID_key;

      userKeyTextBox.classList.add("main-menu-userkey");

      const continueButton = document.createElement("button");
      continueButton.textContent = "Continue";
      continueButton.classList.add("main-menu-continue");

      const wrapper = document.createElement("div");
      wrapper.classList.add("main-menu-create-game");

      /* Lisää animaatiot */
      const animationElements = [
        createGameText,
        userKeyTextBox,
        continueButton,
      ];
      const animationDelay = 0.2;
      const animationTimelineFunction = "cubic-bezier(.42,0,.58,1)";
      for (const i in animationElements) {
        animationElements[i].style.transform = "translateY(-100vh)";
        animationElements[i].style.animation =
          `main-menu-transition 0.8s ${animationTimelineFunction} ${animationDelay * i}s forwards`;
      }

      /* Lisää elementit DOMiin */

      wrapper.appendChild(createGameText);
      wrapper.appendChild(userKeyTextBox);
      mainMenu.appendChild(wrapper);
      mainMenu.appendChild(continueButton);

      continueButton.addEventListener("click", () => {
        document.body.innerHTML = "";
        gameHandler();
      });
    });

  menuButtons.querySelector("#load-game").addEventListener("click", () => {
    const mainMenu = document.querySelector(".main-menu");
    mainMenu.innerHTML = "";

    const title = document.createElement("span");
    title.textContent = "Latest save";
    title.style.fontSize = "1.5rem";
    title.style.marginBottom = "0.5rem";

    const keyWrapper = document.createElement("div");
    keyWrapper.classList.add("mainmenu-key-wrapper");

    keyWrapper.appendChild(title);

    const latestKey = localStorage.getItem("currentKey");

    const saveWrapper = document.createElement("div");
    saveWrapper.classList.add("mainmenu-save-wrapper", "latest");

    const keySpan = document.createElement("span");
    keySpan.textContent = latestKey;
    const button = document.createElement("button");
    button.textContent = "Load";

    button.addEventListener("click", async () => {
      await loadPlayer(latestKey);
      const user_ID_key = playerHandler.getKey();
      sendKey();
      document.body.innerHTML = "";
      gameHandler();
    });

    saveWrapper.append(keySpan, button);
    keyWrapper.appendChild(saveWrapper);

    const saveKeys = JSON.parse(localStorage.getItem("userKeys"));
    for (const key of saveKeys) {
      const saveWrapper = document.createElement("div");
      saveWrapper.classList.add("mainmenu-save-wrapper");

      const keySpan = document.createElement("span");
      keySpan.textContent = key;
      const button = document.createElement("button");
      button.textContent = "Load";

      button.addEventListener("click", async () => {
        await loadPlayer(key);
        const user_ID_key = playerHandler.getKey();
        sendKey();
        document.body.innerHTML = "";
        gameHandler();
      });

      saveWrapper.append(keySpan, button);
      keyWrapper.appendChild(saveWrapper);
    }

    mainMenu.appendChild(keyWrapper);
  });
};
export default mainMenuHandler();
