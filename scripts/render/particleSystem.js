// ------------------------------------------------------------------
//
// Rendering function for a /Components/Text object.
//
// ------------------------------------------------------------------
LunarLander.renderer.ParticleSystem = (function(graphics) {
    'use strict';
    let that = {};

    // ------------------------------------------------------------------
    //
    // Work through all of the known particles and draw them.
    //
    // ------------------------------------------------------------------
    that.render = function(system) {
        for (let value = 0; value < system.particleCount; value += 1) {
            let particle = system.particles[value];

            graphics.saveContext();
            graphics.rotateCanvas(particle.center, particle.rotation);

            graphics.setGlobalAlpha(particle.alpha);
            graphics.drawImage(
                particle.image,
                particle.center.x - particle.size / 2,        // Where to draw the sprite
                particle.center.y - particle.size / 2,
                particle.size, particle.size);

            graphics.restoreContext();
        }
    };

    return that;
}(LunarLander.graphics));
