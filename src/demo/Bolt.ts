import {Actor, Animation, CollisionType, Engine, Vector} from "excalibur";
import {bolt_sheet} from "./resources";

export enum Direction {
    LEFT = -1, RIGHT = 1
}

export class Bolt extends Actor {

    anim!: Animation;

    constructor(
        pos: Vector,
        private direction: Direction
    ) {
        super({
            pos,
            radius: 10,
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(_engine: Engine) {
        this.anim = Animation.fromSpriteSheet(bolt_sheet, [0], 1000);
        this.graphics.add("bolt", this.anim);
        this.graphics.use("bolt");
        setTimeout(() => {
            this.kill();
        }, 4000);
        this.on("collisionstart", (ev) => {
            if (ev.other.name !== "Bot") {
                this.kill();
            }
        });
    }

    onPreUpdate(_engine: Engine, _delta: number) {
        this.vel.x = this.direction * 600;
        this.vel.y = 0;
    }


}

