import {Actor, CollisionType, vec} from "excalibur";
import {IEntity} from "../config";
import {animations, AnimationsType} from "../resources";

export class Graphic extends Actor {
    constructor(
        private e: IEntity,
        private type?: AnimationsType,
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

