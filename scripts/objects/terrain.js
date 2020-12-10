LunarLander.objects.Terrain = function(spec) {
    'use strict';
    var depth = 0;
    let gauss = randGauss(10);

    function generateTerrain(numPlatforms, platformWidth){
        let platform = 0;
        let randStartY = spec.canv.height+10 - Math.floor(Math.random()*spec.canv.height/2)-10;
        let d = 0;
        let start = {
            x: 0,
            y: randStartY,
        };
        let end = {
            x: spec.canv.width,
            y: randStartY,
        };

        spec.points.push(start, end);

        while (platform < numPlatforms){
            let randSafeX = Math.round(spec.canv.width*.15) + Math.floor(Math.random()*(spec.canv.width-2*Math.round(spec.canv.width*.15)));
            let randSafeY = spec.canv.height+10 - Math.floor(Math.random()*spec.canv.height/2)-10;
            
            let safeStart = {
                x: randSafeX,
                y: randSafeY,
            };
            let safeEnd = {
                x: randSafeX+platformWidth,
                y: randSafeY,
            };

            spec.points.push(safeStart, safeEnd);

            platform++;
        }
        
        spec.points.sort(function(a,b){
            return a.x - b.x;
        });

        let l = spec.points.length;

        while (d < spec.density){
            for (var i=0; i<=l/2; i+=2){
                let fromFront = {
                    first: spec.points[i],
                    second: spec.points[i+1]
                };
                let fromBack = {
                    first: spec.points[l-i-2],
                    second: spec.points[l-i-1]
                }
                let midH1 = genMidpoint(fromFront.first, fromFront.second);
                let midH2 = genMidpoint(fromBack.first, fromBack.second);
                
                console.log(midH1);
                console.log(midH2);
                
                spec.points.push(midH1);
                spec.points.push(midH2);
            }
            spec.points.sort(function(a,b){
                return a.x - b.x;
            });
            d++;
        }  
    }

    function genMidpoint(start, end){
        //console.log(start);
        
        let midpoint = {
            x: (end.x - start.x)/2+start.x,
            y: start.y,
        }

        let r = spec.bumpiness * gauss *(Math.abs(end.x - start.x));
        midpoint.y = .5*(start.y + end.y) + r-100;
        let x = Math.abs(end.x - start.x)/2;

        return midpoint
    }


    function randGauss(v){
        var r= 0;
        for( var i = v; i>0;i--){
            r+=Math.random();
        }
        return r/v;
    }

    let api = {
        generateTerrain: generateTerrain,
        get pointsLen() { return spec.pointsLen; },
        get points() { return spec.points; },
        get bumpiness() { return spec.bumpiness; },
        get platformWidth() { return terrain.platformWidth; },
        get startPoint() { return terrain.startPoint; },
        get endPoint() { return terrain.endPoint; },
        get platformStart() { return terrain.platformStart; },
        get platformEnd() { return terrain.platformEnd },
    };

    return api;
}