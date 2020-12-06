LunarLander.screens['game-play'] = (function(game, objects, renderer, graphics, input) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;
    let myKeyboard = input.Keyboard();

    let myLander = objects.Lander({
        imageSrc: 'assets/lander.png',
        center: { x: graphics.canvas.width / 2, y: 100 },
        size: { width: 15, height: 30 },
        degrees: 90,
        momentum: { x: 0.0, y: 0.0 },        // World units per millisecond
        maxSpeed: 0.0004,                    // World units per millisecond
        accelerationRate: 0.0004 / 1000,    // World units per second
        rotateRate: Math.PI / 1000,            // Radians per millisecond
        hitPoints: {
            max: 10
        }
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
        myLander.updatePosition(elapsedTime);
    }

    function render() {
        graphics.clear();
        renderer.Lander.render(myLander);
        graphics.label(myLander.speed, myLander.degrees);
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

    // ------------------------------------------------------------------
    //
    // Register the various keyboard events we need for the spacemyLander.  While
    // doing so, collect the handler id's so they can be unregistered at
    // a later time, such as when the spacemyLander dies.
    //
    // ------------------------------------------------------------------
    function registerSpacemyLanderKeyboard(myLander) {
        let handlerIds = [];
        let handlerId;

        handlerId = myKeyboard.registerHandler(function(elapsedTime) {
            myLander.accelerate(elapsedTime);
        }, 'w', true);
        handlerIds.push({ key: 'w', handlerId: handlerId });

        handlerId = myKeyboard.registerHandler(function(elapsedTime) {
            myLander.rotateLeft(elapsedTime);
        }, 'a', true);
        handlerIds.push({ key: 'a', handlerId: handlerId });

        handlerId = myKeyboard.registerHandler(function(elapsedTime) {
            myLander.rotateRight(elapsedTime);
        }, 'd', true);
        handlerIds.push({ key: 'd', handlerId: handlerId });

        handlerId = myKeyboard.registerHandler(function(elapsedTime) {
            myLander.fire(function(entity, renderer) {
                friendlyEntities[nextEntityId++] = {
                    model: entity,
                    renderer: renderer
                };
            });
        }, ' ', false);
        handlerIds.push({ key: ' ', handlerId: handlerId });

        //
        // Register keyboard handlers to cause a thrust sound to occur
        handlerId = myKeyboard.registerHandlerDown(function() {
            myLander.startAccelerate();
        }, 'w');
        handlerIds.push({ key: 'w', handlerId: handlerId });

        handlerId = myKeyboard.registerHandlerUp(function() {
            myLander.endAccelerate();
        }, 'w');
        handlerIds.push({ key: 'w', handlerId: handlerId });

        return handlerIds;
    }

    function initialize() {
        myTerrain.initialize();
        myKeyboard.register('w', myLander.thrust);
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
