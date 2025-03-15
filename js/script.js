const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const startButton = document.querySelector('.btn-start');
const score = document.querySelector('.score');
const record = document.querySelector('.record');
var started = false;

var pipeDistanceLeft = 73;
var pipeDistanceBottom = 40;
var marioWidth = 40;
var marioRunWidth = 75;
var marioLeft = 30;

const jump = () => {
    let marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if(marioPosition == 0) {
        mario.classList.add('jump');
    }

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loadGame = () => {
    if(window.innerWidth < 767) {
        // Mobile
        pipeDistanceLeft = 73;
        pipeDistanceBottom = 40;
        marioWidth = 40;
        marioLeft = 30;
        marioRunWidth = 75;
    } else {  
        // Desktop
        pipeDistanceLeft = 120;
        pipeDistanceBottom = 75;
        marioWidth = 80;
        marioLeft = 38;
        marioRunWidth = 150;
    }

    record.innerText = localStorage.getItem("record") ?? 0;

    return false;
}



window.onload = loadGame;
window.onresize = loadGame;

const startGame = () => {

    loadGame
    started = true
    document.addEventListener('keydown', jump);
    document.addEventListener('click', jump);
    document.addEventListener('touchstart', jump);

    pipe.style.left = `unset`;
    pipe.style.animation = 'pipe-animation 1.5s infinite linear';

    mario.style.width = `${marioRunWidth}px`;
    mario.src = './images/mario.gif';
    mario.style.animation = '';


    clouds.style.right = 'unset';
    clouds.style.animation = 'clouds-animation 20s infinite linear';

    startButton.style.display = 'none';



    let scoreCount = 0;

    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const cloudsPosition = +window.getComputedStyle(clouds).right.replace('px', '');
        score.innerText = scoreCount;

        // Game over
        if (started == true && pipePosition <= pipeDistanceLeft && pipePosition > 0 && marioPosition < pipeDistanceBottom) {
            started = false;

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = './images/game-over.png'
            mario.style.width = `${marioWidth}px`;
            mario.style.marginLeft = `${marioLeft}px`;
    
            clouds.style.animation = 'none';
            clouds.style.right = `${cloudsPosition}px`;
    
            recordCount = localStorage.getItem('record');
            recordCount = recordCount < scoreCount ? scoreCount : recordCount;
            localStorage.setItem('record', recordCount);


            startButton.style.display = 'block';
            startButton.innerText = 'JOGAR NOVAMENTE';

            clearInterval(loop);
        }
        scoreCount++;
    }, 10);
}

startButton.keydown = startGame;
startButton.onclick = startGame;
startButton.touchstart = startGame;


