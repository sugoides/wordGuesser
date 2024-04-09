let secretWord = "";
let guessedWords = [];
let words = []; // Define the 'words' variable at the global level
let possibleWords = [];
let gameHasStarted = false;

function startGame() {
    secretWord = document.getElementById("secret-word-input").value.trim().toLowerCase();
    if (secretWord === "") {
        alert("Please enter a valid secret word.");
        return;
    }
    guessedWords = [];
    words = secretWord.split(' '); // Split the secret word into individual words
    document.getElementById("game-container").style.display = "none";
    document.getElementById("guess-container").style.display = "block";
    document.getElementById("output-container").innerHTML = "Game started. Begin guessing!";


    // Get the guessed-word-input element
    var guessedWordInput = document.getElementById("guessed-word-input");

    // Change the type to a select
    guessedWordInput.outerHTML = '<select id="guessed-word-input"></select>';

    // Get the new select element
    guessedWordInput = document.getElementById("guessed-word-input");

    // Populate the select with the possible words
    for(var i = 0; i < words.length; i++) {
        var option = document.createElement("option");
        option.value = words[i];
        option.text = words[i];
        guessedWordInput.appendChild(option);
    }
    gameHasStarted = true;
}

function makeGuess() {
    const guessedWord = document.getElementById("guessed-word-input").value.trim().toLowerCase();
    const correctLetters = parseInt(document.getElementById("correct-letters-input").value.trim());

    if (guessedWord === "") {
        alert("Please enter a valid guessed word.");
        return;
    }

    if (isNaN(correctLetters) || correctLetters < 0 || correctLetters > secretWord.length) {
        alert("Please enter a valid number of correct letters.");
        return;
    }

    guessedWords.push(guessedWord);

    possibleWords = words.filter(word => !guessedWords.includes(word) && countMatchingLetters(word, guessedWord) === correctLetters);

    let outputHtml = "Possible words based on your input:<br>";
    possibleWords.forEach(word => {
        outputHtml += word + "<br>";
    });

    document.getElementById("output-container").innerHTML = outputHtml;

    if (possibleWords.length === 1 && possibleWords[0] === secretWord) {
        document.getElementById("output-container").innerHTML += `<br><strong>The secret word is: ${secretWord}</strong><br>Congratulations! You guessed the word.`;
    }
    document.getElementById("guessed-word-input").value = "";
    document.getElementById("correct-letters-input").value = "";


    // Get the guessed-word-input element
    var guessedWordInput = document.getElementById("guessed-word-input");

    // Change the type to a select
    guessedWordInput.outerHTML = '<select id="guessed-word-input"></select>';

    // Get the new select element
    guessedWordInput = document.getElementById("guessed-word-input");
    for(var i = 0; i < possibleWords.length; i++) {
        var option = document.createElement("option");
        option.value = possibleWords[i];
        option.text = possibleWords[i];
        guessedWordInput.appendChild(option);
    }
}

function exitGame() {
    document.getElementById("output-container").innerHTML = "";
    document.getElementById("game-container").style.display = "block";
    document.getElementById("guess-container").style.display = "none";
    gameHasStarted = false;
}

function countMatchingLetters(secretWord, guessedWord) {
    return [...secretWord].filter((char, index) => char === guessedWord[index]).length;
}

window.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // Call startGame() or makeGuess() based on your condition
        if (gameHasStarted) {
            makeGuess();
        } else {
            startGame();
        }
    }
});
