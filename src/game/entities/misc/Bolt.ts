import {Actor, Animation, CollisionType, Engine, Vector} from "excalibur";
import {bolt_sheet} from "../../resources";
import {BoundingBox} from "excalibur/build/dist/Collision/BoundingBox";

export enum Direction {
    LEFT = -1, RIGHT = 1
}

export const contains = (big: BoundingBox, small: BoundingBox) => {
    if (big.left > small.left) return false;
    if (big.right < small.right) return false;
    if (big.top > small.top) return false;
    if (big.bottom < small.bottom) return false;
    return true;
}

export class Bolt extends Actor {

    anim!: Animation;

    constructor(
        pos: Vector,
        private direction: Direction
    ) {
        super({
            name: "bolt",
            pos,
            radius: 10,
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(_engine: Engine) {
        this.anim = Animation.fromSpriteSheet(bolt_sheet, [0, 1, 2, 3, 4], 60);
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
            if (ev.other.name === "mage") {
                if (ev.other.collider.bounds.contains(this.collider.bounds)) {
                    this.kill();
                    ev.other.kill();
                }
            }
            if (ev.other.name === "war") {
                if (this.collider.localBounds.getPoints().every(p => ev.other.collider.localBounds.contains(p))) {
                    this.kill();
                    ev.other.kill();
                }
            }
        });
    }

    onPreUpdate(_engine: Engine, _delta: number) {
        this.vel.x = this.direction * 600;
        this.vel.y = 0;
    }
}

