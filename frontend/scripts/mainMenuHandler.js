import gameHandler from "./gameHandler.js";

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

      /* Tee request player API:hin ja aseta userKey.textContent saadulle sala avaimelle. Tallenna nämä avaimet myös localStorageen, johonkin listaan/array */

      userKeyTextBox.textContent =
        "dnsa98shf9e9f8f3u91f298328u9f23u98f3282f3u89"; /* Tämä on testiksi, voit poistaa tämän */
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
