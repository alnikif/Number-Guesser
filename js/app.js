/*
Game Functions:
-player must guess a number between a min and max
-player gets a certain amount of guesses
-notify the player of guesses remaining 
-show the correct number if loose
-let the player choose to play again
*/

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

const gameContainer = document.querySelector('#game'),
  minNum = document.querySelector('.minNum'),
  maxNum = document.querySelector('.maxNum'),
  guessBtn = document.querySelector('#submit'),
  guessInput = document.querySelector('#guessNumber'),
  msg = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
gameContainer.addEventListener('mousedown', function(e) {
  if (e.target.className === 'playAgain') {
    window.location.reload();
  }
});

//Listen for submit
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);
  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter number between ${min} and ${max}`, 'red');
  }

  //Win
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct! You win!`);
  } else {
    // Wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(
        false,
        `Game Over, you lost. The correct number was ${winningNum}`
      );
    } else {
      //Game continues
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, 'red');
    }
  }
});

function gameOver(result, msg) {
  let color;
  result === true ? (color = 'green') : (color = 'red');
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);
  // Play again
  guessBtn.value = 'Play again';
  guessBtn.className += 'playAgain';
}

// Message
function setMessage(text, color) {
  msg.textContent = text;
  msg.style.color = color;
}

// Get winnig number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}