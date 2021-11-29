import {Actor, Animation, CollisionType, Engine, PreCollisionEvent, Vector} from "excalibur";
import {bolt_sheet} from "../../resources";
import {BoundingBox} from "excalibur/build/dist/Collision/BoundingBox";

export enum Direction {
    LEFT = -1, RIGHT = 1
}

export const contains = (big: BoundingBox, small: BoundingBox) => {
    if (big.left > small.left) return false;
    if (big.right < small.right) return false;
    if (big.top > small.top) return false;
    return big.bottom >= small.bottom;

}

export class Bolt extends Actor {

    anim!: Animation;

    constructor(
        pos: Vector,
        public direction: Direction
    ) {
        super({
            name: "bolt",
            pos,
            radius: 10,
            collisionType: CollisionType.Passive
        });
    }

    sheet() {
        return bolt_sheet;
    }

    onPreCollision(ev: PreCollisionEvent) {
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
        if (ev.other.name === "bolt2") {
            this.kill();
            ev.other.kill();
        }
    }

    onInitialize(_engine: Engine) {
        this.anim = Animation.fromSpriteSheet(this.sheet(), [0, 1, 2, 3, 4], 60);
        this.anim.flipHorizontal = this.direction === Direction.LEFT;
        this.graphics.add("bolt", this.anim);
        this.graphics.use("bolt");

        setTimeout(() => {
            this.kill();
        }, 800);

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
        this.vel.x = this.direction * 600;
        this.vel.y = 0;
    }
}

