import {Actor, CollisionType, Color, Engine, Shape, vec} from 'excalibur';

export class Floor extends Actor {
    static n = 0;

    constructor(x: number, y: number, width: number, height: number) {
        super({
            name: 'floor_' + (Floor.n++),
            pos: vec(x, y),
            collider: Shape.Box(width, height),
            collisionType: CollisionType.Fixed,
            color: Color.White,
            width,
            height,
        });
    }
}

export class FloorActive extends Actor {
    static n = 0;

    constructor(x: number, y: number, width: number, height: number) {
        super({
            name: 'floor_a' + (Floor.n++),
            pos: vec(x, y),
            collider: Shape.Box(width, height),
            collisionType: CollisionType.Active,
            color: Color.White,
            width,
            height,
        });
    }

    onPreUpdate(_engine: Engine, _delta: number) {
        this.vel.y = -30;
    }
}

export class FloorFixed extends Actor {
    static n = 0;

    constructor(x: number, y: number, width: number, height: number) {
        super({
            name: 'floor_m' + (Floor.n++),
            pos: vec(x, y),
            collider: Shape.Box(width, height),
            collisionType: CollisionType.Fixed,
            color: Color.White,
            width,
            height,
        });
    }

    dir = -1;
    onPreUpdate(_engine: Engine, _delta: number) {
        if (this.pos.y < -400) {
            this.dir = 1;
        }
        if (this.pos.y > -200) {
            this.dir = -1;
        }
        this.vel.y = 100 * this.dir;

    }
}
