const myWords = [
  { word: "television", hint: "watch shows on" },

  { word: "candle", hint: "smells good" },

  { word: "football", hint: "popular sport" },
];

const maxGuesses = 6;

var guessIndex = 0;
var incorrectGuess = 0;
var characterBeingGuessed = 0;
var wordBeingGuessed = 0;
var opacity = 1;
var showCharacterFlags = [];






function getWord() {
  wordBeingGuessed = Math.floor(myWords.length * Math.random());
  const word = myWords[wordBeingGuessed];
  showCharacterFlags = [];
  for (let i = 0; i < word.word.length; i++) {
    showCharacterFlags.push(false);
  }
  return word;
}

function shouldShowChar(charIndex) {
  return showCharacterFlags[charIndex];
}

//
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
