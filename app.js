/*----- constants -----*/
const myWords = [
  { word: "television", hint: "watch shows on" },

  { word: "candle", hint: "made of wax & a wick" },

  { word: "football", hint: "popular american sport" },

  { word: "ocean", hint: "along both coasts" },

  { word: "baseball", hint: "has a DH" },

  { word: "recycle", hint: "environmentally friendly" },
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
buttons.forEach((button) => {
  button.addEventListener("click", guessHandler);
});

/*----- functions -----*/
init();

//new/blank game variables
function init() {
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
  //need to clear the old content before rendering word
  wordDisplay.innerHTML = '';
  for (let i = 0; i < word.word.length; i++) {
    const letterElement = document.createElement("li");
    letterElement.classList.add("letter");
    if (showCharacterFlags[i]) {
      // Display the letter if it's guessed correctly
      letterElement.textContent = word.word[i];
    } else {
      // Display underscore if the letter is not yet guessed
      letterElement.textContent = "_";
    }
    wordDisplay.appendChild(letterElement);
  }
}

function renderHint() {
  const hintEl = document.querySelector(`.hint`);
  const word = myWords[wordBeingGuessed];
  hintEl.textContent = word.hint;
}

// function shouldShowChar(charIndex) {
//   return showCharacterFlags[charIndex];
// }

function guessHandler(event) {
    const guessedLetter = event.target.textContent;
    // const buttonText = this.textContent;
    const currentWord = myWords[wordBeingGuessed].word;
    const isCorrectGuess = currentWord.includes(guessedLetter);
    if (isCorrectGuess) {
        // Update the showCharacterFlags array to reveal the guessed letter(s)
        for (let i = 0; i < currentWord.length; i++) {
          if (currentWord[i] === guessedLetter) {
            showCharacterFlags[i] = true;
          }
        }
        // Check if all letters have been guessed correctly
        if (showCharacterFlags.every(flag => flag)) {
          handleWin();
        }
      } else {
        // Incorrect guess handling
        incorrectGuess++;
        const incorrectGuessCountEl = document.querySelector(".wrongGuesses");
        incorrectGuessCountEl.textContent = "Incorrect Guesses = " + incorrectGuess.toString();
        // opacity -= 1 / maxGuesses;
        if (incorrectGuess >= maxGuesses) {
          handleLoss();
        } 
      }
      // Update the displayed word after the guess
      renderWord();
    }
 

// function guessHandler(charGuess, guessIndex) {
//     console.log(event)
//   let thisWord = myWords[wordBeingGuessed];
//   let isCorrect = charGuess == thisWord.word[guessIndex];
//   if (isCorrect) {
//     showCharacterFlags[guessIndex] = true;
//     characterBeingGuessed += 1;
//     if (guessIndex == thisWord.word.length - 1) {
//       handleWin();
//     }
//   } else {
//     incorrectGuess++;
//     opacity -= 1 / maxGuesses;
//     if (incorrectGuess >= maxGuesses) {
//       handleLoss();
//     }
//   }
// }

function handleWin() {}
function handleLoss() {}
