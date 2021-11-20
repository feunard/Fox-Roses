import {Hero} from './entities/Hero';
import {Floor} from './entities/Floor';
import {Actor, Engine, Scene, vec} from "excalibur";
import {ILevel} from "./config";
import {game} from "./Game";
import {Event} from "./entities/Event";
import {Graphic} from "./entities/Graphic";
import {NPC} from "./entities/NPC";

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
                    this.actor = new Hero(vec(e.x + 32, e.y));
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
        }

        if (this.actor)
            this.add(this.actor);

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