LunarLander.objects.Terrain = function(spec) {
    'use strict';

    function initialize(){

    }

    let api = {
        initialize: initialize,
        get bumpiness() { return bumpiness; },
        get safeZoneWidth() { return safeZoneWidth; },
        get startPoint() { return spec.startPoint; },
        get endPoint() { return spec.endPoint; },
        get safeZoneStart() { return spec.safeZoneStart; },
        get safeZoneEnd() { return spec.safeZoneEnd },
    };

    return api;
}