const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


console.log(`
////////////////////////////
//     BLACKJACK GAME     //
////////////////////////////
`);

const startQuestion = () => {
  rl.question('Would you like to play blackjack game? (Y)es or (N)o ? ', (answer = answer.toLowerCase()) => {
    if (answer === 'yes' || answer === 'y') {
      console.log(`Ok, lets start!`);
      startGame();
    } else if (answer === 'no' || answer === 'n') {
      console.log('Ok, may be next time.');
      rl.close();
    } else {
     console.log('Sorry, I don\'t understand');
     startQuestion();
    } 
  });
}

const startGame = () => {
  console.log('...starting');
}

startQuestion();