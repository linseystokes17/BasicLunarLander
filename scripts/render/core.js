LunarLander.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function label(velocity, angle){
        let angleMax = 355;
        let angleMin = 5;
        let velocityMax = 20
        context.font = '20px Calibri';
        let inc = 20;
        let ang = angle%360;

        let vel = Math.abs(Math.round(velocity.magnitude*10))
        if (ang < 0){
            ang = 359 + ang;
        }

        if (vel >= velocityMax){
            context.fillStyle = 'white';
            context.fillText("velocity.y: " + vel, 0, inc*2);
        }
        else if (vel <= velocityMax){
            context.fillStyle = 'green';
            context.fillText("velocity.y: " + vel, 0, inc*2);
        }
        
        if (ang  >= angleMax || ang <= angleMin){
            context.fillStyle = 'green';
            context.fillText("Angle: " + ang , 0, inc*3);
        }
        else{
            context.fillStyle = 'white';
            context.fillText("Angle: " + ang, 0, inc*3);
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
    function drawTexture(image, center, size, velocity) {
        context.save();

        // center.x += velocity.x;
        // center.y += velocity.y;

        context.translate(center.x, center.y);
        context.rotate((velocity.direction*Math.PI)/180);
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
