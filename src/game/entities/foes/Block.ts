import {Actor, CollisionType, Color, vec} from 'excalibur';
import {IEntityFloor} from "../../interfaces";

export class Block extends Actor {

    constructor(
        private e: IEntityFloor
    ) {
        super({
            name: 'floor',
            pos: vec(e.x + e.width / 2, e.y + e.height / 2),
            collisionType: CollisionType.Active,
            color: Color.Red,
            width: e.width,
            height: e.height,
        });
    }
}