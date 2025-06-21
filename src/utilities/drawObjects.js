export default class drawObjects {
    constructor () {
        console.log('test');
    }

    drawORect (ctx, x, y, w, h, border){
        ctx.beginPath();
        ctx.moveTo(x + border, y);
        ctx.lineTo(x + w - border, y);
        ctx.quadraticCurveTo(x + w - border, y, x + w, y + border);
        ctx.lineTo(x + w, y + h - border);
        ctx.quadraticCurveTo(x + w, y + h - border, x + w- border, y + h);
        ctx.lineTo(x + border, y + h);
        ctx.quadraticCurveTo(x + border, y + h, x, y + h - border);
        ctx.lineTo(x, y + border);
        ctx.quadraticCurveTo(x, y + border, x + border, y);
        ctx.closePath();
        ctx.stroke();
    }
}
