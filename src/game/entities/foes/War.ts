import {Actor, CollisionType, Engine, vec} from "excalibur";
import {animations} from "../../resources";
import {IEntityFoe} from "../../config";

export class War extends Actor {

    constructor(e: IEntityFoe) {
        super({
            pos: vec(e.x + e.width / 2, e.y + e.height / 2),
            width: e.width,
            height: e.height,
            collisionType: CollisionType.Passive,
        });
    }

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);

        animations.war_idle.scale = vec(2, 2);
        animations.war_idle.flipHorizontal = true;

        this.graphics.add("idle", animations.war_idle);
        this.graphics.use("idle");
    }
}