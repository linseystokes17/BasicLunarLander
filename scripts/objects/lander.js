// --------------------------------------------------------------
//
// Creates a Lander object, with functions for managing state.
//
// spec = {
//    imageSrc: 'assets/lander.png',
    // center: { x: graphics.canvas.width / 2, y: graphics.canvas.height / 2 },
    // size: { width: 30, height: 60 },
    // speed: {x: 0, y: 0},
    // degrees: 0
// }
//
// --------------------------------------------------------------
LunarLander.objects.Lander = function(spec) {
    'use strict';

    //load images
    let imageReady = false;
    let image = new Image();

    //ship movements
    let radius = 8.5;

    // fuel
    let totalFuel = 10;
    let rotFuelBurn = -.1;
    let thrustFuelBurn = .2;
    
    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    function rotateLeft(elapsedTime) {
        spec.degrees -= 1;
    }

    function rotateRight(elapsedTime) {
        spec.degrees += 1;
    }

    function thrust(elapsedTime) {
        let radians = spec.degrees * Math.PI / 180;
        let offsetX=Math.cos(spec.degrees);
        let offsetY=Math.sin(radians);

        spec.momentum.x += offsetX * elapsedTime*spec.accelerationRate;
        spec.momentum.y += offsetY * elapsedTime*spec.accelerationRate;
        
        let newSpeed = Math.sqrt(Math.pow(spec.momentum.x, 2) + Math.pow(spec.momentum.y, 2));
        if (newSpeed > spec.maxSpeed) {
            //
            // Modify the vector to keep the magnitude equal to the max possible speed.
            spec.momentum.x /= (newSpeed / spec.maxSpeed);
            spec.momentum.y /= (newSpeed / spec.maxSpeed);
        }
        let tail = {
            x: spec.center.x - Math.cos(spec.degrees) * (spec.size.width / 2),
            y: spec.center.y - Math.sin(spec.degrees) * (spec.size.height / 2)
        };
        // LunarLander.components.ParticleSystem.createEffectExhaust({
        //     center: tail,
        //     momentum: spec.momentum,
        //     direction: Math.PI + spec.degrees,
        //     spread: Math.PI / 3,
        //     howMany: 5
        // });
    }

    function updatePosition(elapsedTime){
        let radians = spec.degrees * Math.PI / 180;
        let offsetX=Math.sin(radians);
        let offsetY=Math.cos(radians);

        spec.momentum.x += offsetX * elapsedTime*spec.acceleration;
        spec.momentum.y += offsetY * elapsedTime*spec.acceleration;
        
        let newSpeed = Math.sqrt(Math.pow(spec.momentum.x, 2) + Math.pow(spec.momentum.y, 2));
        if (newSpeed > spec.maxSpeed) {
            //
            // Modify the vector to keep the magnitude equal to the max possible speed.
            spec.momentum.x /= (newSpeed / spec.maxSpeed);
            spec.momentum.y /= (newSpeed / spec.maxSpeed);
        }
        
        spec.center.x += spec.momentum.x;
        spec.center.y += spec.momentum.y+spec.gravity;  
        
        spec.speed -= spec.gravity;
    }

    function reset(){
        spec.degrees = 90;
        spec.center = { x: 300, y: 100 };
        spec.speed = 0;
    }

    function getCenter(){
        let center = {
            x: spec.center.x,
            y: spec.center.y,
            radius: radius,
        };
        return center
    }

    function lineCircleIntersection(pt1, pt2, circle){
        let v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y }; 
        let v2 = { x: pt1.x - circle.x, y: pt1.y - circle.y }; 
        let b = -2 * (v1.x * v2.x + v1.y * v2.y); 
        let c = 2 * (v1.x * v1.x + v1.y * v1.y); 
        let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius)); 
        if (isNaN(d)) { // no intercept 
            return false; 
        } // These represent the unit distance of point one and two on the line 
        let u1 = (b - d) / c; let u2 = (b + d) / c; 
        if (u1 <= 1 && u1 >= 0) { // If point on the line segment 
            return true; 
        } 
        if (u2 <= 1 && u2 >= 0) { // If point on the line segment 
            return true; 
        } 
        return false; 
    }

    let api = {
        rotateLeft: rotateLeft,
        rotateRight: rotateRight,
        updatePosition:updatePosition,
        reset: reset,
        lineCircleIntersection: lineCircleIntersection,
        getCenter: getCenter,
        thrust: thrust,
        get imageReady() { return imageReady; },
        get degrees() { return spec.degrees; },
        get image() { return image; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get speed() {return spec.speed;},
    };

    return api;
}
