import "./style.css";
import AddScores from "./views/AddScore.js";
import Footer from "./views/Footer.js";
import { modalMessages, modalSetup } from "./views/Modals.js";
import { recentScores } from "./views/RecentScores.js";
import { startLeaderBoard } from "./controllers/Starter.js";
import { createGame, getScores } from "./controllers/ServiceController.js";

const leaderContent = document.querySelector(".leaderboard-content");

// update leaderboard content
leaderContent.innerHTML = recentScores() + AddScores();

// update body
document.body.innerHTML += modalMessages() + modalSetup() + Footer();

window.addEventListener("DOMContentLoaded", () => {
  //overlay object is either modal for new users or loading spinner for exisiting users
  const overlayObject = startLeaderBoard();
  if (overlayObject.className === undefined) {
    const setupForm = document.querySelector("#setupLeaderBoard");
    setupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      createGame(setupForm, overlayObject);
    });
  } else {
    getScores(overlayObject);
  }
});
