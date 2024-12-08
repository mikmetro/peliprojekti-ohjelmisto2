import gameHandler from "./gameHandler.js";
import { API_URL } from "./constants.js";

const mainMenuHandler = () => {
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


      async function getUserKey(){
        try{
          const response = await fetch('http://localhost:5500/user/create');
          const data = await response.json();

          let userKey = data['id'];
          return userKey;

        }catch(error){
            console.log("Error in mainMenuHandler: getUserKey() Error on fetch");
        }
      }

      let user_ID_key = await getUserKey();

      const userKeys = JSON.parse(localStorage.getItem("userKeys")) || [];
      userKeys.push(user_ID_key);
      localStorage.setItem("userKeys", JSON.stringify(userKeys));

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
};
export default mainMenuHandler();
