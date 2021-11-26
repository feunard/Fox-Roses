import {Event} from "../entities/Event";
import {game} from "../Game";
import {audio} from "../audio";

export const shake = async (e: Event) => {

    if (
        e.config.data1 &&
        e.config.data2 &&
        e.config.data3
    ) {
        game.engine.currentScene.camera.shake(Number(e.config.data1), Number(e.config.data2), Number(e.config.data3))
        if (e.config.data4) {
            audio.play(e.config.data4 as any)
        }
    }
}