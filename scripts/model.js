LunarLander.model = (function(input, objects, renderer, game,  graphics){
    'use strict';

    let count = 0;
    let myLander;
    let myTerrain;
    let cancelNextRequest = true;
    let myKeyboard = input.Keyboard();
    let textGameOver = {
        font: '50px Arial, sans-serif',
        fill: 'rgb(90, 11, 57)',
        stroke: 'rgba(0, 0, 0, 1)',
        text: 'Game Over',
    },
        elapsedCountdown = 3000,
		internalUpdate,
        internalRender,
        score;

    function initializeLander(){
        myLander = objects.Lander({
            imageSrc: 'assets/lander.png',
            center: { x: graphics.canvas.width / 2, y: 100 },
            size: { width: 15, height: 30 },
            velocity: {x: 0, y: 0},
            angle: Math.PI/2,
            thrust: 0,
            fuel: 20,
        });

        // objects.ParticleSystem.createEffectExplosion({
        //     center: { x: 0.5, y: 0.5 },
        //     howMany: 300
        // });
        // objects.ParticleSystem.createEffectFire({
        //     center: { x: 0.5, y: 0.5 },
        //     lifetime: 6000
        // });

    }
    function initializeTerrain(){
        myTerrain = objects.Terrain({
            points: [],
            canv: {
                height: graphics.canvas.height, 
                width:graphics.canvas.width},
        });
        myTerrain.generateTerrain(2,100);
    }
    
    function initialize(){
        console.log('initialize model');
        var textWidth = graphics.measureTextWidth(textGameOver),
			textHeight = graphics.measureTextHeight(textGameOver);
		textGameOver.position = { x: graphics.canvas.width / 2 - textWidth / 2, y: graphics.canvas.height / 2 - textHeight };

        initializeLander();
        initializeTerrain();

        score = {
			total: 0,
        };
        
        elapsedCountdown = 3000;
		internalUpdate = updateCountdown;
		internalRender = renderCountdown;

    }
    
    function updateCountdown(elapsedTime) {
		elapsedCountdown -= elapsedTime;

		//
		// Once the countdown timer is down, switch to the playing state
		if (elapsedCountdown <= 0) {
			internalUpdate = updatePlaying;
			internalRender = renderPlaying;
		}
    }
    
    function renderCountdown() {
		var number = Math.ceil(elapsedCountdown / 1000),
			countDown = {
				font: '128px Arial, sans-serif',
				fill: 'rgba(90, 11, 57, 1)',
				stroke: 'rgba(0, 0, 0, 1)',
				text: number.toString()
			},
			textWidth = graphics.measureTextWidth(countDown),
			textHeight = graphics.measureTextHeight(countDown);

		countDown.position = { x: graphics.canvas.width / 2 - textWidth / 2, y: graphics.canvas.height / 2 - textHeight };

		renderPlaying();
		//
		// Draw the countdown numbers
		graphics.drawText(countDown);
    }
    
    function renderGameOver() {
		renderPlaying();
		graphics.drawText(textGameOver);
	}

    function reset(){
        myLander.reset();
        myTerrain.reset();
        //myTerrain.generateTerrain(2,100);
    }

    function render(){
        internalRender();
    }

    function renderPlaying(){
        graphics.label(myLander.fuel, myLander.velocity, myLander.angle, score.total);
        renderer.Terrain.render(myTerrain);
        renderer.Lander.render(myLander);
        // renderer.ParticleSystem.render(objects.ParticleSystem);
    }

    function updatePlaying(elapsedTime){
        myLander.updatePosition();
        // objects.ParticleSystem.update(elapsedTime);
        if (myLander.center.y > graphics.canvas.height/2){
            for (let i = 0; i<myTerrain.points.length-1; i++){
                if (myLander.lineCircleIntersection(myTerrain.points[i], myTerrain.points[i+1], myLander.getCenter()) == true){
                    var degrees = Math.round(((myLander.angle* 180/Math.PI)+360)%360);
                    var speed = Math.abs(Math.floor(myLander.velocity.y*10))
                    var offset = 0;
                    if (degrees <= 5 || degrees >= 355){
                        offset = 0;
                    } else{offset = (100*degrees) / 365}

                    score.total += (100 + myLander.fuel - (speed-2-offset))

                    if ((myTerrain.points[i].y == myTerrain.points[i+1].y) && (degrees <= 5 || degrees >= 355) && (speed <= 2)){
                        internalUpdate = updateCountdown;
				        internalRender = renderCountdown;
                        console.log("Successful landing!");
                        reset()
                        myTerrain.generateTerrain(1, 100);
                        count++;
                        if(count == 2){
                            LunarLander.HighScores.add(score.total)
                            console.log('Congratulations! You won the game!');
                            cancelNextRequest = true;
                            myLander.reset();
                            myTerrain.reset();
                            count = 0;
                            score = 0;
                        }
                    }
                    else{
                        console.log('You crashed!');
                        internalUpdate = function() {};
                        internalRender = renderGameOver;
                        cancelNextRequest = true;
                        reset();
                        myTerrain.generateTerrain(2, 100);
                        count = 0;
                        score = 0;
                    }
                }
            }
        }
    }

    function update(elapsedTime){
        internalUpdate(elapsedTime);
        console.log('updating model', elapsedTime);
    }

    let api =  {
        update: update,
        render: render,
        initialize: initialize,
        reset: reset,
        get myLander(){return myLander;},
        get cancelNextRequest() {return cancelNextRequest;},
        set cancelNextRequest(bool){ cancelNextRequest = bool;},
        get myTerrain(){ return myTerrain;},
    }
    return api;
}(LunarLander.input, LunarLander.objects, LunarLander.renderer, LunarLander.game, LunarLander.graphics));