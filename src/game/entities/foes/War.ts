import {Actor, CollisionType, Engine, Shape, vec, Vector} from "excalibur";
import {animations} from "../../resources";
import {IEntityFoe} from "../../interfaces";

export class War extends Actor {

    constructor(e: IEntityFoe) {
        super({
            name: "war",
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

        animations.war_idle.scale = vec(2, 2);
        animations.war_idle.flipHorizontal = true;

        this.graphics.add("idle", animations.war_idle);
        this.graphics.use("idle");
    }
}