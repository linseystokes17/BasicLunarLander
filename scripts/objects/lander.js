// --------------------------------------------------------------
//
// Creates a Lander object, with functions for managing state.
//
// spec = {
//    imageSrc: ,   // Web server location of the image
//    center: { x: , y: },
//    size: { width: , height: }
// }
//
// --------------------------------------------------------------
LunarLander.objects.Lander = function(spec) {
    'use strict';

    let massEarth = 5.97*Math.pow(10, 18);
    let massShip = 225; //kg
    let gravConst = 6.67*Math.pow(10, -11);
    let radEarth = 6378000 //m
    let shipDistCenter =  radEarth + spec.center.y;
    let gravity = -gravConst*((massShip*massEarth)/Math.pow(shipDistCenter,2));
    let maxAccel = .25;
    let minAccel = gravity*2;
    let angle = 0;
    let turnrate = .05;
    let acceleration = gravity;
    let velocity = {x: gravity, y: gravity};
    let imageReady = false;
    let image = new Image();
    
    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    function rotateLeft(elapsedTime) {
        angle -= turnrate;
    }

    function rotateRight(elapsedTime) {
        angle += turnrate;
    }

    function accelerate(elapsedTime){
        if (acceleration < maxAccel){
            acceleration += .0025;
        }
    }

    function moveTo() {
        gravity = gravConst*((massShip*massEarth)/Math.pow((radEarth + spec.center.y),2));
        if(acceleration >= minAccel){
            acceleration -= gravity;
        }
        spec.speed.x = velocity.x + acceleration*Math.sin(angle);
        spec.speed.y = velocity.y - acceleration*Math.cos(angle);

        velocity.x = spec.speed.x;
        velocity.y = spec.speed.y;
    }

    function updatePosition(){
        spec.speed.y += gravity;
        moveTo();
    }

    let api = {
        rotateLeft: rotateLeft,
        rotateRight: rotateRight,
        moveTo: moveTo,
        accelerate: accelerate,
        updatePosition:updatePosition,
        get imageReady() { return imageReady; },
        get angle() { return angle; },
        get image() { return image; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get speed() { return spec.speed },
    };

    return api;
}
