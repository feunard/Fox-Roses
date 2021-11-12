import {Level} from './level';
import {Color, Engine, Physics, Vector} from "excalibur";
import {Level2} from "./level2";

export const engine = new Engine({
    backgroundColor: Color.Transparent,
    width: 1200,
    height: 600,
    suppressPlayButton: true,
    suppressConsoleBootMessage: true,
    // Turn off anti-aliasing for pixel art graphics
    antialiasing: true,
    canvasElementId: "game"
});

// Set global gravity, 800 pixels/sec^2
Physics.acc = new Vector(0, 1000);
engine.showDebug(true);

engine.add('level1', new Level());
engine.add('level2', new Level2());

engine.goToScene('level1');