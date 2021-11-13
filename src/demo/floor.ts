import {Actor, CollisionType, Color, Shape, vec} from 'excalibur';

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
