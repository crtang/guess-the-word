// guesses list
const guesses = document.querySelector(".guessed-letters");
// guess button
const guessButton = document.querySelector(".guess");
// user's guess
const userInput = document.querySelector("#letter");
// word being guessed
const wordToGuess = document.querySelector(".word-in-progress");
// paragraph with guesses left
const remainingGuesses = document.querySelector(".remaining");
// number of guesses left
const numGuessesLeft = document.querySelector("span");
// message
const message = document.querySelector(".message");
// play again button
const playAgainButton = document.querySelector(".play-again");

// first word to guess
const word = "magnolia";
// guessed letters
const guessedLetters = [];

// letter placeholder function
const placeholder = function (word) {
	let holderArr = [];

	for (let letter of word) {
		holderArr.push("●");
	}

	let holder = holderArr.join("");

	wordToGuess.innerText = holder;
}

placeholder(word);

guessButton.addEventListener("click", function (e) {
	e.preventDefault();

	let letter = userInput.value;

	message.innerText = "";
	let validated = validateGuess(letter);

	input = "";
	
	if (validated !== undefined) {
		makeGuess(validated);
	}
});

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

const makeGuess = function (letter) {
	if (guessedLetters.indexOf(letter.toUpperCase()) !== -1) {
		message.innerText = "You've already guessed this letter. Try again!";
	} else {
		message.innerText = "";
		guessedLetters.push(letter.toUpperCase());
		updateList();
		revealWord(guessedLetters);
	}
};

const updateList = function () {
	guesses.innerHTML = "";

	for (let letter of guessedLetters) {
		let li = document.createElement("li");
		li.innerText = letter;
		guesses.append(li);
	}
};

const revealWord = function (guessedLetters) {
	const wordUpper = word.toUpperCase();
	const wordArray = wordUpper.split("");
	const updatedWord = [];

	for (const letter of wordArray) {
		if (guessedLetters.includes(letter)) {
			updatedWord.push(lette.toUpperCase());
		} else {
			updatedWord.push("●");
		}
	}

	console.log(updatedWord);
};

revealWord();
