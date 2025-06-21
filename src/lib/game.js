import Paddle from './paddle.js';
import Ball from './ball.js';
// import Brick from './brick.js';
import InputHandler from './inputHandler.js';
import { buildLevel, level1, level2, level3, level4 } from './levels.js';

let newLevel = new Audio('../../assets/sounds/newLevel.mp3');

const gameState = {
    paused: 0,
    running: 1,
    menu: 2,
    gameOver: 3,
    newLevel: 4,
    finishedGame: 5
};

export default class Game {
    constructor (gameW, gameH) {
        this.gameW = gameW;
        this.gameH = gameH;

        this.gameState = gameState.menu;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);

        this.lives = 3;
        this.score = 0;
        this.multiplier = 1;

        this.gameObjects = [];

        this.levels = [level1, level2, level3, level4];
        this.currentLevelIndex = 0;

        this.bricks = buildLevel(this, this.levels[this.currentLevelIndex]);

        new InputHandler(this.paddle, this);
    }

    start () {
        if (this.gameState !== gameState.menu && this.gameState !== gameState.gameOver && this.gameState !== gameState.newLevel) {
            return;
        } else {
            this.paddle.reset();
            this.ball.reset();

            this.bricks = buildLevel(this, this.levels[this.currentLevelIndex]);

            this.gameObjects = [
                this.paddle,
                this.ball
            ];

            this.gameState = gameState.running;
        }
    }

    update (deltaTime) {
        if (this.lives === 0) {
            this.gameState = gameState.gameOver;
        }

        if (this.gameState === gameState.paused || this.gameState === gameState.menu || this.gameState === gameState.gameOver || this.gameState === gameState.newLevel) {
            return;
        } else {
            let gameObjects = [...this.gameObjects, ...this.bricks];

            gameObjects.forEach((object) => object.update(deltaTime));
            this.bricks = this.bricks.filter(object => !object.markedForDeletion);
            // this.bricks.forEach(object => {
            //     if (object.markedForDeletion) {
            //         this.score = this.score + object.objectPoints;
            //     }
            // });
        }
    }

    draw (ctx) {
        // Draw level to the screen
        ctx.font = 'bold 18px Courier New';
        ctx.fillStyle = `rgb(1, 198, 0)`;
        ctx.shadowColor = `rgb(1, 198, 0)`;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = `rgba(1, 198, 0, 0.8)`;
        ctx.textAlign = 'left';

        ctx.fillText(`STAGE ${String(this.multiplier).padStart(3, '0')} LVL ${String(1 + this.currentLevelIndex).padStart(3, '0')}`, 10, 20);

        // Draw Score to the screen
        ctx.font = 'bold 18px Courier New';
        ctx.fillStyle = `rgb(0, 148, 247)`;
        ctx.shadowColor = `rgb(0, 148, 247)`;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = `rgba(0, 148, 247, 0.8)`;
        ctx.textAlign = 'center';

        ctx.fillText(`SCORE ${String(this.score).padStart(7, '0')}`, this.gameW / 2, 20);

        // Draw Lives to the screen
        let lives = '';
        ctx.font = 'bold 20px Segoe UI';
        ctx.fillStyle = `rgb(246, 0, 1)`;
        ctx.shadowColor = `rgb(246, 0, 1)`;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = `rgba(246, 0, 1, 0.8)`;
        ctx.lineWidth = this.lineWidth;
        ctx.textAlign = 'right';

        for (let i = 0; i < this.lives; i++) {
            lives = lives + '♥';
        }

        lives = String(lives).padStart(3, '♡');

        ctx.fillText(lives, this.gameW - 10, 20);

        let gameObjects = [...this.gameObjects, ...this.bricks];
        gameObjects.forEach((object) => object.draw(ctx));

        if (this.bricks.length === 0) {
            console.log('New level');
            if(this.gameState !== gameState.newLevel) {
                this.currentLevelIndex++;
                // Load next level
                if (typeof this.levels[this.currentLevelIndex] === 'undefined') {
                    this.currentLevelIndex = 0;
                    this.multiplier++;
                    this.ball.speed = this.ball.speed + 0.25;
                }

                newLevel.loop = false;
                newLevel.play();

                this.gameState = gameState.newLevel;
            }
        }

        if (this.gameState === gameState.newLevel) {

            ctx.rect(0, 0, this.gameW, this.gameH);
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            ctx.shadowColor = `rgb(0, 0, 0, 1)`;
            ctx.shadowBlur = 10;
            ctx.strokeStyle = `rgba(0, 0, 0, 0.8)`;
            ctx.fill();

            ctx.font = 'bold 30px Courier New';
            ctx.fillStyle = `rgb(0, 148, 247)`;
            ctx.shadowColor = `rgb(0, 148, 247)`;
            ctx.shadowBlur = 10;
            ctx.strokeStyle = `rgba(0, 148, 247, 0.8)`;
            ctx.textAlign = 'center';
            ctx.fillText('YOUR REACHED NEW LEVEL!', this.gameW / 2, this.gameH / 2 - 15);
            ctx.fillText(`STAGE ${String(this.multiplier).padStart(3, '0')} LVL ${String(1 + this.currentLevelIndex).padStart(3, '0')}`, this.gameW / 2, this.gameH / 2 + 15);

            setTimeout(function (){
                this.start();
            }.bind(this), 6000);
        }

        if (this.gameState === gameState.paused) {
            ctx.rect(0, 0, this.gameW, this.gameH);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.shadowColor = `rgb(0, 0, 0, 1)`;
            ctx.shadowBlur = 10;
            ctx.strokeStyle = `rgba(0, 0, 0, 0.8)`;
            ctx.fill();

            ctx.font = 'bold 30px Courier New';
            ctx.fillStyle = `rgb(0, 148, 247)`;
            ctx.shadowColor = `rgb(0, 148, 247)`;
            ctx.shadowBlur = 10;
            ctx.strokeStyle = `rgba(0, 148, 247, 0.8)`;
            ctx.textAlign = 'center';
            ctx.fillText('Game Is Paused!', this.gameW / 2, this.gameH / 2);
        }

        if (this.gameState === gameState.gameOver) {
            ctx.rect(0, 0, this.gameW, this.gameH);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.shadowColor = `rgb(0, 0, 0, 1)`;
            ctx.shadowBlur = 10;
            ctx.strokeStyle = `rgba(0, 0, 0, 0.8)`;
            ctx.fill();

            ctx.font = 'bold 30px Courier New';
            ctx.fillStyle = `rgb(246, 0, 1)`;
            ctx.shadowColor = `rgb(246, 0, 1)`;
            ctx.shadowBlur = 10;
            ctx.strokeStyle = `rgba(246, 0, 1, 0.8)`;
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER!', this.gameW / 2, this.gameH / 2 - 50);

            ctx.font = 'bold 40px Courier New';
            ctx.fillStyle = `rgb(247, 198, 0)`;
            ctx.shadowColor = `rgb(247, 198, 0)`;
            ctx.shadowBlur = 10;
            ctx.strokeStyle = `rgba(247, 198, 0, 0.8)`;
            ctx.textAlign = 'center';
            ctx.fillText(`YOUR SCORE ${String(this.score).padStart(7, '0')}`, this.gameW / 2, this.gameH / 2);

            ctx.font = 'bold 30px Courier New';
            ctx.fillStyle = `rgb(0, 148, 247)`;
            ctx.shadowColor = `rgb(0, 148, 247)`;
            ctx.shadowBlur = 10;
            ctx.strokeStyle = `rgba(0, 148, 247, 0.8)`;
            ctx.textAlign = 'center';
            ctx.fillText('Press [Space Bar] to start new game!', this.gameW / 2, this.gameH / 2 + 50);
        }

        if (this.gameState === gameState.menu) {
            ctx.rect(0, 0, this.gameW, this.gameH);
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            ctx.shadowColor = `rgb(0, 0, 0, 1)`;
            ctx.shadowBlur = 10;
            ctx.strokeStyle = `rgba(0, 0, 0, 0.8)`;
            ctx.fill();

            ctx.font = 'bold 30px Courier New';
            ctx.fillStyle = `rgb(0, 148, 247)`;
            ctx.shadowColor = `rgb(0, 148, 247)`;
            ctx.shadowBlur = 10;
            ctx.strokeStyle = `rgba(0, 148, 247, 0.8)`;
            ctx.textAlign = 'center';
            ctx.fillText('Press [Space Bar] to start!', this.gameW / 2, this.gameH / 2);
        }
    }

    togglePause () {
        if (this.gameState === gameState.paused) {
            this.gameState = gameState.running;
        } else {
            this.gameState = gameState.paused;
        }
    }
}
