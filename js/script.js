const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const start = document.querySelector('.start');
const score = document.querySelector('.score');
//pipe.style.animationDuration = `${0.0015 * window.innerWidth}s`;

var pipeDistanceLeft = 73;
var pipeDistanceBottom = 40;
var marioWidth = 40;
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
    } else {  
        // Desktop
        pipeDistanceLeft = 120;
        pipeDistanceBottom = 75;
        marioWidth = 80;
        marioLeft = 38;
    }

    return false;
}

window.onload = loadGame;
window.onresize = loadGame;

const startGame = () => {

    document.addEventListener('keydown', jump);
    document.addEventListener('click', jump);
    document.addEventListener('touchstart', jump);

    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        let marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const cloudsPosition = +window.getComputedStyle(clouds).right.replace('px', '');
    
        if (pipePosition <= pipeDistanceLeft && pipePosition > 0 && marioPosition < pipeDistanceBottom) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;
    
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = './images/game-over.png'
            mario.style.width = `${marioWidth}px`;
            mario.style.marginLeft = `${marioLeft}px`;
    
            clouds.style.animation = 'none';
            clouds.style.right = `${cloudsPosition}px`;
    
            clearInterval(loop);
        }
    }, 10);
}



