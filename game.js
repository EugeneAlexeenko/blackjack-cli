const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    this.playerCards = [];
    this.dealerCards = [];
    this.suites = ['♠', '♥', '♦', '♣'];
    this.cards = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
  }

  getCard() {
    const cardIndex = Math.floor(Math.random() * 13);
    const suitIndex = Math.floor(Math.random() * 4);
    const name = this.cards[cardIndex];
    const suite = this.suites[suitIndex];

    return {
      suite,
      name
    }
  }

  getScore(cards) {
    let score;

    score = cards.reduce((score, card) => {
      let cardValue;

      switch (card.name) {
        case 'J': cardValue = 10; break;
        case 'Q': cardValue = 10; break; 
        case 'K': cardValue = 10; break; 
        case 'Ace': cardValue = 11; break; 
        default: cardValue = card.name;
      }

      return score += cardValue;
    }, 0);

    return score;

  }

  determineWinner() {
    const dealerScore = this.getScore(this.dealerCards);
    const playerScore = this.getScore(this.playerCards);
    let winner;

    if (playerScore > 21) {
      console.log(`Bust! Dealer win!`);
      this.startQuestion();
    }

    if (playerScore > dealerScore){
      console.log(`Player win! Player score: ${playerScore} > Dealer score: ${dealerScore}\n`);  
    } else if (playerScore === dealerScore){
      console.log(`Draw! Dealer win!\n`);
    } else {
      console.log(`Dealer win!\n`);
    }

    //TODO write result to file
    console.log('...save to file\n');
    console.log('-----------------------------------------------\n');

    this.startQuestion();
  }

  startQuestion() {
    rl.question('Would you like to play blackjack game? (Y)es or (N)o ? ', (answer = answer.toLowerCase().trim()) => {
      if (answer === 'yes' || answer === 'y') {
        console.log('\nYour answer: Yes, lets start!\n');
        this.initGame();
      } else if (answer === 'no' || answer === 'n') {
        console.log('\nYour answer: No. Good bye!\n');
        rl.close();
      } else {
      console.log('\nSorry, don\'t understand:(\n');
      this.startQuestion();
      } 
    });
  }

  hitOrStayQuestion() {
    rl.question('Hit or stay? (H)it or (S)tay ? ', (answer = answer.toLowerCase().trim()) => {
      if (answer === 'hit' || answer === 'h') {
        console.log('\nYour answer: Hit\n');

        const card = this.getCard();
        this.playerCards.push(card);

        if (this.getScore(this.playerCards) > 21) {
          this.determineWinner();
          //this.startQuestion();
        }

        console.log(`Dealer hand: (${this.getScore(this.dealerCards)}) \n${this.showCards(this.dealerCards)}`);
        console.log(`Your hand: (${this.getScore(this.playerCards)}) \n${this.showCards(this.playerCards)}`);

        this.hitOrStayQuestion();

      } else if (answer === 'stay' || answer === 's') {
        console.log('\nYour answer: Stay\n');
        this.dealerMove();

      } else {
      console.log('\nSorry, don\'t understand :(\n');
      this.hitOrStayQuestion();
      } 
    });
  }

  // stupid logic
  dealerMove() {
    const dealerScore = this.getScore(this.dealerCards);
    const playerScore = this.getScore(this.playerCards);

    console.log('Dealer\'s move...\n');
    if (dealerScore < playerScore && dealerScore < 15) {
      const card = this.getCard();
      this.dealerCards.push(card);
    }

    console.log(`Dealer hand: ${this.getScore(this.dealerCards)} \n${this.showCards(this.dealerCards)}`);
    console.log(`Your hand: ${this.getScore(this.playerCards)} \n${this.showCards(this.playerCards)}`);

    this.determineWinner(); 
  }

  initGame() {
    this.dealerCards = [];
    this.playerCards = [];
    const dealerCard = this.getCard();
    const playerCard1 = this.getCard();
    const playerCard2 = this.getCard();
    
    this.dealerCards.push(dealerCard);
    this.playerCards.push(playerCard1, playerCard2);

    console.log(`Dealer hand: ${this.getScore(this.dealerCards)} \n${this.showCards(this.dealerCards)}`);
    console.log(`Your hand: ${this.getScore(this.playerCards)} \n${this.showCards(this.playerCards)}`);

    this.hitOrStayQuestion();
  }

  showCards(cards) {
    let message = ``;
    cards.forEach(card => {
      message += `  ${card.name} of ${card.suite} \n`;
    });
    return message;
  }
}

console.log(`
////////////////////////////////////////////////////////////////////////////////
//              ♠, ♥, ♦, ♣         BLACKJACK GAME          ♠, ♥, ♦, ♣         //
////////////////////////////////////////////////////////////////////////////////
`);

const game = new Game();
game.startQuestion();