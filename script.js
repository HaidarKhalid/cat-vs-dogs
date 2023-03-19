
// set best score in localstorage
if (localStorage.getItem('pb')) console.log('pb : ' + localStorage.getItem('pb'))
else {
    localStorage.setItem('pb', 0)
}


//set the score vars
let score = 0
let scoreViewer = document.getElementById("scoreEl")
scoreViewer.innerText = score
let scoreViewerLoser = document.getElementById("scoreElLose")
let bestScoreViewer = document.getElementById("bestScoreEl")
let personalBest = localStorage.getItem('pb')
bestScoreViewer.innerText = personalBest
let scoreCounter;


//import sfx
let jumpSfx = document.querySelector('.jumpSfx')
let dieSfx = document.querySelector('.dieSfx')
let muted = false

// set the player and enemy vars 
let playerEl = document.querySelector('.player')
let waterHEl = document.querySelector('.water-h')

// set some configrations we need
    // jumppedCheck means if the player is currently jumping or not
let jumppedCheck = false
    //we need firestJump to check if the player started the game
let firstJump = true

//loseDiv is the block showing when losing, it has the final score 
let loseDiv = document.getElementById("loseDiv")

let finishGameDiv = document.querySelector('.finishGameDiv')
let finishGameBoolean = false
// jumping function
function jumpPlayer() {
    if (!finishGameBoolean) {
    if (firstJump) { // this is the first jump, start counting score and make the enemy move
        firstJump = false
        playerEl.classList.add("jumping")
        waterHEl.classList.add('waterMove')
        jumppedCheck = true
        setTimeout(()=>{
            playerEl.classList.remove("jumping");
            jumppedCheck = false
        }, 700/*ms, this is how much jump take time */)
        // start score intereval
        scoreCounter = setInterval(()=> {
            if (personalBest <= score) { // make new best score
                score++
                personalBest = score
                scoreViewer.innerText = score
                localStorage.setItem('pb', personalBest)
                bestScoreViewer.innerHTML = personalBest
            } else { // keep going on regular score 
                score++
                scoreViewer.innerText = score
            }
            if (score >= 1200) {
                finishGameDiv.style.display = 'flex'
                finishGameBoolean = true
                clearInterval(scoreCounter)
                clearInterval(runningIntere)
            }
        }, 500)

        if (!muted) {jumpSfx.play()}
    }
    if (!jumppedCheck) { // this is not the first jump, just keep jumping
        
        if (!muted) {jumpSfx.play()}
        playerEl.classList.add("jumping")
        jumppedCheck = true
        setTimeout(()=>{
            playerEl.classList.remove("jumping");
            jumppedCheck = false
        }, 700/*ms, this is how much jump take time */)
    }
} else console.log('you win')
}

// Vars needed     
        /*  h = playerEl.offsetTop dont need
            py = playerEl.clientHeight dont need
            wx = waterHEl.clientWidth dont need 
        */
    let d = waterHEl.offsetLeft
    let px = playerEl.clientWidth
    let wy = waterHEl.clientHeight
    let ob =  playerEl.offsetParent.offsetHeight - playerEl.offsetTop - playerEl.offsetHeight;


let runningIntere = setInterval(()=> {
        /*  h = playerEl.offsetTop dont need
            py = playerEl.clientHeight dont need
            wx = waterHEl.clientWidth dont need 
        */
    d = waterHEl.offsetLeft
    px = playerEl.clientWidth
    wy = waterHEl.clientHeight
    ob =  playerEl.offsetParent.offsetHeight - playerEl.offsetTop - playerEl.offsetHeight;

    if (ob >= wy) { // Jumped and pass
    } else if (px > d && ob < wy) { // maybe jumpped but he hit the enemy, then lose 
        
        console.log('you lost')
        
        // show hidden lostDiv 
        loseDiv.style.display = 'flex'
        // stop counting score
        clearInterval(scoreCounter)
        // show final score on loseDiv ScoreViwer
        scoreViewerLoser.innerHTML = score

        
        waterHEl.classList.remove('waterMove')
        
        if (!muted) {dieSfx.play()}
    }
}, 5)



// replay
function replay() {
    score = 0
    loseDiv.style.display = 'none'
    firstJump = true
    setInterval(scoreCounter)
}


// mute / unmute sfx 
let muteBtn = document.querySelector('.muteSfx')
function muteSfx() {
    if (muted) {
        muted = false
        muteBtn.style = `
            background: red;
            color: white;
        `
        console.log(muted)
    } else {
        muted = true
        muteBtn.style = `
            background: white;
            color: red;
        `
        console.log(muted)
    }
}
