import {Actor, CollisionType, Color, Engine, Shape, vec} from 'excalibur';
import {IEntityFloor} from "../../interfaces";
import {Hero} from "../Hero";

export class Floor extends Actor {
    dir = -1;
    hero: Hero | null = null;

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
    }

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);
        if (this.e.move?.x) {
            this.on("precollision", (ev) => {
                if (ev.target.name === "hero") this.hero = ev.target as Hero;
            })
        }
    }

    onPreUpdate(_engine: Engine, _delta: number) {
        if (this.e.move) {
            if (this.e.move.y) {
                if (this.pos.y <= this.e.y) {
                    this.dir = 1;
                }
                if (this.pos.y >= (this.e.y + this.e.move.y)) {
                    this.dir = -1;
                }
                this.vel.y = (this.e.move.speed || 100) * this.dir;
            } else if (this.e.move.x) {
                if (this.pos.x <= this.e.x) {
                    this.dir = 1;
                }
                if (this.pos.x >= (this.e.x + this.e.move.x)) {
                    this.dir = -1;
                }
                this.vel.x = (this.e.move.speed || 100) * this.dir;
                if (this.hero) {
                    this.hero.vel.x = (this.e.move.speed || 100) * this.dir;
                    this.hero = null;
                }
            }
        }
    }
}