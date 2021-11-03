import * as ex from 'excalibur';
import { Level } from './level';

export const engine = new ex.Engine({
    backgroundColor: ex.Color.Transparent,
    width: 1200,
    height: 600,
    suppressPlayButton: true,
    suppressConsoleBootMessage: true,
    // Turn off anti-aliasing for pixel art graphics
    antialiasing: true,
    canvasElementId: "game"
});

// Set global gravity, 800 pixels/sec^2
ex.Physics.acc = new ex.Vector(0, 800);

// Setup first level as a custom scene
engine.add('level', new Level());

engine.goToScene('level');

// Game events to handle
engine.on('hidden', () => {
    console.log('pause');
    //engine.stop();
});

engine.on('visible', () => {
    console.log('start');
    engine.start();
});