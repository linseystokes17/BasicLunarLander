LunarLander.screens['game-play'] = (function(game, objects, renderer, graphics, input) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    let myKeyboard = input.Keyboard();

    let myLander = objects.Lander({
        imageSrc: 'assets/lander.png',
        center: { x: graphics.canvas.width / 2, y: graphics.canvas.height / 2 },
        size: { width: 30, height: 60 },
        speed: {x: 0, y: 0},
    });

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        myLander.updatePosition();
    }

    function render() {
        graphics.clear();
        renderer.Lander.render(myLander);
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {
        myKeyboard.register('w', myLander.accelerate);
        myKeyboard.register('a', myLander.rotateLeft);
        myKeyboard.register('d', myLander.rotateRight);
        myKeyboard.register('Escape', function() {
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        });

        let canvas = document.getElementById('id-canvas');
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    };

}(LunarLander.game, LunarLander.objects, LunarLander.render, LunarLander.graphics, LunarLander.input));
