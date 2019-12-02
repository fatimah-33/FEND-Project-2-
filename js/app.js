let clearTimeInterval = null;
let namesOfCards = [];
let listOfItems = [];
let openCards = [];
let firstCardOpened;
let secondCardOpened;
let countMoves = 0;
let countMatchedCrads = 0;
let showDialog = document.querySelector('#dialogBoxAlert');
let numberOfMoves = document.querySelector('.moves');
let stars = document.querySelector('.stars');
document.querySelector('.restart').addEventListener('click', restartButton);
let starsNumber = 3;
let sec = 0;
let min = 0;
document.querySelector('#playAgain').addEventListener('click', restartButton);
document.querySelector('.restart').addEventListener('click', restartButton);

// select all cards
let allCards = document.querySelectorAll(".card");
startGame();
//select the cards one by one and flip them down
//store the name of the cards icon
function startGame() {
  startTimer();
  starCounts(countMoves);
  numberOfMoves.innerText = countMoves;
  for (let i = 0; i < allCards.length; i++) {
    //flip all cards
    allCards[i].className = "card";
    //add event click to the cards
    allCards[i].addEventListener('click', cardClicked);
    // get cards item
    listOfItems.push(allCards[i].children[0]);
    //get the name of cards icons
    namesOfCards.push(listOfItems[i].className);
  }

  //shuffle the cards
  namesOfCards = shuffle(namesOfCards);
  for (let i = 0; i < allCards.length; i++) {
    listOfItems.push(allCards[i].children[0]);
    listOfItems[i].className = namesOfCards[i];
  }
}
// function when card click
function cardClicked() {
  if (!this.classList.contains('open') && !this.classList.contains('show') && !this.classList.contains('match')) {
    if (openCards.length < 2) {
      this.className = 'card show open';
      updateItemsGame();
      openCards.push(this);
      if (openCards.length == 2) {
        setTimeout(checkMathCards, 1000);
      }
    }
  }
}

//function when cards match
function checkMathCards() {
  if (openCards[0].children[0].className === openCards[1].children[0].className) {

    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    countMatchedCrads += 1;
  } else {
    openCards[0].classList.remove('show', 'open');
    openCards[1].classList.remove('show', 'open');
  }
  openCards = [];
  if (countMatchedCrads === 8) {
    showDialogBox();
  }
}

//show dialog box win user win
function showDialogBox() {
  stopTime();
  document.querySelector('#numberOfMoves').innerText = countMoves;
  document.querySelector('#timeOver').innerText = document.querySelector('.timer').innerText;
  starCounts(countMoves);
  //  showDialog.appendChild(stars);
  showDialog.show();
}
//close dialog
function closeDialog() {
  showDialog.close();
}
//update game items time moves
function updateItemsGame() {
  // count of moves
  countMoves = countMoves + 1;
  numberOfMoves.innerText = countMoves;
  starCounts(countMoves);
}
// count of starts
function starCounts(sumMoves) {
  let createSatr = [];
  if (sumMoves <= 10) {
    starsNumber = 3;
  } else if (sumMoves >= 10 && sumMoves <= 20) {
    starsNumber = 2;
  } else {
    starsNumber = 1;
  }
  for (let r = 0; r < starsNumber; r++) {
    createSatr[r] = `<span class='fa fa-star '> </span>`;
  }
  stars.innerHTML = createSatr.join("");
}

//start timer
function startTimer() {
  if (!clearTimeInterval) {
    clearTimeInterval = setInterval(function() {
      sec += 1;
      if (sec == 60) {
        sec = 0;
        min = 1;
      }
      document.querySelector('.timer').innerText = `${formatTime(min)}:${formatTime(sec)}`;
    }, 1000);
  }
}
//format time
function formatTime(time) {
  let timeString = "";
  if (time < 10) {
    timeString = "0" + time;
    return timeString;
  } else {
    timeString = time;
    return timeString;
  }
}
//stop the time
function stopTime() {
  clearInterval(clearTimeInterval);
  clearTimeInterval = null;
}
//restart button
function restartButton() {
  closeDialog();
  starsNumber = 3;
  sec = 0;
  min = 0;
  namesOfCards = [];
  listOfItems = [];
  openCards = [];
  firstCardOpened;
  secondCardOpened;
  countMoves = 0;
  countMatchedCrads = 0;
  startGame();
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
