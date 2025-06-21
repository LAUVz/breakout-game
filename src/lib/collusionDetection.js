export function detectCollusion(ball, gameObject) {
    // Ball bounds
    let ballBottom = ball.position.y + ball.hitBoxThreshold;
    let ballTop = ball.position.y - ball.hitBoxThreshold;

    // Paddle bounds
    let objectBottom = gameObject.position.y + gameObject.height;
    let objectTop = gameObject.position.y;
    let objectLeft = gameObject.position.x;
    let objectRight = gameObject.position.x + gameObject.width;
    // Collision with the paddle
    if (
        ballBottom >= objectTop &&
        ballTop <= objectBottom &&
        ball.position.x + ball.hitBoxThreshold >= objectLeft &&
        ball.position.x - ball.hitBoxThreshold <= objectRight
    ) {
        return true;
    } else {
        return false;
    }
}
