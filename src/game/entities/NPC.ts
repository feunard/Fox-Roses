import {Actor, CollisionType, Engine, vec} from "excalibur";
import {IEntityNPC} from "../config";
import {animations} from "../resources";


export class NPC extends Actor {

    constructor(private e: IEntityNPC) {
        super({
            pos: vec(e.x + e.width / 2, e.y + e.height / 2),
            width: e.width,
            height: e.height,
            collisionType: CollisionType.Passive,
        });
    }

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);
        let ok = false;
        if (this.e.dialogs) {
            this.on("precollision", (ev) => {
                if (ev.other.name === "Hero" && !ok) {
                    ok = true;
                    console.log(this.e.dialogs)
                }
            });
        }
        if (this.e.animation) {
            this.graphics.add("default", animations[this.e.animation]);
            this.graphics.use("default");
        }
    }
}