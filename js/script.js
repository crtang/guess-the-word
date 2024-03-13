// guesses list
const guesses = document.querySelector(".guessed-letters");
// guess button
const guessButton = document.querySelector(".guess");
// user's guess
const userInput = document.querySelector("#letter");
// word being guessed
const wordToGuess = document.querySelector(".word-in-progress");
// paragraph with guesses left
const guessesMessage = document.querySelector(".remaining");
// number of guesses left
const numGuessesLeft = document.querySelector("span");
// message
const message = document.querySelector(".message");
// play again button
const playAgainButton = document.querySelector(".play-again");

// first word to guess
let word = "magnolia";
// guessed letters
let guessedLetters = [];
// remaining guesses
let remainingGuesses = 8;
// async function to fetch words
const getWord = async function () {
	const data = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
	const words = await data.text();

	const wordArray = words.split("\n");
	
	const randomIndex = Math.floor(Math.random() * wordArray.length);
	const randomWord = wordArray[randomIndex];
	word = randomWord.trim();

	placeholder(word);
};

getWord();

// letter placeholder function
const placeholder = function (word) {
	let holderArr = [];

	for (let letter of word) {
		holderArr.push("●");
	}

	let holder = holderArr.join("");

	wordToGuess.innerText = holder;
};

// event listener for guess button
guessButton.addEventListener("click", function (e) {
	e.preventDefault();

	let letter = userInput.value;

	message.innerText = "";
	let validated = validateGuess(letter);
	
	if (validated !== undefined) {
		makeGuess(validated);
	}

	userInput.value = "";
});

// validate that user has entered a letter as a guess
const validateGuess = function (input) {
	const acceptedLetter = /[a-zA-Z]/;

	if (input === "") {
		message.innerText = "You need to input a guess!";
		return;
	} else if (input.length >= 2) {
		message.innerText = "You can only input one letter at a time.";
		input = "";
		return;
	} else if (!input.match(acceptedLetter)) {
		message.innerText = "You can only guess letters!";
		input = "";
		return;
	} else {
		let letter = input;
		input = "";
		return letter;
	}
};

// enter user's guess and see if it's part of the word
const makeGuess = function (letter) {
	if (guessedLetters.indexOf(letter.toUpperCase()) !== -1) {
		message.innerText = "You've already guessed this letter. Try again!";
	} else {
		message.innerText = "";
		guessedLetters.push(letter.toUpperCase());
		checkGuessesLeft(letter);
		updateList();
		revealWord(guessedLetters);
	}
};

// update list of guessed letters
const updateList = function () {
	guesses.innerHTML = "";

	for (let letter of guessedLetters) {
		let li = document.createElement("li");
		li.innerText = letter;
		guesses.append(li);
	}
};

// show word in progress
const revealWord = function (guessedLetters) {
	const wordUpper = word.toUpperCase();
	const wordArray = wordUpper.split("");
	const updatedWord = [];

	for (const letter of wordArray) {
		if (guessedLetters.includes(letter)) {
			updatedWord.push(letter.toUpperCase());
		} else {
			updatedWord.push("●");
		}
	}

	wordToGuess.innerText = updatedWord.join("");
	playerWin();
};

const checkGuessesLeft = function (guess) {
	const uppercaseWord = word.toUpperCase();
	const checkedWord = uppercaseWord.split("");

	if (!checkedWord.includes(guess.toUpperCase())) {
		message.innerText = `The word doesn't contain the letter ${guess}.`;
		remainingGuesses -= 1;
	}

	if (remainingGuesses === 0) {
		numGuessesLeft.innerText = `${remainingGuesses} guesses`
		message.innerText = `Game over! The word is ${word}.`
		startOver();
	} else if (remainingGuesses === 1) {
		numGuessesLeft.innerText = `${remainingGuesses} guess`;
	} else {
		numGuessesLeft.innerText = `${remainingGuesses} guesses`;
	}
};

// check if player has won
const playerWin = function () {
	if (word.toUpperCase() === wordToGuess.innerText) {
		message.classList.add("win");
		message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
		startOver();
	}
};

const startOver = function () {
	guessButton.classList.add("hide");
	guessesMessage.classList.add("hide");
	guesses.classList.add("hide");

	playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
	message.classList.remove("win");
	message.innerText = "";
	guesses.innerHTML = "";

	remainingGuesses = 8;
	guessedLetters = [];
	numGuessesLeft.innerText = `${remainingGuesses} guesses`;

	guessButton.classList.remove("hide");
	guessesMessage.classList.remove("hide");
	guesses.classList.remove("hide");
	playAgainButton.classList.add("hide");

	getWord();
})
