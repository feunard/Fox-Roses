import {Actor, Animation, CollisionType, Engine, Scene, Shape, vec, Vector} from "excalibur";
import {animations} from "../../resources";
import {IEntityFoe} from "../../interfaces";
import {FloorAware} from "../misc/Floor";
import {Direction} from "../misc/Bolt";
import {Bolt2} from "../misc/Bolt2";

export class Mage extends Actor {
    floor = new FloorAware(this);
    clock: any;
    lock = false;
    direction = 0;
    attack!: Animation;

    constructor(private e: IEntityFoe) {
        super({
            name: "mage",
            pos: vec(e.x + e.width / 2, e.y + e.height / 2),
            width: e.width,
            height: e.height,
            collisionType: CollisionType.Active,
            collider: Shape.Box(
                e.width - 48,
                e.height - 32,
                Vector.Half,
                vec(10, 6)
            ),
        });
    }

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);

        this.direction = !this.e.data2 ? Direction.LEFT : Direction.RIGHT;

        const idle = animations.mage_idle.clone();
        idle.scale = vec(2, 2);
        idle.flipHorizontal = this.direction !== Direction.RIGHT;
        this.graphics.add("idle", idle);

        this.attack = animations.mage_attack.clone();
        this.attack.scale = vec(2, 2);
        this.attack.flipHorizontal = this.direction !== Direction.RIGHT;
        this.graphics.add("attack", this.attack);

        this.graphics.use("idle");

        this.clock = setInterval(() => {
                this.fire();
            }, this.e.data1
                ? Number(this.e.data1)
                : 4000
        );
    }

    fire() {
        this.lock = true;
        this.scene.engine.add(new Bolt2(
            new Vector(this.pos.x, this.pos.y),
            this.direction
        ));
        this.graphics.use(this.attack);
        setTimeout(() => {
            this.lock = false;
            this.attack.reset();
        }, 500)
    }

    onPreKill(_scene: Scene) {
        super.onPreKill(_scene);
        clearInterval(this.clock);
    }

    onPreUpdate(_engine: Engine, _delta: number) {
        super.onPreUpdate(_engine, _delta);


        if (this.pos.y > 10000) {
            this.kill();
        }

        if (this.pos.y < -2000) {
            this.kill();
        }

        if (this.lock) {
            return;
        }

        this.graphics.use("idle");

        this.vel.x = 0;
        this.floor.update();
    }
}