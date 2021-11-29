import {Event} from "../entities/Event";
import {audio} from "../audio";

export const play_music = async (e: Event) => {

    if (e.config.data1) {
        audio.playMusic(e.config.data1 as any, false);
    }
}