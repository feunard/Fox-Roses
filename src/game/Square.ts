import {Actor, CollisionType, Color, Vector} from "excalibur";


export class Square extends Actor {
    constructor(public type: "start" | "end", pos: Vector) {
        super({
            pos,
            name: type,
            width: 64,
            height: 64,
            color: type === "start" ? Color.Black : Color.Red,
            collisionType: CollisionType.Passive
        });
    }
}