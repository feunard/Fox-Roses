import {Animation, Engine, PreCollisionEvent} from "excalibur";
import {bolt_sheet2} from "../../resources";
import {Bolt, Direction} from "./Bolt";
import {Hero} from "../Hero";

export class Bolt2 extends Bolt {

    sheet() {
        return bolt_sheet2;
    }

    onPreCollision(ev: PreCollisionEvent) {
        if (ev.other.name === "hero") {
            this.kill();
            (ev.other as Hero).dead();
        }
    }

    onInitialize(_engine: Engine) {
        this.anim = Animation.fromSpriteSheet(this.sheet(), [0, 1, 2, 3, 4], 60);
        this.anim.flipHorizontal = this.direction === Direction.LEFT;
        this.graphics.add("bolt", this.anim);
        this.graphics.use("bolt");

        setTimeout(() => {
            this.kill();
        }, 4000);

        this.on("collisionstart", (ev) => {
            if (ev.other.name.includes("floor")) {
                this.kill();
            }
        });

        this.on("precollision", (ev) => {
            this.onPreCollision(ev);
        });
    }

    onPreUpdate(_engine: Engine, _delta: number) {
        this.vel.x = this.direction * 400;
        this.vel.y = 0;
    }
}

