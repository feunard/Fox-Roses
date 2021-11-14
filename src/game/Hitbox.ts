import {Actor, CollisionType, PolygonCollider, Side} from "excalibur";

export class Hitbox extends Actor {
    contact: string;

    constructor(
        collider: PolygonCollider,
        private side: Side
    ) {
        super({
            collider,
            collisionType: CollisionType.Passive,
        });
        this.on("precollision", (ev) => {
            if (ev.other?.name.includes("floor") && ev.side === this.side) {
                console.log("LOCK", ev.other.name)
                this.contact = ev.other.name;
            }
        });
        this.on("collisionend", (ev) => {
            if (ev.other?.name === this.contact) {
                this.contact = "";
            }
        });
        this.contact = "";
    }
}

