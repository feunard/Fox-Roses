import {Actor, CollisionType, Engine, Shape, vec, Vector} from "excalibur";
import {animations} from "../../resources";
import {Hero} from "../Hero";
import {IEntityFoe} from "../../interfaces";
import {audio} from "../../audio";

export class Spawn extends Actor {

    constructor(public e: IEntityFoe) {
        super({
            name: "spawn",
            pos: vec(e.x + e.width / 2, e.y + e.height / 2),
            width: e.width,
            height: e.height,
            collisionType: CollisionType.Passive,
            collider: Shape.Box(
                e.width + 16,
                e.height + 16,
                Vector.Half,
                vec(0, 0)
            ),
        });
    }

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);
        this.graphics.add("disabled", animations.crystal_red);
        this.graphics.add("enabled", animations.crystal_blue);
        this.graphics.use("disabled");

        const names = [Hero.NAME]

        this.on("precollision", (ev) => {
            if (names.includes(ev.other.name)) {
                if (this.collider.bounds.contains(ev.other.collider.bounds)) {
                    const e = (ev.other as Hero);
                    if (!e.spawn.equals(this.pos)) {
                        (ev.other as Hero).spawn = this.pos;
                        audio.play("crystal");
                        this.graphics.use("enabled");
                    }
                }
            }
        });
    }
}