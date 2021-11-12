import * as ex from 'excalibur';
import { Level } from './level';
import {Color, Physics} from "excalibur";

export const engine = new ex.Engine({
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
Physics.acc = new ex.Vector(0, 1000);

engine.add('level1', new Level());
engine.goToScene('level1');
