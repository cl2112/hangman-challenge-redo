const HangmanGame = {
    // game variables
    state: {
        started: false,
        wordList: ["one", "two", "three", "four"],
        wordsGuessed: [],
        currentWord: "",
        blankWord: "",
        guessesLeft: 10,
        lettersGuessed: [],
        wins: 0,
        losses: 0
    },

    // sets up the initial game values.
    Start: function() {
        this.state.started = true;
        this.state.lettersGuessed = [];
        this.state.guessesLeft = 10;
        this.ChooseWord();
        this.CreateBlanks();
        this.RenderGameState();
    },

    // selects a word at random from the word list and sets it to the currentWorld value.
    ChooseWord: function() {
        this.state.currentWord = this.state.wordList[
            Math.floor(Math.random() * this.state.wordList.length)
        ];
        if (this.state.wordsGuessed.indexOf(this.state.currentWord) > -1) {
            if (this.state.wordsGuessed.length === this.state.wordList.length) {
                console.log("All the words have been guessed.");
            } else {
                this.ChooseWord();
            }
        } else {
            this.state.wordsGuessed.push(this.state.currentWord);
            console.log(this.state.currentWord); // used for easy testing
        }
    },

    // takes in a letter (string) and checks if it exists in the currentWord.
    CheckGuess: function(letter) {
        // if the letter has already been guessed.
        if (this.state.lettersGuessed.indexOf(letter) > -1) {
            console.log("letter already guessed");
        } else {
            this.state.lettersGuessed.push(letter);

            if (this.state.currentWord.indexOf(letter) > -1) {
                this.FillInBlanks(letter);
            } else {
                this.state.guessesLeft--;
            }
        }

        this.RenderGameState();
        this.CheckGameState();
    },

    // Checks if the word has been guessed and if it has restart the game.
    CheckGameState: function() {
        // if there are no underscores in blankWord, then all the letters have been guessed.
        if (this.state.blankWord.indexOf("_") < 0) {
            console.log("Congrats!!");
            this.state.wins ++;
            this.state.started = false;
        }

        if (this.state.guessesLeft <= 0) {
            console.log("Aww, you lost!!");
            this.state.losses ++;
            this.state.started = false;
        }
    },

    // Grabs the elements from the DOM and replaces the text with the latest values stored in the game state.
    RenderGameState: function() {
        document.querySelector("h1").innerText = this.state.blankWord.join(" ");
        document.querySelector(
            "#guessesLeft"
        ).innerText = this.state.guessesLeft;
        document.querySelector("#wins").innerText = this.state.wins;
        document.querySelector("#losses").innerText = this.state.losses;
        document.querySelector(
            "#lettersGuessed"
        ).innerText = this.state.lettersGuessed.join(" ");
    },

    // Creates an array with a blank '_' for each letter in the currentWord.
    CreateBlanks: function() {
        this.state.blankWord = this.state.currentWord.split("").map(v => "_");
    },

    // Loops through the blankWord array and replaces the blanks with a letter.
    FillInBlanks: function(letter) {
        this.state.blankWord = this.state.blankWord.map(
            (v, i) => (this.state.currentWord[i] === letter ? letter : v)
        );
    }
};


// Event listener for key presses that triggers the game to start and if the game has already
// started, it calls the check guess function.
document.onkeypress = event => {
    const userGuess = event.key;
    if (!HangmanGame.state.started) {
        HangmanGame.Start();
    } else {
        HangmanGame.CheckGuess(userGuess);
    }
};
