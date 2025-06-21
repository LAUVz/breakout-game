export default class Paddle {
    constructor (game) {
        this.gameW = game.gameW;
        this.gameH = game.gameH;
        this.game = game;
        this.width = 150;
        this.height = 20;

        this.speed = 7;

        this.reset();
    }

    reset () {
        this.move = 0;
        this.position = {
            x: this.gameW / 2 - this.width / 2,
            y: this.gameH - this.height - 10
        };
    }

    moveLeft () {
        this.move = -this.speed;

        if (this.game.ball.speed.x === 0 && this.game.ball.speed.y === 0) {
            this.game.ball.position.x = this.game.ball.position.x - this.speed;
            this.game.ball.speed.x = -this.game.ball.defaultSpeed;
            this.game.ball.speed.y = -this.game.ball.defaultSpeed;
        }
    }

    moveRight () {
        this.move = this.speed;

        if (this.game.ball.speed.x === 0 && this.game.ball.speed.y === 0) {
            this.game.ball.position.x = this.game.ball.position.x + this.speed;
            this.game.ball.speed.x = this.game.ball.defaultSpeed;
            this.game.ball.speed.y = -this.game.ball.defaultSpeed;
        }
    }

    stop () {
        this.move = 0;
    }

    draw(ctx) {
        ctx.fillStyle = 'rgb(13 , 213, 252)';
        ctx.shadowColor = 'rgb(13 , 213, 252)';
        ctx.shadowBlur = 10;
        // ctx.strokeStyle = 'rgba(13 , 213, 252, 0.2)';
        // ctx.lineWidth = 7.5;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        // ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        // Moving paddle
        this.position.x += this.move;

        // Blocking paddle going past left bounds of screen
        if (this.position.x < 0) {
            this.position.x = 0;
        }

        // Blocking paddle going past right bounds of screen
        if (this.position.x + this.width > this.gameW) {
            this.position.x = this.gameW - this.width;
        }
    }
}
