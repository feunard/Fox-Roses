import {Actor, CollisionType, Engine, vec} from "excalibur";
import {IEntityNPC} from "../interfaces";
import {animations} from "../resources";
import {game} from "../Game";
import {dialogs} from "../dialogs";
import {config, config_set} from "../config";


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
        if (this.e.animation === "rose" && game.levelId === 2) {
            this.on("precollision", (ev) => {
                if (this.collider.bounds.contains(ev.other.collider.bounds)) {
                    dialogs.l3_loot.forEach(m => game.add_message(m as any));
                    config_set({
                        dragonRose: true
                    });
                }
            });
        }
        if (this.e.animation === "dragon_idle" && game.levelId === 2) {
            this.on("precollision", (ev) => {
                if (this.collider.bounds.contains(ev.other.collider.bounds)) {
                    if (config.dragonRose) {
                        dialogs.l3_loot.forEach(m => game.add_message(m as any));
                        config_set({
                            canDoubleJump: true,
                            dragonRose: false
                        });
                    }
                }
            });
        }
        if (this.e.animation) {
            if (this.e.animation === "dragon_idle") {
                animations[this.e.animation].scale = vec(4, 4);
            } else if (this.e.animation === "shrek") {
                animations[this.e.animation].scale = vec(2, 2);
            } else if (this.e.animation === "kstore") {
                animations[this.e.animation].scale = vec(1.5, 1.5);
            } else {
            }
            this.graphics.add("default", animations[this.e.animation]);
            this.graphics.use("default");
        }
    }
}