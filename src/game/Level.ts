import {Hero} from './entities/Hero';
import {Floor} from './entities/Floor';
import {Actor, Color, EmitterType, Engine, ParticleEmitter, Scene, vec, Vector} from "excalibur";
import {config, ILevel} from "./config";
import {game} from "./Game";
import {Event} from "./entities/Event";
import {Graphic} from "./entities/Graphic";
import {NPC} from "./entities/NPC";
import {HeroExias} from "./entities/HeroExias";
import {foes} from "./entities/foes";

export class Level extends Scene {
    actor?: Actor;

    build(level: ILevel) {
        console.log("BUILD", level)
        for (const e of level.entities) {
            if (e.type === "floor") {
                const floor = new Floor(e);
                this.add(floor);
            }
            if (e.type === "event") {
                if (e.event === "start") {
                    this.actor = config.hero === 0
                        ? new Hero(vec(e.x + 32, e.y))
                        : new HeroExias(vec(e.x + 32, e.y));
                }
                if (e.event === "end") {
                    this.add(new Graphic(e, "rose"));
                }
                const end = new Event(e);
                this.add(end);
            }
            if (e.type === "npc") {
                this.add(new NPC(e));
            }
            if (e.type === "foe") {
                this.add(new foes[e.name](e));
            }
        }

        if (this.actor) {
            const emitter = new ParticleEmitter({
                x: -1000,
                y: 0,
                width: 10000,
                height: 1080,
            });
            emitter.emitterType = EmitterType.Rectangle;
            emitter.radius = 5;
            emitter.minVel = 0;
            emitter.maxVel = 10;
            emitter.minAngle = 0;
            emitter.maxAngle = 6.2;
            emitter.isEmitting = true;
            emitter.emitRate = 300;
            emitter.opacity = 0.8;
            emitter.fadeFlag = true;
            emitter.particleLife = 2376;
            emitter.maxSize = 10;
            emitter.minSize = 1;
            emitter.startSize = 0;
            emitter.endSize = 25;
            emitter.acceleration = new Vector(1, 1);
            emitter.beginColor = Color.Transparent;
            emitter.endColor = Color.Transparent;
            this.add(emitter);
            this.add(this.actor);
        }

        this.camera.clearAllStrategies();
        if (this.actor) {
            this.camera.strategy.elasticToActor(this.actor, 0.05, 0.1);
        }

        this.camera.zoom = 0.1;
        this.camera.zoomOverTime(1, 2000);
    }

    onInitialize(engine: Engine) {
        console.log("onInitialize", engine)

        this.build(game.level);

        game.onChangeLevel((level) => {
            this.actors.forEach(a => this.remove(a));
            this.entities.forEach(a => this.remove(a));
            this.build(level);
        });
    }
}