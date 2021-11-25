import {Actor, CollisionType, Engine, Shape, vec, Vector} from "excalibur";
import {animations} from "../../resources";
import {Hero} from "../Hero";
import {IEntityFoe} from "../../interfaces";

export class Mirror extends Actor {

    constructor(public e: IEntityFoe) {
        super({
            name: "mirror",
            pos: vec(e.x + e.width / 2, e.y + e.height / 2),
            width: e.width,
            height: e.height,
            collisionType: CollisionType.Passive,
            collider: Shape.Box(
                e.width / 2 + 8,
                e.height - 12,
                Vector.Half,
                vec(0, 8)
            ),
        });
    }

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);
        this.graphics.add("idle", animations.mirror);
        this.graphics.use("idle");

        const names = [Hero.NAME, "bolt", "mage", "war"]

        this.on("precollision", (ev) => {
            if (names.includes(ev.other.name) && !(ev.other as any)["$lock"]) {
                if (this.collider.bounds.contains(ev.other.collider.bounds)) {
                    if (this.e.data2) {
                        const target = _engine.currentScene.actors.find(e =>
                            e.name === "mirror" &&
                            (e as Mirror).e.data1 === this.e.data2);
                        if (target) {
                            (ev.other as any)["$lock"] = true;
                            setTimeout(() => {
                                (ev.other as any)["$lock"] = false;
                            }, 1000)
                            ev.other.pos = target.pos;
                        }
                    }
                }
            }
        });
    }
}