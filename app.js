/*----- constants -----*/
const myWords = [
  { word: "television", hint: "watch shows on" },

  { word: "candle", hint: "made of wax & a wick" },

  { word: "football", hint: "popular american sport" },
];

const maxGuesses = 6;

/*----- state variables -----*/
var guessIndex = 0;
var incorrectGuess = 0;
var characterBeingGuessed = 0;
var wordBeingGuessed = 0;
var opacity = 1;
var showCharacterFlags = [];


/*----- cached elements  -----*/
const hint = document.querySelector(`.hint`);
const resetBtn = document.querySelector('#reset');


/*----- event listeners -----*/




/*----- functions -----*/

function getWord() {
  wordBeingGuessed = Math.floor(myWords.length * Math.random());
  const word = myWords[wordBeingGuessed];
  showCharacterFlags = [];
  for (let i = 0; i < word.word.length; i++) {
    showCharacterFlags.push(false);
  }
  renderHint();
  return word;
}

function renderHint(){
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
