LunarLander.objects.Terrain = function(spec) {
    'use strict';
    var depth = 0;
    let points = [];
    let gauss = randGauss(10);

    function initialize(){
        let randStartY = spec.canv.height+10 - Math.floor(Math.random()*spec.canv.height/2)-10;
        let randSafeX = Math.round(spec.canv.width*.15) + Math.floor(Math.random()*(spec.canv.width-2*Math.round(spec.canv.width*.15)));
        let randSafeY = spec.canv.height+10 - Math.floor(Math.random()*spec.canv.height/2)-10;
        points = [];
        let terrain = {
            startPoint: {
                x: 0,
                y: randStartY,
            },
            endPoint: {
                x: spec.canv.width,
                y: randStartY
            },
            safeZoneStart: {
                x: randSafeX,
                y: randSafeY 
            },
            safeZoneEnd: {
                x: randSafeX + 100,
                y: randSafeY
            },
        };
        points.push(terrain.startPoint, terrain.endPoint, terrain.safeZoneStart, terrain.safeZoneEnd);
        genTerrain(terrain.startPoint, terrain.safeZoneStart, spec.bumpiness, depth);
        genTerrain(terrain.safeZoneEnd, terrain.endPoint,  spec.bumpiness, depth);

        points.sort(function(a,b){
            return a.x - b.x;
        });
        spec.points = points;
        spec.pointsLen = points.length;
    }

    function genTerrain(start, end, bumpiness, depth){
        let midpoint = {
            x: (end.x - start.x)/2+start.x,
            y: start.y,
        }

        let r = bumpiness * gauss *(Math.abs(end.x - start.x));
        midpoint.y = .5*(start.y + end.y) + r-100;
        let x = Math.abs(end.x - start.x)/2;
    
        if(depth < 5){
            points.push(midpoint);
            depth=depth+1;
            genTerrain(start, midpoint, bumpiness,depth); 
            genTerrain(midpoint, end, bumpiness, depth);   
        }
    }


    function randGauss(v){
        var r= 0;
        for( var i = v; i>0;i--){
            r+=Math.random();
        }
        return r/v;
    }

    

    // function printPoints(){
    //     for (var i=0; i<points.length-1; i++){
    //         graphics.drawLineSegment(points[i],points[i+1]);
    //     }
    // }

    let api = {
        initialize: initialize,
        get pointsLen() { return spec.pointsLen; },
        get points() { return spec.points; },
        get bumpiness() { return spec.bumpiness; },
        get safeZoneWidth() { return terrain.safeZoneWidth; },
        get startPoint() { return terrain.startPoint; },
        get endPoint() { return terrain.endPoint; },
        get safeZoneStart() { return terrain.safeZoneStart; },
        get safeZoneEnd() { return terrain.safeZoneEnd },
    };

    return api;
}