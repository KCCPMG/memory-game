const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

const IMAGES = [
  "https://i.scdn.co/image/ab67616d00001e0204167cd5b7ddbf5c4a563456",
  "https://i.scdn.co/image/ab67616d00001e025a18ca8e4cd3652ef2617886",
  "https://i.scdn.co/image/ab67616d00001e02c94603dcb78ec39322cebb5b",
  "https://i.scdn.co/image/ab67616d00001e029daf50d073fd6e7ad9bc0076",
  "https://i.scdn.co/image/ab67616d00001e021211f350b2fe058161c249f1",
  "https://i.scdn.co/image/ab67616d00001e02d807dd713cdfbeed142881e2",
  "https://i.scdn.co/image/ab67616d00001e02b9dd63a105a5afe5d58a783b",
  "https://i.scdn.co/image/ab67616d00001e025c123475e140d4e9b21c996d",
  "https://i.scdn.co/image/ab67616d00001e02582d56ce20fe0146ffa0e5cf",
  "https://i.scdn.co/image/ab67616d00001e02c4821abf3351f0eedd6aff3b",
  "https://i.scdn.co/image/ab67616d00001e0284243a01af3c77b56fe01ab1",
  "https://i.scdn.co/image/ab67616d00001e02dc30583ba717007b00cceb25",
  "https://i.scdn.co/image/ab67616d00001e02d283808926ad3d2220e63c1c",
  "https://i.scdn.co/image/ab67616d00001e024ce8b4e42588bf18182a1ad2",
  "https://i.scdn.co/image/ab67616d00001e02692d9189b2bd75525893f0c1",
  "https://i.scdn.co/image/ab67616d00001e0234ef8f7d06cf2fc2146f420a",
  "https://i.scdn.co/image/ab67616d00001e0248eeac769c253bfc05a0d1fc",
  "https://i.scdn.co/image/ab67616d00001e02c92b57b8307e5999ec2fed69",
  "https://i.scdn.co/image/ab67616d00001e0228b8b9b46428896e6491e97a",
  "https://i.scdn.co/image/ab67616d00001e02ed801e58a9ababdea6ac7ce4",
  "https://i.scdn.co/image/ab67616d00001e02e3e3b64cea45265469d4cafa",
  "https://i.scdn.co/image/ab67616d00001e0255612ece447bec5d62c68375",
  "https://i.scdn.co/image/ab67616d00001e02e230f303815e82a86713eedd",
  "https://i.scdn.co/image/ab67616d00001e02608a63ad5b18e99da94a3f73",
  "https://i.scdn.co/image/ab67616d00001e02dbeec63ad914c973e75c24df"
]

const TYPE_COLOR = "TYPE_COLOR";
const TYPE_IMG = "TYPE_IMG";

const state = {
  moves: 0,
  startingPairs: 0,
  gameType: null,
  currentlySelected: [],
  revealing: false,
  remainingPairs: 0
}

function resetState() {
  state.moves = 0;
  state.startingPairs = 0;
  state.gameType = null;
  state.currentlySelected = [];
  state.revealing = false;
  state.remainingPairs = 0;
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}


function createHeading(headStr) {
  if (document.querySelector("#heading")) {
    document.querySelector("#heading").textContent = headStr;
  } else {
    let hd = document.createElement('h2');
    hd.id = "heading";
    hd.textContent = headStr;
    document.querySelector('body').insertBefore(hd, gameContainer);
  } 
}



function generateColors(num) {
  let colors = [];
  let partitionCount = Math.ceil((num / 6));
  let partitionSize = 128;
  if (partitionCount > 1) {
    partitionSize = Math.round(128 / (partitionCount - 1));
  }
  let highNumbers = [255];
  for (let i=1; i<partitionCount; i++) {
    highNumbers.push(255 - (i * partitionSize));
  }
  // console.log(highNumbers);

  for (let hn of highNumbers) {
    ln = 255 - hn;
    colors.push(`rgb(${hn}, ${ln}, ${ln})`)
    colors.push(`rgb(${ln}, ${hn}, ${ln})`)
    colors.push(`rgb(${ln}, ${ln}, ${hn})`)
    colors.push(`rgb(${hn}, ${hn}, ${ln})`)
    colors.push(`rgb(${ln}, ${hn}, ${hn})`)
    colors.push(`rgb(${hn}, ${ln}, ${hn})`)
  }

  if (colors.length > num) {
    while (colors.length > num) {
      colors.pop();
    }
  }
  return colors;
}


// Game Logic Functions

function loadStart() {
  const startBasicButton = document.createElement("button");
  startBasicButton.className = "start-button";
  startBasicButton.textContent = "Begin Basic Game";

  const startCustomButton = document.createElement("button");
  startCustomButton.className = "start-button"
  startCustomButton.textContent = "Begin Custom Game";

  document.querySelector('#game').append(startBasicButton);
  document.querySelector('#game').append(startCustomButton);

  startBasicButton.addEventListener("click", loadBasicGame)
  startCustomButton.addEventListener("click", loadCustomGame)

}


function loadBasicGame(){
  for (let btn of document.querySelectorAll('.start-button')) {
    btn.remove();
  }
  createHeading("Basic Game");
  createMoveCounter(TYPE_IMG, 5);
  createDivs(TYPE_COLOR, COLORS);

  // set state values
  state.gameType = TYPE_COLOR;
  state.startingPairs = 5;
  state.remainingPairs = 5;
}


function loadCustomGame(){
  for (let btn of document.querySelectorAll('.start-button')) {
    btn.remove();
  }
  
  createHeading("Custom Game");

  let colorsButton = document.createElement('button');
  colorsButton.className = "choose-game-button";
  colorsButton.textContent = "Colors";
  colorsButton.addEventListener('click', function(){
    pickGameType(TYPE_COLOR)
  })
  
  let imagesButton = document.createElement('button');
  imagesButton.className = "choose-game-button";
  imagesButton.textContent = "Images";
  imagesButton.addEventListener('click', function(){
    pickGameType(TYPE_IMG);
  })

  gameContainer.append(colorsButton);
  gameContainer.append(imagesButton);  
}


function pickGameType(gameType) {
  state.gameType = gameType;
  for (let button of document.querySelectorAll('.choose-game-button')) {
    button.remove();
  }
  document.querySelector("#heading").remove();
  createHeading("How many pairs?");

  let slider = document.createElement('input');
  slider.type = "range"
  slider.defaultValue = 5;
  slider.min = 1;
  slider.max = 25;

  let confirmButton = document.createElement('button');
  confirmButton.textContent = `Start ${slider.value} pair game`;

  slider.addEventListener("change", function() {
    confirmButton.textContent = `Start ${slider.value} pair game`;
  })
  
  gameContainer.append(slider);
  gameContainer.append(confirmButton);

  confirmButton.addEventListener('click', function() {
    state.startingPairs = Number(slider.value);
    state.remainingPairs = Number(slider.value);
    
    confirmButton.remove();
    slider.remove();

    createHeading("Custom Game");
    createMoveCounter(state.gameType, state.startingPairs);
    createDivs(state.gameType, assembleDynamicDeck(state.startingPairs, state.gameType));
  })
}


function assembleDynamicDeck(noOfPairs, type) {
  let cards = [];
  if (type === TYPE_COLOR) {
    let colors = generateColors(noOfPairs);
    cards = colors.concat(colors);
  } else if (type === TYPE_IMG) {
    let imgs = IMAGES.slice(0, noOfPairs);
    cards = imgs.concat(imgs);
  }
  return shuffle(cards);
}


function createMoveCounter(type, pairs) {
  let moveCounter = document.createElement('h3');
  moveCounter.id = "move-counter";
  moveCounter.dataset = {
    moves: 0,
    type,
    pairs
  }
  moveCounter.textContent = "Moves: 0"; 
  document.querySelector('body').insertBefore(moveCounter, gameContainer);
}


function createDivs(type, array) {

  let elements = array.map(arrEl => {
    let div = document.createElement('div');
    div.addEventListener('click', handleCardClick);
    if (type === TYPE_COLOR) div.dataset.color = arrEl;
    else if (type === TYPE_IMG) div.dataset.img = arrEl;
    return div;
  })

  let shuffled = shuffle(elements);

  shuffled.forEach(sh => gameContainer.append(sh));
}


function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  let card = event.target;

  /*
  conditions: 
  cannot select a CARD that has been SOLVED
  cannot select ANYTHING during REVEAL
  */

  // cannot select a CARD that has been SOLVED
  if (card.classList.contains("solved")) {
    return;
  }

  // cannot select ANYTHING during REVEAL
  if (state.revealing) {
    console.log("Cannot select while state is revealing");
    return;
  }

  // if card was already selected, deselect
  if (card.classList.contains("selected")) {
    console.log("deselecting");
    card.classList.toggle("selected");
    state.currentlySelected = [];
    return;
  }

  // handle selection
  if (state.currentlySelected.length === 0) {
    card.classList.toggle("selected");
    state.currentlySelected.push(card);
    return;
  }

  if (state.currentlySelected.length === 1) {
    card.classList.toggle("selected");
    state.currentlySelected.push(card);
    // state.currentlySelected.length should now be 2

    state.revealing = true;
    state.currentlySelected.forEach(cs => cs.classList.toggle("revealed"));
    state.moves++;
    document.querySelector("#move-counter").textContent = `Moves: ${state.moves}`;

    // display cards
    if (state.gameType === TYPE_COLOR) {
      state.currentlySelected.forEach(cs => cs.style.backgroundColor = cs.dataset.color)
    } else if (state.gameType === TYPE_IMG) {
      state.currentlySelected.forEach(cs => cs.style.backgroundImage = `url(${cs.dataset.img}`)
    }

    // compare cards
    if (state.gameType === TYPE_COLOR) {
      if (state.currentlySelected[0].dataset.color === state.currentlySelected[1].dataset.color) {
        state.remainingPairs--;
        state.currentlySelected.forEach(cs => cs.classList.toggle("solved"));

        // winning condition
        if (state.remainingPairs === 0) {
          console.log("You won!");
          handleWin();
        }
      }
    } else if (state.gameType === TYPE_IMG) {
      if (state.currentlySelected[0].dataset.img === state.currentlySelected[1].dataset.img) {
        state.remainingPairs--;
        state.currentlySelected.forEach(cs => cs.classList.toggle("solved"));

        // winning condition
        if (state.remainingPairs === 0) {
          if (state.remainingPairs === 0) {
            console.log("You won!");
            handleWin();
          }
        }
      }
    }

    // move on
    setTimeout(function() {
      for (let selected of document.querySelectorAll(".selected")) {
        selected.classList.toggle("selected");
        
        // reset card that isn't solved
        if (!selected.classList.contains("solved")) {
          selected.style.backgroundColor = "";
          selected.style.backgroundImage = "";
          selected.classList.toggle("revealed");
        }
      }
      state.revealing = false;
      state.currentlySelected = [];
    }, 1000)
  }
}


function handleWin() {

  let winningMessage = "";
  let typePhrase = "";
  if (state.gameType === TYPE_COLOR) typePhrase = "colors";
  else if (state.gameType === TYPE_IMG) typePhrase = "images";

  // handle high score
  if (!localStorage.highScores) {
    localStorage.setItem("highScores", "{}");
  } 
  let hsObj = JSON.parse(localStorage.highScores);
  
  state.gameType;
  if (hsObj[state.gameType]) {
    if (hsObj[state.gameType][state.startingPairs]) {
      if (state.moves > hsObj[state.gameType][state.startingPairs]) {
        winningMessage = `You completed ${state.startingPairs} pairs of ${typePhrase} in ${state.moves} moves, but the score to beat remains ${hsObj[state.gameType][state.startingPairs]}!`
      }
      else if (state.moves < hsObj[state.gameType][state.startingPairs]) {
        winningMessage = `You completed ${state.startingPairs} pairs of ${typePhrase} in ${state.moves} moves, beating the previous best score of ${hsObj[state.gameType][state.startingPairs]}! Congratulations!`;
        hsObj[state.gameType][state.startingPairs] = state.moves;
      }
      else if (state.moves = hsObj[state.gameType][state.startingPairs]) {
        winningMessage = `You completed ${state.startingPairs} pairs of ${typePhrase} in ${state.moves} moves, which tied the previous best score!`;
      }
    } else {
      winningMessage = `You're the first to play with ${state.startingPairs} pairs of ${typePhrase}, and you've set the score to beat at ${state.moves}!`;
    }
  } else {
    hsObj[state.gameType] = {};
    hsObj[state.gameType][state.startingPairs] = state.moves;
    winningMessage = `You're the first to play with ${state.startingPairs} pairs of ${typePhrase}, and you've set the score to beat at ${state.moves}!`;
  }
  
  localStorage.setItem("highScores", JSON.stringify(hsObj));

  // render winning message
  let msgH = document.createElement("h1");
  msgH.textContent = winningMessage;

  let playAgainBtn = document.createElement('button');
  playAgainBtn.textContent = "Play Again?";
  playAgainBtn.addEventListener('click', function(){
    resetState();
    document.querySelector("#heading").remove();
    document.querySelector("#move-counter").remove();
    gameContainer.innerHTML = "";
    loadStart();
  });

  gameContainer.innerHTML = "";
  gameContainer.append(msgH);
  gameContainer.append(playAgainBtn);
}


// when the DOM loads
loadStart();