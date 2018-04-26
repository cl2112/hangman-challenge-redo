const HangmanGame = {
    // game variables
    started: false,
    wordList: ['one', 'two','three','four'],
    wordsGuessed: [],
    currentWord: '',
    blankWord: '',
    guessesLeft: 10,
    lettersGuessed: [],
    wins: 0,
    losses: 0,
    
    // sets up the initial game values.
    Start: function () {
        this.started = true;
        this.ChooseWord();
        this.CreateBlanks();
        this.RenderGameState();
        console.log(this);
    },

    // selects a word at random from the word list and sets it to the currentWorld value.
    ChooseWord: function () {
        this.currentWord = this.wordList[Math.floor(Math.random()*this.wordList.length)];
        console.log(this.currentWord); // used for easy testing
    },

    // takes in a letter (string) and checks if it exists in the currentWord.
    CheckGuess: function (letter) {
        if(this.lettersGuessed.indexOf(letter) > -1){
            console.log('letter already guessed');

        }else{
            this.lettersGuessed.push(letter);

            if (this.currentWord.indexOf(letter) > -1) {
            
                this.FillInBlanks(letter);
            } else {
                this.guessesLeft --;
            }
        }
        
        this.RenderGameState();
    },

    IsWordComplete: function () {
        return this.blankWord.indexOf('_') > -1;
    },

    RenderGameState: function () {
        document.querySelector('h1').innerText = this.blankWord.join(' ');
        document.querySelector('#guessesLeft').innerText = this.guessesLeft;
        document.querySelector('#wins').innerText = this.wins;
        document.querySelector('#losses').innerText = this.losses;
        document.querySelector('#lettersGuessed').innerText = this.lettersGuessed.join(' ');
    },

    CreateBlanks: function () {
        this.blankWord = this.currentWord.split('').map(v=>'_');
    },

    FillInBlanks: function (letter) {
        this.blankWord = this.blankWord.map((v,i)=>this.currentWord[i] === letter ? letter : v);
    }

};

document.onkeypress = event => {
    const userGuess = event.key;
    console.log(userGuess);
    if (!HangmanGame.started) {HangmanGame.Start()}
    else {HangmanGame.CheckGuess(userGuess)}
};