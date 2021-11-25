import {camera_back} from "./camera_back";
import {start} from "./start";
import {set_hair_color} from "./set_hair_color";
import {play_music} from "./play_music";
import {dialog} from "./dialog";

export const events = {
    camera_back,
    start,
    set_hair_color,
    play_music,
    dialog
}

export const events_keys = Object.keys(events);

export type keyof_typeof_events = keyof typeof events;