LunarLander.screens['game-play'] = (function(game,  graphics, input, model) {
    'use strict';

    let lastTimeStamp = performance.now();
    let myKeyboard = input.Keyboard();    

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        model.update(elapsedTime);
        if (model.cancelNextRequest == true){
            model.reset();
            model.myTerrain.generateTerrain(2, 100);
            
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        }
    }

    function render() {
        graphics.clear();
        model.render();
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!model.cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {
        console.log('game initializing...');
        model.initialize();

        myKeyboard.register('ArrowUp', model.myLander.accelerate);
        myKeyboard.register('ArrowLeft', model.myLander.rotateLeft);
        myKeyboard.register('ArrowRight', model.myLander.rotateRight);

        myKeyboard.register('Escape', function() {
            //
            // Stop the game loop by canceling the request for the next animation frame
            model.cancelNextRequest = true;
            model.reset();
            
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        });
    }

    function run() {
        //model.initialize();
        lastTimeStamp = performance.now();
        model.cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    };

}(LunarLander.game, LunarLander.graphics, LunarLander.input, LunarLander.model));
