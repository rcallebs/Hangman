/*----- constants -----*/
const myWords = [
  { word: "television", hint: "A device used for watching shows and movies" },

  { word: "candle", hint: "A source of light made of wax & a wick" },

  { word: "football", hint: "Popular American sport" },

  { word: "ocean", hint: "Body of water that covers of Earth's surface" },

  { word: "baseball", hint: "Considered America's pastime" },

  { word: "broken", hint: "Not in working order" },

  { word: "jukebox", hint: "Music player found in diners" },

  { word: "sandwich", hint: "Typically made with two slices on the outside" },

  { word: "recycle", hint: "Helps the enviroment by reusing materials" },
];

const maxGuesses = 6;

/*----- state variables -----*/
let incorrectGuess = 0;
let wordBeingGuessed = 0;
let showCharacterFlags = [];
let selectedWord = [];
let correctGuesses = 0;
let gameRunning = true;

/*----- cached elements  -----*/
const buttons = document.querySelectorAll(".keyboard button");
const hint = document.querySelector(`.hint`);
const resetBtn = document.querySelector("#reset");
const incorrectGuessCountEl = document.querySelector(".wrongGuesses");
const showWord = document.getElementById("starting");
const header = document.getElementById("title");
const player = document.querySelector("#player");
const heading = document.getElementById("title");

/*----- event listeners -----*/
buttons.forEach((button) => {
  button.addEventListener("click", guessHandler);
});

resetBtn.addEventListener("click", init);

/*----- functions -----*/
init();

//new/blank game variables
function init() {
  //reset button background color on new game
  buttons.forEach((button) => {
    button.style.backgroundColor = "";
  });
  incorrectGuess = 0;
  document.getElementById("player").style.opacity = 1;
  incorrectGuessCountEl.textContent = "Incorrect Geusses = 0/6";
  getWord();
  //reset selected letters on new game
  buttons.forEach((button) => (button.disabled = false));
  showWord.innerHTML = "Geuss the word before your character disappears!";
  header.innerHTML = "Don't Evaporate!";
}

function getWord() {
  wordBeingGuessed = Math.floor(myWords.length * Math.random());
  const word = myWords[wordBeingGuessed];
  //set all characterFlags to false
  showCharacterFlags = [];
  for (let i = 0; i < word.word.length; i++) {
    showCharacterFlags.push(false);
  }
  renderHint();
  renderWord();
  //clear previous games word from selectedWord array
  selectedWord.splice(0, selectedWord.length);
  //add current word to selectedWord array
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
  //change background color of button on click
  guessedButton.style.backgroundColor = "black";
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
    player.style.opacity = 1 - (0.166 * incorrectGuess);
    if (incorrectGuess >= maxGuesses) {
      handleLoss();
    }
  }
  // Update the displayed word after the guess
  renderWord();
  newGame();
}

function handleWin() {
  player.style.opacity = 1;
  buttons.forEach((button) => (button.disabled = true));
  heading.innerHTML = "You've got it!";
  showWord.innerHTML = `Way to go! Your player can make it home safely!`;
  gameRunning = false;
}

function handleLoss() {
  buttons.forEach((button) => (button.disabled = true));
  heading.innerHTML = "Oh no! You've evaporated!!<br>Better luck next time!";
  showWord.innerHTML = `The correct word was ${selectedWord}`;
  gameRunning = false;
}

function newGame(){
  resetBtn.style.visibility = incorrectGuess >= 6 ? 'visible' : 'hidden';
}