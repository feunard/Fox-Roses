import {Actor, Color, EmitterType, Engine, ParticleEmitter, vec, Vector} from "excalibur";
import {Hero} from "../Hero";
import {IEntityFoe} from "../../interfaces";

export class DeadlyArea extends Actor {

    emitter: ParticleEmitter;

    constructor(public e: IEntityFoe) {
        super({
            name: "deadly_area",
            pos: vec(e.x + e.width / 2, e.y + e.height / 2),
            width: e.width,
            height: e.height,
        });
        const emitter = new ParticleEmitter({
            x: e.x,
            y: e.y,
            width: this.e.width,
            height: this.e.height,
        });
        emitter.emitterType = EmitterType.Rectangle;
        emitter.radius = 5;
        emitter.minVel = 10;
        emitter.maxVel = 30;
        emitter.minAngle = 5.5;
        emitter.maxAngle = 3.5;
        emitter.isEmitting = true;
        emitter.emitRate = 400;
        emitter.opacity = 0.8;
        emitter.fadeFlag = false;
        emitter.particleLife = 1000;
        emitter.maxSize = 10;
        emitter.minSize = 1;
        emitter.startSize = 0;
        emitter.endSize = 20;
        emitter.acceleration = new Vector(0, 0);
        emitter.beginColor = Color.Azure;
        emitter.endColor = Color.Cyan;

        this.emitter = emitter;
        this.emitter.transform.z = -100;
    }

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);
        const names = [Hero.NAME, "mage", "war"]

        _engine.currentScene.add(this.emitter);

        this.on("precollision", (ev) => {
            if (names.includes(ev.other.name)) {
                if (ev.other.name === "hero") {
                    (ev.other as Hero).dead();
                } else {
                    ev.other.kill();
                }
            }
        });
    }

    onPreUpdate(_engine: Engine, _delta: number) {
        super.onPreUpdate(_engine, _delta);
        this.emitter._preupdate(_engine, _delta);
    }
}