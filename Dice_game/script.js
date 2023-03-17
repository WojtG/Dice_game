"use strict";

const rollBtn = document.querySelector(".btn--roll");
const resetBtn = document.querySelector(".btn--new");
const addScoreBtn = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");
const score1El = document.querySelector("#score--1");
const score0El = document.getElementById("score--0");
const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const rulesMsg = document.querySelector(".rules-message");

let currentScore = 0; // wystraczy jedna zmienna dla dwoch graczy bo sie nie beda te scory jednoczesnie wyswietlac tylko raz u jednego gracza raz u drugiego wiec nie ma potrzebty dwoch scorow osobnychh robic.
let activePlayer = 0; //zmienna kotra bedzie nam pokazywac ktory player aktualnie  rzuca kostke. Dlatego wszytskie klasy maja 0 i 1
const scores = [0, 0]; // bedzie na 0 miejscu przechowywac score playera 0 a na 1 playera 1. dlatego active player na 0 ustawiony
let isPlaying = true; // zmienna ktora okresla koniec gry, zeby po skonczonej grze przycisku roll i hold nie dzialaly. Ustawiamy warunek dla obydwu btn ze if isPLaying =true to sie wykona kod. W miejscu w ktorym gra sie konczy mutujemy true na false.

score1El.textContent = 0;
score0El.textContent = 0;
diceEl.classList.add("hidden");

const switchPLayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active"); //toggle usuwa klase jak jest juz na elemencie a jak nie ma to dodaje
  player1El.classList.toggle("player--active");
};

rollBtn.addEventListener("click", function () {
  if (isPlaying) {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${randomNumber}.png`;
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPLayer();
    }
  }
});

addScoreBtn.addEventListener("click", function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
      document.getElementById(`current--${activePlayer}`).textContent =
        "WINNER! 🎆🎆 ";
      rulesMsg.classList.add("hidden");
      isPlaying = false;
    } else {
      switchPLayer();
    }
  }
});

resetBtn.addEventListener("click", function () {
  isPlaying = true;
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
    document.querySelector(`#score--${[i]}`).textContent = scores[i];
  }
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  activePlayer = 0;
  diceEl.classList.add("hidden");
  rulesMsg.classList.remove("hidden");
});
