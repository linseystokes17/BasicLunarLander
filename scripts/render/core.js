LunarLander.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function label(speed, degree){
        let degreeMax = 355;
        let degreeMin = 5;
        let speedMax = 20
        context.font = '20px Calibri';
        let inc = 20;

        if (speed >= speedMax){
            context.fillStyle = 'white';
            context.fillText("speed.y: " + speed, 0, inc*2);
        }
        else if (speed <= speedMax){
            context.fillStyle = 'green';
            context.fillText("speed.y: " + speed, 0, inc*2);
        }
        
        if (degree  >= degreeMax || degree <= degreeMin){
            context.fillStyle = 'green';
            context.fillText("degree: " + degree , 0, inc*3);
        }
        else{
            context.fillStyle = 'white';
            context.fillText("degree: " + degree, 0, inc*3);
        }
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
    function drawTexture(image, center, size, degrees) {
        context.save();

        // center.x += speed.x;
        // center.y += speed.y;

        context.translate(center.x, center.y);
        context.rotate(degrees* Math.PI / 180);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width, size.height);

        context.restore();
    }

    let api = {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        label: label,
        drawTerrain: drawTerrain,
    };

    return api;
}());
