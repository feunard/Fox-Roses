import {Actor, CollisionType, Engine, vec} from "excalibur";
import {IEntityNPC} from "../interfaces";
import {animations} from "../resources";
import {game} from "../Game";


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
        if (this.e.messages) {
            this.on("precollision", (ev) => {
                if (ev.other.name === "hero" && !ok) {
                    ok = true;
                    this.e.messages.forEach(m => game.add_message(m));
                }
            });
        }
        if (this.e.animation) {
            if (this.e.animation !== "fox") {
                animations[this.e.animation].scale = vec(2, 2);
            }
            this.graphics.add("default", animations[this.e.animation]);
            this.graphics.use("default");

        }
    }
}