import {Actor, CollisionType, Engine, vec} from "excalibur";
import {animations} from "../../resources";
import {IEntityFoe} from "../../config";

export class Mage extends Actor {

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

        animations.mage_idle.scale = vec(2, 2);
        animations.mage_idle.flipHorizontal = true;

        this.graphics.add("idle", animations.mage_idle);
        this.graphics.use("idle");
    }
}