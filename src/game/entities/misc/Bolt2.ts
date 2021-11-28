import {Engine, PreCollisionEvent} from "excalibur";
import {bolt_sheet2} from "../../resources";
import {Bolt} from "./Bolt";
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

    onPreUpdate(_engine: Engine, _delta: number) {
        this.vel.x = this.direction * 400;
        this.vel.y = 0;
    }
}

