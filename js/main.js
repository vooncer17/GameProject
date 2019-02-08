/*----- constants -----*/ 



/*----- app's state (variables) -----*/ 

let p1UpPressed=false
let p1DownPressed=false
let p2UpPressed=false
let p2DownPressed=false
let bPressed=false
let vertBallMove=[1.1,-1]
let horiBallMove=[1.1,1]
let vertMove = 0;
let horiMove = 0;

/*----- cached element references -----*/ 
var boardLength  = 400
var boardWidth = 600
var paddleLength = 80
var paddleWidth = 10
var ballDiameter = 10

var s1 = []
var s2 = []
var playAgain = document.createElement ('button')
var winner = document.querySelector('winner')
var score1 = document.querySelector('#s1')
var score2 = document.querySelector('#s2')
const p1 = document.querySelector('#P1')
const p2 = document.querySelector('#P2')
const ball = document.querySelector('#Ball')
vertp1Pos = document.querySelector("#P1").style.top = 0;
horip1Pos = document.querySelector("#P1").style.left = 5;
vertp2Pos = document.querySelector("#P2").style.top = 0;
horip2Pos = document.querySelector("#P2").style.left = 395;
vertBallPos = document.querySelector("#Ball").style.top= 0;
horiBallPos = document.querySelector("#Ball").style.left= 0;

/*----- event listeners -----*/ 

window.addEventListener('keydown', keyDownHandler, false)
window.addEventListener('keyup', keyUpHandler, false)


/*----- functions -----*/

setInterval(draw, 5)

function draw () {
    drawPaddles()
    startBall()
    checkWin()
}

function checkWin() {
    if (s2.length===3) {
        winner.innerHTML = 'player 2 won! press b to play again'
        s1 = []
        s2 = []
        score2.innerHTML=s2.length
        score1.innerHTML=s1.length
    }
    if (s1.length===3) {
        winner.innerHTML = 'player 1 won! press b to play again'
        s1 = []
        s2 = []
        score2.innerHTML=s2.length
        score1.innerHTML=s1.length
    }
}

// I want startBall to listen for a b key, then generate a vertBallMove/horiBallMove value

function startBall() {
    if (bPressed==='true') {
        winner.innerHTML=''
        drawBall()
    }
}

// There is an issue with the horizontal movement and detection of the ball when its style.left is set to a non-zero value

function drawBall() {
    // If ball is between the two walls
        if (parseInt(ball.style.top) > -1*(boardLength/2 - ballDiameter/2) && parseInt(ball.style.top)<(boardLength/2 - ballDiameter/2)) {
            vertMove = vertBallMove[0]
            horiMove = horiBallMove[0]
            ball.style.top = (parseInt(ball.style.top) + vertMove + "px")
            ball.style.left = (parseInt(ball.style.left) + horiMove + "px")
            vertBallPos = ball.style.top
            horiBallPos = ball.style.left 
        }
    // If ball hits one of the two walls
        else if (parseInt(ball.style.top) === -1*(boardLength/2 - ballDiameter/2) || parseInt(ball.style.top) === (boardLength/2 - ballDiameter/2)) {
            vertBallMove[0] = vertBallMove[0]*-1
            vertMove = vertBallMove[0]
            horiMove = horiBallMove[0]
            ball.style.top = (parseInt(ball.style.top) + vertMove + "px")
            ball.style.left = (parseInt(ball.style.left) + horiMove + "px")
            vertBallPos = ball.style.top
            horiBallPos = ball.style.left
        }
    // If ball hits the right paddle, bounce it back
        if ((parseInt(ball.style.left) === (boardWidth/2 - ballDiameter)) 
        && (parseInt(ball.style.top)>=(parseInt(p2.style.top)-(paddleLength/2)))
        && (parseInt(ball.style.top)<=(parseInt(p2.style.top)+(paddleLength/2)))
        ) {            
            horiBallMove[0] = horiBallMove[0]*-1.04
            vertBalLMove[0] = vertBallMove[0]*1.04
            horiMove = horiBallMove[0]
            vertMove = vertBallMove[0]
            ball.style.left = (parseInt(ball.style.left) + horiMove + "px")
            vertBallPos = ball.style.top
            horiBallPos = ball.style.left
        }
    // If ball hits the left paddle, bounce it back
        if ((parseInt(ball.style.left) === -1*(boardWidth/2 - ballDiameter/2)) 
        && (parseInt(ball.style.top)<=(parseInt(p1.style.top)+(paddleLength/2)))
        && (parseInt(ball.style.top)>=(parseInt(p1.style.top)-(paddleLength/2)))
        ) {
            horiBallMove[0] = horiBallMove[0]*-1.04
            vertBalLMove[0] = vertBallMove[0]*1.04
            horiMove = horiBallMove[0]
            vertMove = vertBallMove[0]
            ball.style.left = (parseInt(ball.style.left) + horiMove + "px")
            vertBallPos = ball.style.top
            horiBallPos = ball.style.left
        }

    // If ball hits a wall and a paddle isn't, snap it back to the middle
        if (parseInt(ball.style.left) === -(boardWidth/2)) {
            ball.style.top = 0
            ball.style.left = 0
            bPressed = 'false'
            s2.push('1')
            score2.innerHTML=s2.length

        }
        if (parseInt(ball.style.left) === (boardWidth/2)) {
            ball.style.top = 0
            ball.style.left = 0
            bPressed = 'false'
            s1.push('1')
            score1.innerHTML=s1.length

        }

}

function drawPaddles() {
    if (p1UpPressed==='true' && parseInt(p1.style.top)>= 2+-(boardLength/2 -paddleLength/2)) {
        p1.style.top = (parseInt(p1.style.top) - 2 + "px")
        vertp1Pos = p1.style.top
    }
    if (p1UpPressed==='true' && parseInt(p1.style.top)=== 2+-(boardLength/2 -paddleLength/2)) {
        p1.style.top = "-160px"
        vertp1Pos = p1.style.top
    }
    if (p1DownPressed==='true' && parseInt(p1.style.top)<= +(boardLength/2 -paddleLength/2)) {
        p1.style.top = (parseInt(p1.style.top) + 2 +"px")
        vertp1Pos = p1.style.top
    }
    if (p1DownPressed==='true' && parseInt(p1.style.top)>= 2+(boardLength/2 -paddleLength/2)) {
        p1.style.top = "166px"
        vertp1Pos = p1.style.top
    }
    if (p2UpPressed==='true' && parseInt(p2.style.top)>=-(boardLength/2 -paddleLength/2)) {
        p2.style.top = (parseInt(p2.style.top) - 2 +"px")
        vertp2Pos = p2.style.top
    }
    if (p2UpPressed==='true' && parseInt(p2.style.top)<=-(boardLength/2 -paddleLength/2)) {
        p2.style.top = "-160px"
        vertp2Pos = p2.style.top
    }
    if (p2DownPressed==='true' && parseInt(p1.style.top)<=(boardLength/2 -paddleLength/2)) {
        p2.style.top = (parseInt(p2.style.top) + 2 +"px")
        vertp2Pos = p2.style.top
    }
    if (p2DownPressed==='true' && parseInt(p2.style.top)>=(boardLength/2 -paddleLength/2)) {
        p2.style.top = "166px"
        vertp2Pos = p2.style.top
    }
}

function keyDownHandler(evt) {
    var x=evt.key
    if (x=="Right" || x=="ArrowRight") {
        p2UpPressed='true'
    }
    if (x=="Left" || x=="ArrowLeft") {
        p2DownPressed='true'
    }
    if (x=="a") {
        p1UpPressed='true'
    }   
    if (x=="z") {
        p1DownPressed='true'
    }
    if (x=="b") {
        bPressed="true"
    }
}

function keyUpHandler(evt) {
    var x=evt.key
    if (x=="Right" || x=="ArrowRight") {
        p2UpPressed='false'
    }
    if (x=="Left" || x=="ArrowLeft") {
        p2DownPressed='false'
    }
    if (x=="a") {
        p1UpPressed='false'
    }
    if (x=="z") {
        p1DownPressed='false'
    }
}