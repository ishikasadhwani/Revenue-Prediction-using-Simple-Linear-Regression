const diceElement = document.querySelector(".dice");
const score0 = document.getElementById("score0");
const score1 = document.getElementById("score1");
const currentScore0 = document.getElementById("current0");
const currentScore1 = document.getElementById("current1");
const rollBtn = document.getElementById("rollbtn");
const resetBtn = document.getElementById("resetbtn");
const saveBtn = document.getElementById("savebtn");
const player0 = document.querySelector(".player0");
const player1 = document.querySelector(".player1");
const player0Name = document.getElementById("player0-name");
const player1Name = document.getElementById("player1-name");

let savedScores, currentScore, activePlayer, playing;

const enableNameEditing = function () {
  player0Name.removeAttribute("disabled");
  player1Name.removeAttribute("disabled");
};

const start = function () {
  savedScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  diceElement.classList.add("hidden");
  player0.classList.remove("player-winner");
  player1.classList.remove("player-winner");
  player0.classList.add("player-active");
  player1.classList.remove("player-active");
  enableNameEditing();
  document.querySelector(".winner-message").classList.add("hidden");
};

start();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player-active");
  player1.classList.toggle("player-active");
};

const disableNameEditing = function () {
  player0Name.setAttribute("disabled", "true");
  player1Name.setAttribute("disabled", "true");
};

//rolling dice

rollBtn.addEventListener("click", function () {
  if (playing) {
    disableNameEditing();
    //generating random no.
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove("hidden");
    diceElement.classList.add("rolling");
    setTimeout(() => {
      diceElement.src = `dice${dice}.png`;
      diceElement.classList.remove("rolling");
    }, 500);
    //checking for 1
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player if 1
      switchPlayer();
    }
  }
});

saveBtn.addEventListener("click", function () {
  if (playing) {
    //add current score to active player's saved scores
    savedScores[activePlayer] += currentScore;
    document.getElementById(`score${activePlayer}`).textContent =
      savedScores[activePlayer];

    if (savedScores[activePlayer] >= 20) {
      playing = false;
      diceElement.classList.add("hidden");
      document
        .querySelector(`.player${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove("player-active");

      const winnerName = document.getElementById(
        `player${activePlayer}-name`
      ).value;
      document.querySelector(
        ".winner-message"
      ).textContent = `${winnerName} Wins! 🎉`;
      document.querySelector(".winner-message").classList.remove("hidden");
    } else {
      switchPlayer();
    }
  }
});

//resetting the game

resetBtn.addEventListener(
  "click",
  start
  // currentScore=0;
  // savedScores=[0,0];
  //   score0.textContent = 0;
  //   score1.textContent = 0;
  //   currentScore0.textContent = 0;
  //   currentScore1.textContent = 0;
  //   player0.classList.remove("player-winner");
  //   player1.classList.remove("player-winner");
  //   player0.classList.add("player-active");
  //   player1.classList.remove("player-active");
);
