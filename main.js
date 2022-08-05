//get all elements
const gameButton = document.getElementById('game')
const gameText = document.getElementById('game-text')
const earlyText = document.getElementById('early-text')
const restartButton = document.getElementById('restart')
const instructions = document.getElementById('explanation')
//set colors
const pressColor = "#8AAA79"
const earlyColor = "#BD6B73"
const waitColor = "#F3CA40"

//declare waiting time variable
let time

//call to start game
startGame()
// gameButton.addEventListener('click', changeToWaiting)

function startGame() {
    //remove start game event listener since game has already started
    gameButton.removeEventListener('click', startGame)
    //add event listener that will change screen to "waiting" mode
    gameButton.addEventListener('click', changeToWaiting)

    //randomly generate waiting time
    time = Math.random() * 6 + 2

    //hide instruction and restart button elements
    instructions.style.visibility = 'visible'
    restartButton.style.visibility = 'hidden'
    //update styles of the screen to indicate to the user that they can press to begin the waiting sequence
    gameButton.style.backgroundColor = pressColor
    //include text to prompt the user
    gameText.innerHTML = 'press to start'
}

let timeoutID;

function changeToWaiting() {
    //set event listeners
    gameButton.removeEventListener('click', changeToWaiting)
    //add event listener to end the game if the user presses before they are allowed to
    gameButton.addEventListener('click', tooEarly)

    //hide elements
    instructions.style.visibility = 'hidden'
    //update styles to show that the user is in the waiting phase
    gameButton.style.backgroundColor = waitColor
    gameText.innerHTML = 'wait...'
    //set time out
    timeoutID = setTimeout(changeToPress, time * 1000)
}

function tooEarly() {
    //set event listeners
    gameButton.removeEventListener('click', tooEarly)
    gameButton.addEventListener('click', startGame)
    clearTimeout(timeoutID)
    //update styles
    gameButton.style.backgroundColor = earlyColor
    gameText.innerHTML = 'too early! click to try again'
}

//declare reaction time starting variable
let startTime

function changeToPress() {
    //update event listeners
    gameButton.removeEventListener('click', tooEarly)
    gameButton.addEventListener('click', pressed)
    //update styles to prompt the user to press
    gameButton.style.backgroundColor = pressColor
    gameText.innerHTML = 'press!'
    //start tracking reaction time
    startTime = new Date()
}

function pressed() {
    //update event listeners
    gameButton.removeEventListener('click', pressed)
    gameButton.addEventListener('click', startGame)
    //calculate reaction time
    let endTime = new Date()
    let elapsed = endTime - startTime
    //update style to show user their reaction time
    gameText.innerHTML = 'your reaction time is: ' + Math.round(elapsed) + ' milliseconds'
    //show text to prompt user to play again (changed to not actually be a button)
    restartButton.style.visibility = 'visible'
}

