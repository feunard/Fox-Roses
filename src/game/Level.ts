import {Hero} from './entities/Hero';
import {Floor} from './entities/misc/Floor';
import {Actor, Color, EmitterType, Engine, ParticleEmitter, Scene, vec, Vector} from "excalibur";
import {ILevel} from "./interfaces";
import {game} from "./Game";
import {Event} from "./entities/Event";
import {NPC} from "./entities/NPC";
import {HeroExias} from "./entities/HeroExias";
import {foes} from "./entities/foes";
import {config} from "./config";
import {audio} from "./audio";

export class Level extends Scene {

    build(level: ILevel) {
        console.log("level::build", level)

        let actor: Actor | null = null;

        for (const e of level.entities) {
            if (e.type === "floor") {
                const floor = new Floor(e);
                this.add(floor);
            }
            if (e.type === "event") {
                if (e.event === "start") {
                    actor = config.hero === 0
                        ? new Hero(vec(e.x + 32, e.y))
                        : new HeroExias(vec(e.x + 32, e.y));
                }
                const end = new Event(e);
                this.add(end);
            }
            if (e.type === "npc") {
                this.add(new NPC(e));
            }
            if (e.type === "foe") {
                this.add(new foes[e.name](e as any));
            }
        }

        if (actor) {
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
            this.add(actor);
        }

        this.camera.clearAllStrategies();

        if (actor) {
            this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
        }

        this.camera.zoom = 0.1;
        this.camera.zoomOverTime(1, 2000);

        if (level.music) {
            audio.playMusic(level.music as any, true);
        }
    }

    onInitialize(engine: Engine) {
        console.log("level::onInitialize", engine)
        this.clear()
        this.build(game.level);

        game.onChangeLevel((level) => {
            this.clear();
            this.build(level);
        });
    }

    onActivate(_oldScene: Scene, _newScene: Scene) {
        super.onActivate(_oldScene, _newScene);
        console.log("level::onActivate", _oldScene, _newScene)
    }

    onDeactivate(_oldScene: Scene, _newScene: Scene) {
        super.onDeactivate(_oldScene, _newScene);
        console.log("level::onDeactivate", _oldScene, _newScene)
    }

    clear() {
        console.log("level::clear entities")
        this.entities.forEach(a => this.remove(a));
        this.actors.forEach(a => this.contains(a) && this.remove(a));
        this.triggers.forEach(a => this.remove(a));
    }
}