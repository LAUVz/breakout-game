// import Paddle from './lib/paddle.js';
// import Ball from './lib/ball.js';
// import InputHandler from './lib/inputHandler.js';
import Game from './lib/game.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const gameW = canvas.clientWidth;
const gameH = canvas.clientHeight;

console.log('[Game] gameW', gameW);
console.log('[Game] gameH', gameH);

const game = new Game(gameW, gameH);

let oldTimeStamp = 0;
// let secondsPassed = 0;
// let fps = 0;

function gameLoop (timeStamp) {
    let deltaTime = timeStamp - oldTimeStamp;
    // Calculate the number of seconds passed since the last frame
    // secondsPassed = deltaTime / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    // fps = Math.round(1 / secondsPassed);

    ctx.clearRect(0, 0, gameW, gameH);

    game.update(deltaTime);
    game.draw(ctx);

    // Draw number to the screen
    // ctx.font = '12px Arial';
    // ctx.fillStyle = 'white';
    // ctx.fillText(`FPS: ${fps}`, 10, 15);

    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
