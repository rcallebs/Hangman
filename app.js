/*----- constants -----*/
const myWords = [
  { word: "television", hint: "A device used for watching shows and movies" },

  { word: "candle", hint: "A source of light made of wax & a wick" },

  { word: "football", hint: "Popular American sport" },

  { word: "ocean", hint: "Body of water that covers of Earth's surface" },

  { word: "baseball", hint: "Considered America's pastime" },

  { word: "recycle", hint: "Helps the enviroment by reusing materials" },
];

const maxGuesses = 6;

const buttons = document.querySelectorAll(".keyboard button");

/*----- state variables -----*/
let incorrectGuess = 0;
let characterBeingGuessed = 0;
let wordBeingGuessed = 0;
let showCharacterFlags = [];
let selectedWord = [];

/*----- cached elements  -----*/
const hint = document.querySelector(`.hint`);
const resetBtn = document.querySelector("#reset");
const incorrectGuessCountEl = document.querySelector(".wrongGuesses");
const showWord = document.getElementById("starting");
const header = document.getElementById("title");

/*----- event listeners -----*/
buttons.forEach((button) => {
  button.addEventListener("click", guessHandler);
});

resetBtn.addEventListener("click", init);

/*----- functions -----*/
init();

//new/blank game variables
function init() {
  incorrectGuess = 0;
  characterBeingGuessed = 0;
  document.getElementById("player").style.opacity = 1;
  showCharacterFlags = [];
  incorrectGuessCountEl.textContent = "Incorrect Geusses = 0/6";
  getWord();
  //reset the keyboard on new game
  buttons.forEach((button) => (button.disabled = false));
  showWord.innerHTML = "Geuss the word before your character disappears!";
  header.innerHTML = "Don't Evaporate!";
}

function getWord() {
  wordBeingGuessed = Math.floor(myWords.length * Math.random());
  const word = myWords[wordBeingGuessed];
  renderHint();
  renderWord();
  //clear previous games word from selectedWord array
  selectedWord.splice(0, selectedWord.length);
  selectedWord.push(word.word);
  return word;
}

function renderWord() {
  const wordDisplay = document.querySelector(`.word-display`);
  const word = myWords[wordBeingGuessed];
  //need to clear the old content before rendering word
  wordDisplay.innerHTML = "";
  for (let i = 0; i < word.word.length; i++) {
    const letterElement = document.createElement("li");
    letterElement.classList.add("letter");
    if (showCharacterFlags[i]) {
      // Display the letter if it's guessed correctly
      letterElement.textContent = word.word[i];
    }
    wordDisplay.appendChild(letterElement);
  }
}

function renderHint() {
  const hintEl = document.querySelector(`.hint`);
  const word = myWords[wordBeingGuessed];
  hintEl.textContent = word.hint;
}

function guessHandler(event) {
  const guessedButton = event.target;
  const guessedLetter = guessedButton.textContent;
  //disable button after it's been guessed
  guessedButton.disabled = true;
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
    if (showCharacterFlags.every((flag) => flag)) {
      handleWin();
    }
  } else {
    // Incorrect guess handling
    incorrectGuess++;
    // update html page with incorrect guess count
    incorrectGuessCountEl.textContent =
      "Incorrect Guesses = " + incorrectGuess.toString() + "/" + maxGuesses;
    let player = document.querySelector("#player");
    player.style.opacity = 1 - 0.166 * incorrectGuess;
    if (incorrectGuess >= maxGuesses) {
      handleLoss();
    }
  }
  // Update the displayed word after the guess
  renderWord();
}

function handleWin() {}

function handleLoss() {
  buttons.forEach((button) => (button.disabled = true));
  const heading = document.getElementById("title");
  heading.innerHTML = "Oh no! You've evaporated!!<br>Better luck next time!";
  showWord.innerHTML = `The correct word was ${selectedWord}`;
}
