import {Actor, CollisionType, Color, Shape, Vector} from 'excalibur';



export class Floor extends Actor {
    static n = 0;

    constructor(x: number, y: number, width: number, height: number) {
        super({
            name: 'Floor' + (Floor.n++),
            pos: new Vector(x, y),
            collider: Shape.Box(width, height),
            collisionType: CollisionType.Fixed,
            color: Color.White,
            width,
            height: height,
        });
    }
}
