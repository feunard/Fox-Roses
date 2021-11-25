import {Actor, CollisionType, vec} from "excalibur";
import {IEntity} from "../interfaces";
import {animations, keyof_typeof_animations} from "../resources";

export class Graphic extends Actor {
    constructor(
        private e: IEntity,
        private type?: keyof_typeof_animations,
    ) {
        super({
            pos: vec(e.x + e.width / 2, e.y + e.height / 2),
            width: e.width,
            height: e.height,
            collisionType: CollisionType.Passive,
        });
        if (this.type) {
            this.graphics.add("default", animations[this.type]);
            this.graphics.use("default");
        }
    }
}

