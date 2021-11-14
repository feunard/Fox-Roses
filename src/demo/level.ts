import {Hero} from './Hero';
import {Floor, FloorFixed} from './Floor';
import {Engine, Scene, vec} from "excalibur";
import {Square} from "../game/Square";
import {LevelConfig} from "../game/config";
import {game} from "../game/Game";

export class Level extends Scene {

    build(level: LevelConfig) {

        const floor = new Floor(0, 0, 1000, 200);
        const wall = new Floor(300, -200, 50, 1000)
        const wall4 = new Floor(-500, -220, 50, 1000)
        const wall2 = new Floor(-300, -200, 50, 100)
        const wall3 = new FloorFixed(-190, -100, 50, 100)
        const start = new Square("start", vec(level.start[0], level.start[1]));
        const end = new Square("end", vec(level.end[0], level.end[1]));
        const actor = new Hero(start.pos);

        this.add(actor);
        this.add(floor);
        this.add(wall);
        this.add(wall2);
        this.add(wall3);
        this.add(wall4);
        this.add(start);
        this.add(end);

        this.camera.clearAllStrategies();
        this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
        this.camera.zoom = 0.1;
        this.camera.zoomOverTime(1, 2000);
    }

    onInitialize(engine: Engine) {

        this.build(game.level);

        game.onChangeLevel((level) => {
            this.actors.forEach(a => this.remove(a));
            this.entities.forEach(a => this.remove(a));
            this.build(level);
        });
    }
}