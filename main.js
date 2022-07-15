const gameButton = document.getElementById('game')
const gameText = document.getElementById('game-text')
const restartButton = document.getElementById('restart')

const time = Math.random() * 5 + 1

gameButton.addEventListener('click', changeToWaiting)

function startGame() {
    gameButton.style.backgroundColor = 'lightskyblue'
    gameText.innerHTML = 'press to start'
    gameButton.style.cursor = 'pointer'
    restartButton.style.visibility = 'hidden'
    gameButton.addEventListener('click', changeToWaiting)
    restartButton.style.visibility = 'hidden'
    restartButton.removeEventListener('click', startGame)
}

function changeToWaiting() {
    gameButton.removeEventListener('click', changeToWaiting)
    gameButton.style.backgroundColor = 'tomato'
    gameText.innerHTML = 'wait...'
    gameText.style.color = 'white'
    setTimeout(changeToPress, time * 1000)
}

let startTime

function changeToPress() {
    gameButton.style.backgroundColor = 'darkseagreen'
    gameText.innerHTML = 'press!'
    gameText.style.color = 'black'
    startTime = new Date()
    gameButton.addEventListener('click', pressed)
}

function pressed() {
    gameButton.removeEventListener('click', pressed)
    gameButton.style.cursor = 'default'
    let endTime = new Date()
    let elapsed = endTime - startTime
    gameText.innerHTML = 'your reaction time is: ' + Math.round(elapsed) + ' milliseconds'
    restartButton.style.visibility = 'visible'
    restartButton.addEventListener('click', startGame)
}

