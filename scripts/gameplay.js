LunarLander.screens['game-play'] = (function(game, objects, renderer, graphics, input) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;
    let myKeyboard = input.Keyboard();

    let myLander = objects.Lander({
        imageSrc: 'assets/lander.png',
        center: { x: graphics.canvas.width / 2, y: 100 },
        size: { width: 15, height: 30 },
        speed: {x: 0, y: 0},
        angle: 90
    });

    let myTerrain = objects.Terrain({
        bumpiness: .5,
        safeZoneWidth: 100,
        pointsLen: 0,
        points: [],
        canv: {
            height: graphics.canvas.height, 
            width:graphics.canvas.width},
    });

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        for (let i = 0; i<myTerrain.points.length-1; i++){
            if (myLander.lineCircleIntersection(myTerrain.points[i], myTerrain.points[i+1], myLander.getCenter()) == true){
                cancelNextRequest = true;
                myLander.reset();
                myTerrain.initialize();
                // myLander.center.x = graphics.canvas.width / 2;
                // myLander.center.y = graphics.canvas.height / 2;
                // myLander.angle = 0;
                //
                // Then, return to the main menu
                game.showScreen('main-menu');
            }
        }
        myLander.updatePosition();
    }

    function render() {
        graphics.clear();
        renderer.Lander.render(myLander);
        graphics.label(myLander.speed, myLander.angle);
        renderer.Terrain.render(myTerrain);
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
        myTerrain.initialize();
        myKeyboard.register('w', myLander.accelerate);
        myKeyboard.register('a', myLander.rotateLeft);
        myKeyboard.register('d', myLander.rotateRight);
        myKeyboard.register('Escape', function() {
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            myLander.reset();
            myTerrain.initialize();
            // myLander.center.x = graphics.canvas.width / 2;
            // myLander.center.y = graphics.canvas.height / 2;
            // myLander.angle = 0;
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
