import {Hero} from './Hero';
import {Floor, FloorFixed} from './Floor';
import {Color, EmitterType, Engine, ParticleEmitter, Scene, vec, Vector} from "excalibur";
import {Square} from "../game/Square";

export class Level extends Scene {

    onInitialize(engine: Engine) {

        // Create collision groups for the game

        // Compose actors in scene
        const floor = new Floor(0, 0, 1000, 200);
        const wall = new Floor(300, -200, 50, 1000)
        const wall4 = new Floor(-500, -220, 50, 1000)
        const wall2 = new Floor(-300, -200, 50, 100)
        const wall3 = new FloorFixed(-190, -100, 50, 100)


        const start = new Square("start", vec(100, -200));
        const end = new Square("end", vec(0, -500));
        const actor = new Hero(start.pos);

        this.add(actor);
        this.add(floor);
        this.add(wall);
        this.add(wall2);
        this.add(wall3);
        this.add(wall4);
        this.add(start);
        this.add(end);

        const emitter = new ParticleEmitter({
            x: -1000,
            y: -500,
            width: 2000,
            height: 300,
        });
        emitter.emitterType = EmitterType.Rectangle;
        emitter.radius = 236;
        emitter.minVel = 10;
        emitter.maxVel = 20;
        emitter.minAngle = 0;
        emitter.maxAngle = 10;
        emitter.isEmitting = true;
        emitter.emitRate = 10;
        emitter.opacity = 1;
        emitter.fadeFlag = true;
        emitter.particleLife = 5000;
        emitter.maxSize = 10;
        emitter.minSize = 1;
        emitter.startSize = 0;
        emitter.endSize = 0;
        emitter.acceleration = new Vector(0, 2);
        emitter.beginColor = Color.Transparent;
        emitter.endColor = Color.Transparent;

        this.add(emitter);

        // Create camera strategy
        this.camera.clearAllStrategies();
        this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
        this.camera.zoom = 0.1;
        this.camera.zoomOverTime(1, 2000);
    }
}