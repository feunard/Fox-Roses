import {Actor, CollisionType, Engine, vec} from "excalibur";
import {animations} from "../../resources";
import {IEntityFoe} from "../../config";

export class Mirror extends Actor {

    constructor(e: IEntityFoe) {
        super({
            pos: vec(e.x + e.width / 2, e.y + e.height / 2),
            width: e.width,
            height: e.height,
            collisionType: CollisionType.Passive,
        });    }

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);
        this.graphics.add("idle", animations.mirror);
        this.graphics.use("idle");
    }
}