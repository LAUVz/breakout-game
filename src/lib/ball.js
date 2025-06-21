import { detectCollusion } from './collusionDetection.js';
const hitVoid = new Audio('../../assets/sounds/loss.ogg');
const hitPaddle = new Audio('../../assets/sounds/squarebutton_rollover.mp3');
const hitWall = new Audio('../../assets/sounds/squarebutton_rollover.mp3');

export default class Ball {
    constructor (game) {
        this.radius = 10;
        this.lineWidth = 4;

        this.defaultSpeed = 2;

        this.gameW = game.gameW;
        this.gameH = game.gameH;

        this.game = game;

        this.hitBoxSize = this.radius + this.lineWidth / 2;
        this.hitBoxThreshold = this.radius / 2 + this.lineWidth + 2;

        this.reset();
    }

    reset () {
        this.position = {
            x: this.gameW / 2 - this.radius / 2 + this.lineWidth + 1,
            y: this.gameH - this.radius - (30 + this.lineWidth / 2)
        };

        this.speed = {
            x: 0,
            y: 0
        };
    }

    draw(ctx) {
        ctx.shadowColor = 'rgb(255,20,147)';
        ctx.shadowBlur = 10;
        ctx.strokeStyle= 'rgba(255,20,147, 0.8)';
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    update (deltaTime) {
        if (!deltaTime) {
            return;
        } else {
            // To Do
            this.position.x += this.speed.x;
            this.position.y += this.speed.y;

            // Collision with the wall to left and right of the screen
            if (this.position.x > this.gameW - this.hitBoxThreshold || this.position.x < this.hitBoxThreshold) {
                this.speed.x = -this.speed.x;
                hitWall.play();
            }

            // Collision with the wall on top and bottom of the screen
            if (this.position.y > this.gameH - this.hitBoxThreshold) {
                // this.speed.y = -this.speed.y;
                this.game.lives--;
                this.game.paddle.reset();
                this.game.ball.reset();
                // this.speed.y = 0;
                // this.speed.x = 0;

                // console.log('this.game.lives', this.game.lives);

                hitVoid.play();
            }

            // Collision with the wall on top and bottom of the screen
            if (this.position.y < this.hitBoxThreshold) {
                this.speed.y = -this.speed.y;
                hitWall.play();
            }

            // // Ball bounds
            // let ballBottom = this.position.y + this.hitBoxThreshold;

            // // Paddle bounds
            // let paddleTop = this.game.paddle.position.y;
            // let paddleLeft = this.game.paddle.position.x;
            // let paddleRight = this.game.paddle.position.x + this.game.paddle.width;
            // Collision with the paddle
            // if (ballBottom >= paddleTop && this.position.x + this.hitBoxThreshold >= paddleLeft && this.position.x - this.hitBoxThreshold <= paddleRight) {
            if (detectCollusion(this, this.game.paddle)) {
                hitPaddle.play();
                this.speed.y = -this.speed.y;
                this.position.y = this.game.paddle.position.y - this.hitBoxThreshold;
            }
        }
    }
}
