// guessed letters
const guessedLetters = document.querySelector(".guessed-letters");
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
// message saying whether guess is correct or not
const rightOrNOt = document.querySelector(".message");
// play again button
const playAgainButton = document.querySelector(".play-again");

// first word to guess
const word = "magnolia";

// letter placeholder function
const placeholder = function (word) {
	let holderArr = [];

	for (let letter of word) {
		holderArr.push("●");
	}

	// console.log(holderArr);

	let holder = holderArr.join("");

	wordToGuess.innerText = holder;
	// console.log(wordToGuess.innerText);
}

placeholder(word);

guessButton.addEventListener("click", function (e) {
	e.preventDefault();

	let letter = userInput.value;
	console.log(letter);
})
