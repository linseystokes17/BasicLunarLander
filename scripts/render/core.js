LunarLander.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function label(speed, angle){
        context.fillText("Speed.x: " + speed.x, 0,10);
        context.fillText("Speed.y: " + -speed.y, 0,20);
        context.fillText("Angle: " + (angle%6), 0,30);
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
    };

    return api;
}());
