/*----- constants -----*/
const myWords = [
  { word: "television", hint: "watch shows on" },

  { word: "candle", hint: "made of wax & a wick" },

  { word: "football", hint: "popular american sport" },

  { word: "workout", hint: "" },

  { word: "football", hint: "popular american sport" },

  { word: "football", hint: "popular american sport" },
];

const maxGuesses = 6;

const buttons = document.querySelectorAll(".keyboard button");

/*----- state variables -----*/
let guessIndex = 0;
let incorrectGuess = 0;
let characterBeingGuessed = 0;
let wordBeingGuessed = 0;
let opacity = 1;
let showCharacterFlags = [];

/*----- cached elements  -----*/
const hint = document.querySelector(`.hint`);
const resetBtn = document.querySelector("#reset");

/*----- event listeners -----*/
buttons.forEach(button => {
    button.addEventListener('click', guessHandler);
    //make sure each button is showing the correct inner text
    console.log(button.textContent);
});

/*----- functions -----*/
init();

function init(){
    guessIndex = 0;
    incorrectGuess = 0;
    characterBeingGuessed = 0;
    wordBeingGuessed = 0;
    opacity = 1;
    showCharacterFlags = [];
    getWord();
}



function getWord() {
  wordBeingGuessed = Math.floor(myWords.length * Math.random());
  const word = myWords[wordBeingGuessed];
  showCharacterFlags = [];
  for (let i = 0; i < word.word.length; i++) {
    showCharacterFlags.push(false);
  }
  renderHint();
  renderWord();
  return word;
}

function renderWord() {
  const wordDisplay = document.querySelector(`.word-display`);
  const word = myWords[wordBeingGuessed];
  wordDisplay.textContent = word.word;
//   textContent.style('')
}

function renderHint() {
  const hintEl = document.querySelector(`.hint`);
  const word = myWords[wordBeingGuessed];
  hintEl.textContent = word.hint;
}

function shouldShowChar(charIndex) {
  return showCharacterFlags[charIndex];
}

function guessHandler(charGuess, guessIndex) {
  let thisWord = myWords[wordBeingGuessed];
  let isCorrect = charGuess == thisWord.word[guessIndex];
  if (isCorrect) {
    showCharacterFlags[guessIndex] = true;
    characterBeingGuessed += 1;
    if (guessIndex == thisWord.word.length - 1) {
      handleWin();
    }
  } else {
    incorrectGuess++;
    opacity -= 1 / maxGuesses;
    if (incorrectGuess >= maxGuesses) {
      handleLoss();
    }
  }
}

function handleWin() {}
function handleLoss() {}
