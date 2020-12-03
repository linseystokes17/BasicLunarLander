LunarLander.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function label(speed, angle){
        let angleMax = 355;
        let angleMin = 5;
        let speedMax = 3
        context.font = '20px Calibri';
        let inc = 20;

        if (Math.abs(Math.round(speed.y*10)) >= speedMax){
            context.fillStyle = 'white';
            context.fillText("Speed.y: " + Math.abs(Math.round(speed.y*10)), 0, inc*2);
        }
        else if (Math.abs(Math.round(speed.y*10)) < speedMax){
            context.fillStyle = 'green';
            context.fillText("Speed.y: " + Math.abs(Math.round(speed.y*10)), 0, inc*2);
        }
        context.fillStyle = 'white';
        context.fillText("Speed.x: " + speed.x, 0, inc);
        if (Math.abs(angle) <= angleMax){
            context.fillStyle = 'green';
            context.fillText("Angle: " + (angle), 0, inc*3);
        }
        else if ( Math.abs(angle) > angleMax){
            context.fillStyle = 'white';
            context.fillText("Angle: " + (angle), 0, inc*3);
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
    function drawTexture(image, center, angle, size, speed) {
        context.save();

        center.x += speed.x;
        center.y += speed.y;

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

    let api = {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        label: label,
        drawTerrain: drawTerrain,
    };

    return api;
}());
