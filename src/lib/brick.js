import { detectCollusion } from './collusionDetection.js';

let destroy = new Audio('../../assets/sounds/click4.mp3');

export default class Brick {
    constructor (game, position, row, typeIndex, powerUpIndex) {
        this.lineWidth = 4;
        this.width = 64;
        this.height = 24;

        this.game = game;
        this.position = position;

        this.row = row;
        this.typeIndex = typeIndex;
        this.powerUpIndex = powerUpIndex;

        this.objectPoints = 10 * typeIndex;

        this.markedForDeletion = false;
    }

    draw(ctx) {
        // let colorIndex = [
        //     {
        //         r: 0, 
        //         g: 148,
        //         b: 247
        //     }
        // ];

        // ctx.shadowColor = 'rgb(255,20,147)';
        // ctx.shadowBlur = 10;
        // ctx.strokeStyle= 'rgba(255,20,147, 0.8)';
        // ctx.lineWidth = this.lineWidth;
        // ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        // ctx.stroke();
        
        // rgb(148, 49, 247);
        // rgb(246, 0, 1);
        // rgb(1, 198, 0);
        // rgb(247, 198, 0);
        // rgb(0, 148, 247);
        // rgb(198, 197, 191);

        let colors = {
            1: {
                r: 198,
                b: 197,
                g: 191
            },
            2: {
                r: 0,
                b: 148,
                g: 247
            },
            3: {
                r: 247,
                b: 198,
                g: 0
            },
            4: {
                r: 1,
                b: 198,
                g: 0
            },
            5: {
                r: 246,
                b: 0,
                g: 1
            },
            6: {
                r: 148,
                b: 49,
                g: 247
            }
        };

        let colorIndex = colors[this.typeIndex];

        ctx.fillStyle = `rgb(${colorIndex.r}, ${colorIndex.b}, ${colorIndex.g})`;
        ctx.shadowColor = `rgb(${colorIndex.r}, ${colorIndex.b}, ${colorIndex.g})`;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = `rgba(${colorIndex.r}, ${colorIndex.b}, ${colorIndex.g}, 0.8)`;
        ctx.lineWidth = this.lineWidth;
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }

    update (deltaTime) {
        if (!deltaTime) {
            return;
        } else {
            if (detectCollusion(this.game.ball, this)) {
                this.game.ball.speed.y = -this.game.ball.speed.y;
                this.markedForDeletion = true;
                this.game.score = this.game.score + this.objectPoints;

                destroy.play();
            }
        }
    }
}
