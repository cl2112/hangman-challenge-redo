const HangmanGame = {
    started: false,
    wordList: ['one', 'two','three','four'],
    wordsGuessed: [],
    currentWord: '',
    guessesLeft: 10,
    lettersGuessed: [],
    wins: 0,
    losses: 0,
    
    Start: function () {
        this.started = true;
        this.ChooseWord();
    },

    KeyPressed: function (letter) {

    },

    ChooseWord: function () {
        
    },



};

document.onkeypress = event => {
    const userGuess = event.key;
    console.log(userGuess);
    if (!HangmanGame.started) {HangmanGame.Start()}
    else {HangmanGame.KeyPressed(userGuess)}
};