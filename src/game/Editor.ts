import {Actor, Engine, Scene, vec} from "excalibur";
import {Square} from "./Square";
import {LevelConfig} from "./config";
import {game} from "./Game";
import {Keybinds} from "./Keybinds";

class Cursor extends Actor {
    onPreUpdate(_engine: Engine, _delta: number) {
        this.vel.x = 0;
        this.vel.y = 0;
        const speed = 1000;
        const k = new Keybinds(_engine);
        if (k.isHeld("up")) {
            this.vel.y -= speed;
        }
        if (k.isHeld("left")) {
            this.vel.x -= speed;
        }
        if (k.isHeld("right")) {
            this.vel.x += speed;
        }
        if (k.isHeld("down")) {
            this.vel.y += speed;
        }
    }
}

export class Editor extends Scene {

    onInitialize(engine: Engine) {
        this.build(game.level);
        game.onChangeLevel((level) => {
            this.actors.forEach(a => this.remove(a));
            this.entities.forEach(a => this.remove(a));
            this.build(level);
        });
    }

    build(level: LevelConfig) {

        const start = new Square("start", vec(level.start[0], level.start[1]));
        const end = new Square("end", vec(level.end[0], level.end[1]));
        this.add(start);
        this.add(end);

        const actor = new Cursor();
        this.add(actor);

        this.camera.clearAllStrategies();
        this.camera.zoom = 0.5;
        this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
    }
}