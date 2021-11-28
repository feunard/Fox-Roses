import {Actor, CollisionType, Color, Engine, Scene, Timer, vec} from 'excalibur';
import {IEntityFoe} from "../../interfaces";
import {War} from "./War";
import {animations} from "../../resources";

export class Spawner extends Actor {

    clock: any = null;
    timer!: Timer;

    constructor(
        private e: IEntityFoe
    ) {
        super({
            name: 'spawner',
            pos: vec(e.x + e.width / 2, e.y + e.height / 2 - 16),
            collisionType: CollisionType.Passive,
            color: Color.Transparent,
            width: e.width,
            height: e.height,
        });
    }

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);
        this.graphics.add("idle", animations.mirror);
        this.graphics.use("idle");
        this.timer = new Timer({
            repeats: true,
            interval: this.e.data1 ? Number(this.e.data1) : 4000,
            fcn: () => {
                this.scene.engine.add(new War({...this.e}));
            },
        });
        this.timer.start();
        _engine.currentScene.add(this.timer);
    }

    onPreKill(_scene: Scene) {
        super.onPreKill(_scene);
        this.timer.stop();
        clearInterval(this.clock);
    }
}