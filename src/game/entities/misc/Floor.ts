import {Actor, CollisionType, Color, Engine, Shape, vec, Vector} from 'excalibur';
import {IEntityFloor} from "../../interfaces";
import {Hero} from "../Hero";

export class Floor extends Actor {
    dir = -1;
    hero: Hero | null = null;
    pos_initial: Vector;

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
            this.on("precollision", (ev) => {
                if (ev.other.name === "hero") {
                    this.hero = ev.other as Hero;
                }
            })
        }
    }

    onPreUpdate(_engine: Engine, _delta: number) {
        if (this.e.move) {
            if (this.e.move.y) {
                if (this.pos_with_origin.y <= this.pos_initial.y + this.e.move.y) {
                    this.dir = 1;
                }
                if (this.pos_with_origin.y >= (this.pos_initial.y)) {
                    this.dir = -1;
                }
                this.vel.y = (this.e.move.speed || 100) * this.dir;
                if (this.hero
                    && this.vel.y > 0 // do not use positive Y as gravity handle that
                ) {
                    this.hero.vel_default.y += (this.e.move.speed || 100) * this.dir;
                }
            }
            if (this.e.move.x) {
                if (this.pos_with_origin.x <= this.pos_initial.x) {
                    this.dir = 1;
                }
                if (this.pos_with_origin.x >= (this.pos_initial.x + this.e.move.x)) {
                    this.dir = -1;
                }
                this.vel.x = (this.e.move.speed || 100) * this.dir;
                if (this.hero) {
                    this.hero.vel_default.x += (this.e.move.speed || 100) * this.dir;
                }
            }
            this.hero = null;
        }
    }
}