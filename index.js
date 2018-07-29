// Initializes Variables
var inquirer = require("inquirer");
var guessesRem = 10;
var wordObj = [];
var wordArr = [];
var blanksArr = [];
var badGuesses = [];
var guessedLetters = [];
var gameCount = 0;

// Sets up basis of Word constructor
var Word = function (word) {
    this.word = word.toUpperCase();
    that  = this;
};

// Sets word selections (don't peek!)
var phillies = new Word("Philadelphia Phillies");
var orioles = new Word("Baltimore Orioles");
var athletics = new Word("Oakland Athletics");
var mariners = new Word("Seattle Mariners");
var pirates = new Word("Pittsburgh Pirates");

var wordOptions = [phillies, orioles, athletics, mariners, pirates];

// Constructs object for storing word array and whether a letter has been guessed.
Word.prototype.setAttributes = function() {
    for(let i = 0; i < this.word.length; i++){
        wordObj.push(this.word[i]);
        wordArr.push(this.word[i]);
        wordObj[i] = {
            letter: wordObj[i],
            guessed: false
        }
    }
};

// Continues to prompt the user for letters and prints them to the console.
Word.prototype.keepPrompting = function() {
    inquirer.prompt([
        {
            name: "inputLtr",
            type: "input",
            message: "Enter a letter: "
        }
    ]).then(function(resp) {
        let input = String(resp.inputLtr).toUpperCase();
        var j = 0;
        blanksArr = [];
        for(let i = 0; i < that.word.length; i++) {
            if(input.length !== 1) {
                console.log("Please enter one letter...");
                j = that.word.length + 1;
                break;
            } else if(guessedLetters.indexOf(input) != -1) {
                console.log("You've already guessed that one...");
                j = that.word.length + 1;
                break;
            } else if(input === wordObj[i].letter) {
                wordObj[i].guessed = true;
            } else {
                j++;
            }
        }
        if(j === that.word.length) {
            badGuesses.push(input);
            guessedLetters.push(input);
            console.log("Wrong :(\n");
            console.log("Incorrect guesses:\t" + badGuesses.join(" "));
            guessesRem--;
            console.log("Guesses Remaining:\t" + guessesRem);
            that.print();
            if(guessesRem === 0) {
                console.log("You lose :(\nThe word you were trying to guess was: "+ that.word);
                startGame();
            } else {
                that.keepPrompting();
            }
        } else if(j === that.word.length + 1) {
            console.log("Incorrect guesses:\t" + badGuesses.join(" "));
            console.log("Guesses Remaining:\t" + guessesRem);
            that.print();
            that.keepPrompting();
        }
         else {
            guessedLetters.push(input);
            console.log("Correct!!!\n");
            console.log("Incorrect guesses:\t" + badGuesses.join(" "));
            console.log("Guesses Remaining:\t" + guessesRem);
            that.print();
            if(blanksArr.indexOf("_") != -1) {
                that.keepPrompting();
            } else {
                console.log("\nYOU WIN!!!\n");
                startGame();
                gameCountIncrement();
            }
        }
    })
    
};

// Prints letters and blank spaces to console.
Word.prototype.print = function() {
    for(let i = 0; i < this.word.length; i++) {
        if(wordObj[i].guessed) {
            blanksArr.push(wordObj[i].letter);
        } else if(wordObj[i].letter === " ") {
            blanksArr.push(" ");
        } else {
            blanksArr.push("_");
        }
    }
    console.log("\n" + blanksArr.join(" ") + "\n")
};

// Resets variables and starts round.
function startGame() {
    guessesRem = 10;
    wordObj = [];
    wordArr = [];
    blanksArr = [];
    badGuesses = [];
    guessedLetters = [];
    selectedWord = wordOptions[gameCount].word;
    runGame(selectedWord);
};

// Increments gameCount variable for word cycling.
function gameCountIncrement() {
    gameCount++;
}

// Initializes selected word.
function runGame(word) {
    var gameWord = new Word(word);
    gameWord.setAttributes();
    gameWord.keepPrompting();
};

// Conditions under which game is run.
if(gameCount < wordOptions.length) {
    startGame();
    gameCountIncrement();
} else {
    console.log("\nCongratulations!!!\nYou've guessed all the words!\n");
};