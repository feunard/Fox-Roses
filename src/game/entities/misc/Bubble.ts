import {Actor, Animation, CollisionType, Engine, Vector} from "excalibur";
import {animations} from "../../resources";


export class Bubble extends Actor {

    anim!: Animation;

    constructor(
        pos: Vector,
    ) {
        super({
            name: "bolt",
            pos,
            radius: 10,
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(_engine: Engine) {
        this.graphics.add("default", animations.bubble);
        this.graphics.use("default");
    }

    onPreUpdate(_engine: Engine, _delta: number) {

    }
}

