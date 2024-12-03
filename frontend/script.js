const menuButtons = document.querySelector(".main-menu-buttons");
menuButtons.querySelector("#start-game").addEventListener("click", async () => {
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

  wrapper.appendChild(createGameText);
  wrapper.appendChild(userKeyTextBox);
  mainMenu.appendChild(wrapper);
  mainMenu.appendChild(continueButton);

  continueButton.addEventListener("click", () => {
    document.body.innerHTML = "";
  });
});
