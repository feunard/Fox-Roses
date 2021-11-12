import {Bot} from './bot';
import {Floor} from './floor';
import {Color, EmitterType, Engine, ParticleEmitter, Scene, Vector} from "excalibur";

export class Level extends Scene {

    onInitialize(engine: Engine) {

        // Create collision groups for the game

        // Compose actors in scene
        const actor = new Bot(engine.halfDrawWidth, 0);

        const floor = new Floor(0, 320, 1000, 200);

        engine.add(actor);
        engine.add(floor);

        const emitter = new ParticleEmitter({
            x: -1000,
            y: 0,
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

        engine.add(emitter);

        // Create camera strategy
        this.camera.clearAllStrategies();
        this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
        this.camera.zoom = 0.1;
        this.camera.zoomOverTime(1, 2000);

        // @ts-ignore
        window["l"] = this;
    }
}