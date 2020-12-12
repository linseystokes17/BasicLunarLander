LunarLander.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');
    let world = {
        size: 0,
        top: 0,
        left: 0
    };

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function label(fuel, velocity, angle, score){
        let angleMax = 355;
        let angleMin = 5;
        let speedMax = .3
        let degrees = Math.round(((angle* 180/Math.PI)+360)%360);
        context.font = '20px Calibri';
        let inc = 20;

        if (fuel > 0){
            context.fillStyle = 'white';
            context.fillText("fuel: " + fuel, 0, inc);
        }
        else if (fuel <= 0){
            context.fillStyle = 'red';
            context.fillText("fuel: " + fuel, 0, inc);
        }

        if (velocity.y >= speedMax){
            context.fillStyle = 'white';
            context.fillText("velocity: " + Math.floor(velocity.y*10) + " m/s", 0, inc*2 );
        }
        else if (velocity.y < speedMax){
            context.fillStyle = 'green';
            context.fillText("velocity: " + Math.floor(velocity.y*10) + " m/s", 0, inc*2);
        }
        
        if (degrees <= angleMin || degrees >= angleMax){
            context.fillStyle = 'green';
            context.fillText("Angle: " + (degrees), 0, inc*3);
        }
        else {
            context.fillStyle = 'white';
            context.fillText("Angle: " + (degrees), 0, inc*3);
        }

        context.fillStyle = 'white';
        context.fillText("Score: " + (score), 0, inc*4);
    }

    function saveContext() {
        context.save();
    }

    function measureTextWidth(spec) {
		context.save();

		context.font = spec.font;
		context.fillStyle = spec.fill;
		if (spec.hasOwnProperty('stroke')) {
			context.strokeStyle = spec.stroke;
		}
		var width = context.measureText(spec.text).width;

		context.restore();

		return width;
    }
    
    function measureTextHeight(spec) {
		var saveText = spec.text;

		spec.text = 'm';	// Clever trick to get font height
		context.save();

		context.font = spec.font;
		context.fillStyle = spec.fill;
		if (spec.hasOwnProperty('stroke')) {
			context.strokeStyle = spec.stroke;
		}
		var width = context.measureText(spec.text).width;
		spec.text = saveText;

		context.restore();

		return width;
    }
    
    function drawText(spec) {
		context.save();

		context.font = spec.font,
		context.fillStyle = spec.fill;
		if (spec.hasOwnProperty('stroke')) {
			context.strokeStyle = spec.stroke;
		}
		context.textBaseline = 'top';

		context.fillText(spec.text, spec.position.x, spec.position.y);
		context.strokeText(spec.text, spec.position.x, spec.position.y);

		context.restore();
	}

    function drawTerrain(points, len){
        context.beginPath()
        for (var i=0; i < len-1; i++){
            var start = points[i];
            var end = points[i+1];
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            context.lineWidth = 2;
            context.stroke();
        }
    }

    // --------------------------------------------------------------
    //
    // Draws a texture to the canvas with the following specification:
    //    image: Image
    //    center: {x: , y: }
    //    size: { width: , height: }
    //
    // --------------------------------------------------------------
    function drawTexture(image, center, angle, size, velocity) {
        context.save();

        center.x += velocity.x;
        center.y += velocity.y;

        context.translate(center.x, center.y);
        context.rotate(angle);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width, size.height);

        context.restore();
    }

    function setGlobalAlpha(alpha) {
        context.globalAlpha = alpha;
    }

    function rotateCanvas(center, rotation) {
        world.size = canvas.width *.9;
        world.left = Math.floor(canvas.width*.05);
        world.top = (canvas.height - world.size) / 2;
        context.translate(center.x * world.size + world.left, center.y * world.size + world.top);
        context.rotate(rotation);
        context.translate(-(center.x * world.size + world.left), -(center.y * world.size + world.top));
    }

    

    let api = {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        label: label,
        drawTerrain: drawTerrain,
        measureTextWidth: measureTextWidth,
        measureTextHeight: measureTextHeight,
        drawText: drawText,
        saveContext: saveContext,
        rotateCanvas: rotateCanvas,
        setGlobalAlpha: setGlobalAlpha,
    };

    return api;
}());
