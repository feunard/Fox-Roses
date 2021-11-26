import {Actor, CollisionType, Color, Engine, Shape, vec, Vector} from 'excalibur';
import {IEntityFloor} from "../../interfaces";
import {Hero} from "../Hero";

export class FloorAware {
    vel_default: Vector = vec(0, 0);

    constructor(private actor: Actor) {
    }

    update() {
        this.actor.vel.x += this.vel_default.x;
        this.actor.vel.y += this.vel_default.y;
        this.vel_default = vec(0, 0);
    }
}

export interface IFloorAware {
    floor: FloorAware;
}

export class Floor extends Actor {
    dir = -1;
    pos_initial: Vector;

    actors: IFloorAware[] = [];

    constructor(
        private e: IEntityFloor
    ) {
        super({
            name: 'floor',
            pos: vec(e.x + e.width / 2, e.y + e.height / 2),
            collider: Shape.Box(e.width, e.height),
            collisionType: e.physic ? CollisionType.Active : CollisionType.Fixed,
            color: Color.fromHex(e.color || "ffffff"),
            width: e.width,
            height: e.height,
        });
        this.pos_initial = vec(e.x + e.width / 2, e.y + e.height / 2);
    }

    get pos_with_origin() {
        return vec(this.pos.x + this.e.width / 2, this.pos.y + this.e.height / 2);
    }

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);

        if (this.e.move?.x || this.e.move?.y) {

            const names = [Hero.NAME, "mirror", "mage", "war"]
            this.on("precollision", (ev) => {
                if (names.includes(ev.other.name)) {
                    this.actors.push(ev.other as any);
                }
            })
        }
    }

    onPreUpdate(_engine: Engine, _delta: number) {
        if (this.e.move) {
            if (this.e.move.y) {
                if (this.e.move.y > 0) {
                    if (this.pos_with_origin.y <= this.pos_initial.y) {
                        this.dir = 1;
                    }
                    if (this.pos_with_origin.y >= (this.pos_initial.y + this.e.move.y)) {
                        this.dir = -1;
                    }
                } else {
                    if (this.pos_with_origin.y <= this.pos_initial.y + this.e.move.y) {
                        this.dir = 1;
                    }
                    if (this.pos_with_origin.y >= (this.pos_initial.y)) {
                        this.dir = -1;
                    }
                }
                this.vel.y = (this.e.move.speed || 100) * this.dir;
                if (this.vel.y > 0) {
                    for (const a of this.actors) {
                        a.floor.vel_default.y += (this.e.move.speed || 100) * this.dir;
                    }
                }
            }
            if (this.e.move.x) {
                if (this.e.move.x > 0) {
                    if (this.pos_with_origin.x <= this.pos_initial.x) {
                        this.dir = 1;
                    }
                    if (this.pos_with_origin.x >= (this.pos_initial.x + this.e.move.x)) {
                        this.dir = -1;
                    }
                } else {
                    if (this.pos_with_origin.x <= this.pos_initial.x + this.e.move.x) {
                        this.dir = 1;
                    }
                    if (this.pos_with_origin.x >= (this.pos_initial.x)) {
                        this.dir = -1;
                    }
                }
                this.vel.x = (this.e.move.speed || 100) * this.dir;
                for (const a of this.actors) {
                    a.floor.vel_default.x += (this.e.move.speed || 100) * this.dir;
                }
            }
            this.actors = [];
        }
    }
}