import {IEntityEvent} from "../config";
import {Trigger, vec} from "excalibur";
import {game} from "../Game";

export class Event extends Trigger {
    constructor(private e: IEntityEvent) {
        super({
            pos: vec(e.x + e.width / 2, e.y + e.height / 2),
            width: e.width,
            height: e.height,
            repeat: 1,
            filter: (a) => a?.name === "Hero",
            action: () => {
                if (e.event === "cam_back_1") {
                    this.scene.camera.zoomOverTime(0.5, 2000);
                    this.scene.camera.rotation = 10;
                }
                if (e.event === "cam_back_2") {
                    this.scene.camera.zoomOverTime(1.2, 2000);
                }
                if (e.event === "end") {
                    game.next();
                }
            }
        });
    }
}