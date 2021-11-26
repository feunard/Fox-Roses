import {Event} from "../entities/Event";
import {config_set} from "../config";

export const unlock_speed = async (e: Event) => {
    config_set({
        canSpeed: true
    })
}