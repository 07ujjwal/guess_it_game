// selectors.....
const inputForm = document.querySelector("form");
const btnCheck = document.querySelector(".Check");
const btnReset = document.querySelector(".reset");
const btnBack = document.querySelector(".back");
const log = document.querySelector("#log");

const containerNav = document.querySelector("nav");
const containerApp = document.querySelector(".app");
const BetweenMsg = document.querySelector(".between");
const hintBox = document.querySelector(".hint_box");
const hintDefault = document.querySelector(".hint");

// default global variable........

let score = 20;
let highsScore = 0;
let randomNumber = 0;
let maxRange = 0;

// display functions......

const displayGame = function () {
  containerNav.classList.add("hidden");
  containerApp.classList.remove("hidden");
};

const generateHTMLrange = function (range) {
  const html = `<p>(Between 1 and ${range})</p>`;
  BetweenMsg.insertAdjacentHTML("afterbegin", html);
};

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

const displayScore = function (score) {
  document.querySelector(".score").textContent = score;
};

const displayHighScore = function (value) {
  document.querySelector(".highscore").textContent = value;
};

const displayRandomNumber = function (randomNumber) {
  document.querySelector(".num_box").textContent = randomNumber;
};

const generateRandomNumber = function (min, max) {
  return Math.trunc(Math.random() * (max - min) + min);
};

// hint generating functions.....

const defaultHint = () => {
  const html = `<div class="hint">
  <p>👍No Hints for this section!</p>
</div>`;
  hintBox.insertAdjacentHTML("afterbegin", html);
};

const findEvenOdd = function (randomNumber) {
  let html = "";
  if (randomNumber % 2 === 0) {
    html = `<div class="hint">
            <p>The number is Even</p>
              </div>`;
  } else {
    html = `<div class="hint">
      <p>The number is Odd</p>
        </div>`;
  }
  hintBox.insertAdjacentHTML("afterbegin", html);
};

const checkDivByThree = function (randomNumber) {
  let sum = 0;
  let randstr = randomNumber.toString();
  for (let i = 0; i < randstr.length; i++) {
    sum += parseInt(randstr[i]);
  }
  let html = "";
  if (sum % 3 === 0) {
    html = `<div class="hint">
            <p>Sum of the digits is divisible by 3</p>
              </div>`;
  } else {
    html = `<div class="hint">
      <p>Sum of the digits is not divisible by 3</p>
        </div>`;
  }
  hintBox.insertAdjacentHTML("beforeend", html);
};

const checkDivByFive = function (randomNumber) {
  let html = "";
  if (randomNumber % 5 === 0) {
    html = `<div class="hint">
            <p>The number is divisible by 5.</p>
              </div>`;
  } else {
    html = `<div class="hint">
      <p>The number is not divisible by 5.</p>
        </div>`;
  }
  hintBox.insertAdjacentHTML("beforeend", html);
};

// controller area....

inputForm.addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    const data = document.getElementsByName("game_type");

    if (data[0].checked === true) {
      console.log("easy");
      // display the playing area.....
      displayGame();
      //
      maxRange = 20;

      // operations of reset btn.....
      eventReset(maxRange);
      // operations of the back btn....
      ChangeLevel(maxRange);
      // markup for the range of this level
      generateHTMLrange(maxRange);
      // random number for this level....
      randomNumber = generateRandomNumber(1, maxRange);
      console.log(randomNumber);
      // hint for easy level.....
      defaultHint();
      // main modal function.....
      checkEvent(maxRange);

      //
    } else if (data[1].checked === true) {
      console.log("medium");
      // display the playing area.....
      displayGame();

      //
      maxRange = 50;

      // operations of reset btn.....
      eventReset(maxRange);
      // operations of the back btn....
      ChangeLevel(maxRange);
      // markup for the range of this level
      generateHTMLrange(maxRange);
      // random number for this level....
      randomNumber = generateRandomNumber(1, maxRange);
      console.log(randomNumber);
      // main modal function.....
      checkEvent(maxRange);
      // hint for easy level.....
      findEvenOdd(randomNumber);
      checkDivByThree(randomNumber);

      //
    } else if (data[2].checked === true) {
      console.log("hard");
      // display the playing area.....
      displayGame();
      //
      maxRange = 100;
      // operations of reset btn.....
      eventReset(maxRange);
      // operations of the back btn....
      ChangeLevel(maxRange);
      // markup for the range of this level
      generateHTMLrange(maxRange);
      // random number for this level....
      randomNumber = generateRandomNumber(1, maxRange);
      console.log(randomNumber);

      // main modal function.....
      checkEvent(maxRange);
      // hint for easy level.....
      findEvenOdd(randomNumber);
      checkDivByThree(randomNumber);
      checkDivByFive(randomNumber);

      //
    }
  },
  false
);

// view... area..

const checkEvent = (levelMax) => {
  btnCheck.addEventListener("click", (e) => {
    const inputValue = document.querySelector(".guess").value;
    e.preventDefault();
    if (!inputValue) {
      if (score > 0) {
        score--;

        displayMessage("⛔No Number!");

        displayScore(score);
      } else {
        displayMessage("😂 You lose!");
      }
    } else if (inputValue == randomNumber && inputValue <= levelMax) {
      displayRandomNumber(randomNumber);
      displayMessage("🎊 Correct Number!");
      containerApp.style.backgroundColor = "#60b347";
      containerApp.style.color = "#495057";

      if (score > highsScore) {
        highsScore = score;
        displayHighScore(highsScore);
      }
    } else if (inputValue !== randomNumber) {
      if (score > 0) {
        displayMessage(
          randomNumber > inputValue
            ? "😁 Too Low!"
            : inputValue <= levelMax && inputValue > randomNumber
            ? "👀 Too High!"
            : "😒Out of range"
        );
        score--;
        displayScore(score);
      } else {
        displayMessage("😂 You lose!");
      }
    }
    console.log(score);
  });
};

const defaultReset = () => {
  score = 20;
  document.querySelector(".num_box").textContent = "?";
  displayMessage("Start guessing...");
  displayScore(score);
  containerApp.style.backgroundColor = "#222";
  containerApp.style.color = "#eee";
  document.querySelector(".guess").value = "";
  hintBox.innerHTML = "";
};

const eventReset = (levelMax) => {
  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    maxRange = levelMax;
    randomNumber = generateRandomNumber(1, levelMax);

    defaultReset();
    if (levelMax === 20) {
      defaultHint();
    } else if (levelMax === 50) {
      findEvenOdd(randomNumber);
      checkDivByThree(randomNumber);
    } else if (levelMax === 100) {
      findEvenOdd(randomNumber);
      checkDivByThree(randomNumber);
      checkDivByFive(randomNumber);
    }
  });
};

const ChangeLevel = (levelMax) => {
  btnBack.addEventListener("click", (e) => {
    inputForm.reset();
    maxRange = levelMax;
    highsScore = 0;
    displayHighScore(highsScore);
    containerNav.classList.remove("hidden");
    containerApp.classList.add("hidden");
    BetweenMsg.removeChild(BetweenMsg.firstElementChild);
    defaultReset();
  });
};
