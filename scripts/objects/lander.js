// --------------------------------------------------------------
//
// Creates a Lander object, with functions for managing state.
//
// spec = {
//    imageSrc: 'assets/lander.png',
    // center: { x: graphics.canvas.width / 2, y: graphics.canvas.height / 2 },
    // size: { width: 30, height: 60 },
    // speed: {x: 0, y: 0},
    // angle: 0
// }
//
// --------------------------------------------------------------
LunarLander.objects.Lander = function(spec) {
    'use strict';

    //load images
    let imageReady = false;
    let image = new Image();

    //determine gravity
    let massEarth = 5.97*Math.pow(10, 18);
    let massShip = 200; //kg
    let gravConst = 6.67*Math.pow(10, -11);
    let radEarth = 637800 //m
    let shipDistCenter =  radEarth + spec.center.y;
    let gravity = -gravConst*((massShip*massEarth)/Math.pow(shipDistCenter,2));
    let gravVector = {direction: 180, magnitude: gravity};

    //ship movements
    let velocity = {direction: 90, magnitude:0};
    let radius = 8.5;
    let thrustVelocity = {direction: 0 , magnitude:0};

    // fuel
    let totalFuel = 10;
    let rotFuelBurn = -.1;
    let thrustFuelBurn = .2;
    
    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    function rotateLeft(elapsedTime) {
        if (velocity.direction > 360 || velocity.direction <= 0){
            velocity.direction=velocity.direction%360;
        }
        velocity.direction -= 1;
    }

    function rotateRight(elapsedTime) {
        if (velocity.direction > 360 || velocity.direction <= 0){
            velocity.direction=velocity.direction%360;
        }
        velocity.direction += 1;
    }

    function thrust(elapsedTime) {
        thrustVelocity.magnitude += .000001;
        thrustVelocity.direction = spec.angle;
        let forces = calculateVector(thrustVelocity, velocity);
        
        spec.center.x += forces.magnitude*Math.cos(forces.direction);
        spec.center.y -= forces.magnitude*Math.sin(forces.direction);

        velocity.direction += forces.direction;
        velocity.magnitude += forces.magnitude;

        spec.angle = velocity.direction;
        
    }

    function updatePosition(elapsedTime){
        let forces = calculateVector(gravVector, velocity);
        
        spec.center.x += forces.magnitude*Math.cos(forces.direction);
        spec.center.y -= forces.magnitude*Math.sin(forces.direction);

        spec.angle = velocity.direction;
    }

    function calculateVector(v1, v2){
        let vector = {direction: 0, magnitude:0}

        let x1 = v1.magnitude*Math.cos(v1.direction);
        let y1 = v1.magnitude*Math.sin(v1.direction);

        let x2 = v2.magnitude * Math.cos(v2.direction);
        let y2 = v2.magnitude * Math.sin(v2.direction);

        let vectorx = x1 + x2;
        let vectory = y1 + y2;

        vector.magnitude = Math.sqrt(Math.pow(vectorx,2)+Math.pow(vectory, 2))
        vector.angle = Math.atan(vectory / vectorx);

        return vector
    }

    function reset(){
        spec.angle = 90;
        spec.center = { x: 300, y: 100 };
        velocity = {direction: 90, magnitude: 0};
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
        get angle() { return spec.angle; },
        get image() { return image; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get velocity() { return velocity },
    };

    return api;
}
