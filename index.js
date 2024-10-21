//toggle rule box
function togglePop() {
  document.getElementById("poprule-1").classList.toggle("active");
}

const move = [
  {
    name: "paper",
    weak: "rock",
  },
  {
    name: "scissors",
    weak: "paper",
  },
  {
    name: "rock",
    weak: "scissors",
  },
];

const choiceBtn = document.querySelectorAll(".yourchoice-btn");
const resultDs = document.querySelectorAll(".playgamer");
const gamess = document.querySelector(".gamemake");
const resultss = document.querySelector(".playgame");

const winnerresult = document.querySelector(".winnermess");
const winnertext = document.querySelector(".winnertext");

const playBtn = document.querySelector(".play-again");

const scoreOfHuman = document.querySelector(".scoreh");
const scoreOfPc = document.querySelector(".scorepc");
let scoreh = 0;
let scorepc = 0;

const nextBtn = document.querySelector(".next-btn");
const ruleBtn = document.querySelector(".rules-btn");
// game
choiceBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.yourchoice;
    const choice = move.find((m) => m.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const pcchoice = pcChoose();
  displayResult([choice, pcchoice]);
  displayWinner([choice, pcchoice]);
}

function pcChoose() {
  const randompick = Math.floor(Math.random() * move.length);
  return move[randompick];
}

function displayResult(results) {
  resultDs.forEach((resultD, i) => {
    setTimeout(() => {
      resultD.innerHTML = `
          <div class="yourchoice ${results[i].name}">
            <img src="./image/${results[i].name}.svg" alt="${results[i].name}" />
          </div>`;
    }, i * 0);
  });
  gamess.classList.toggle("hidden");
  resultss.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWin = isWinner(results);
    const pcWin = isWinner(results.reverse());

    if (userWin) {
      winnertext.innerHTML =
        "<div class='textl'>YOU WIN <br> <span>AGAINST PC</span></div>";
      resultDs[0].classList.toggle("winnera");
      humanPoint(1);
    } else if (pcWin) {
      winnertext.innerHTML =
        " <div class='textl'>YOU LOST <br> <span>AGAINST PC</span></div>";
      resultDs[1].classList.toggle("winnera");
      pcPoint(1);
    } else {
      winnertext.innerHTML = "TIE UP";
      if (winnertext.innerHTML === "TIE UP") {
        playBtn.innerText = "REPLAY";
      }
    }
  }, 0);
  winnerresult.classList.toggle("hidden");
  resultss.classList.toggle("win");
}
function isWinner(results) {
  return results[0].weak === results[1].name;
}

//  check for next
function checkForNextButton() {
  if (scoreh > scorepc) {
    nextBtn.classList.remove("hidden");
    ruleBtn.style = "right: 11.5rem;";
  } else {
    nextBtn.classList.add("hidden");
    ruleBtn.style = "right: 2rem;";
  }
}

//score
function humanPoint(point) {
  scoreh += point;
  scoreOfHuman.innerText = scoreh;
  localStorage.setItem("scoreh", scoreh);
  checkForNextButton();
}
function pcPoint(point) {
  scorepc += point;
  scoreOfPc.innerText = scorepc;
  localStorage.setItem("scorepc", scorepc);
  checkForNextButton();
}
//play again

function playAgain() {
  winnerresult.classList.add("hidden");
  resultss.classList.remove("win");

  resultDs.forEach((resultD) => {
    resultD.innerHTML = "";
  });

  resultDs[0].classList.remove("winnera");
  resultDs[1].classList.remove("winnera");

  gamess.classList.remove("hidden");
  resultss.classList.add("hidden");

  playBtn.innerText = "Play Again";
}

playBtn.addEventListener("click", playAgain);

// local storage

function initializeScores() {
  const storedHumanScore = localStorage.getItem("scoreh");
  const storedPcScore = localStorage.getItem("scorepc");

  scoreh = storedHumanScore ? parseInt(storedHumanScore) : 0;
  scorepc = storedPcScore ? parseInt(storedPcScore) : 0;

  scoreOfHuman.innerText = scoreh;
  scoreOfPc.innerText = scorepc;

  checkForNextButton();
}

initializeScores();
