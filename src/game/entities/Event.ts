import {IEntityEvent} from "../interfaces";
import {Trigger, vec} from "excalibur";
import {events} from "../events";
import {Hero} from "./Hero";

export class Event extends Trigger {
    constructor(public config: IEntityEvent) {
        super({
            pos: vec(
                config.x + config.width / 2,
                config.y + config.height / 2
            ),
            width: config.width,
            height: config.height,
            repeat: config.repeat || 1,
            filter: (a) => a?.name === Hero.NAME,
            action: () => events[config.event](this)
        });
    }
}