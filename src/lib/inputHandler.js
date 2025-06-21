export default class InputHendler {
    constructor (paddle, game) {
        document.addEventListener('keydown', event => {
            if (event.defaultPrevented) {
                return;
            }

            let handled = false;

            if (handled) {
                event.preventDefault();
            }

            switch (event.code) {
                case 'KeyA':
                case 'ArrowLeft':
                    paddle.moveLeft();
                    console.log('InputHendler keydown key', event.code);
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    paddle.moveRight();
                    console.log('InputHendler keydown key', event.code);
                    break;
                case 'Escape':
                    game.togglePause();
                    console.log('InputHendler keydown key', event.code);
                    break;
                case 'Space':
                    game.start();
                    console.log('InputHendler keydown key', event.code);
                    break;
                default:
                    console.log('Unhandled InputHendler keydown key', event.code);
                    break;
            }
        }, true);

        document.addEventListener('keyup', event => {
            if (event.defaultPrevented) {
                return;
            }

            let handled = false;

            if (handled) {
                event.preventDefault();
            }

            switch (event.code) {
                case 'KeyA':
                case 'ArrowLeft':
                    if (paddle.move <= 0) {
                        paddle.stop();
                    }
                    console.log('InputHendler keyup key', event.code);
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    if (paddle.move >= 0) {
                        paddle.stop();
                    }
                    console.log('InputHendler keyup key', event.code);
                    break;
                default:
                    console.log('Unhandled InputHendler keyup key', event.code);
                    break;
            }
        }, true);
    }
}
