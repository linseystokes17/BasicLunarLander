// --------------------------------------------------------------
//
// Renders a Lander object.
//
// spec = {
//    image: ,
//    center: { x: , y: },
//    size: { width: , height: }
// }
//
// --------------------------------------------------------------
LunarLander.render.Lander = (function(graphics) {
    'use strict';

    function render(spec) {
        if (spec.imageReady) {
            graphics.drawTexture(spec.image, spec.center, spec.size, spec.velocity, spec.reset);
        }
    }

    return {
        render: render
    };
}(LunarLander.graphics));
