import {Event} from "../entities/Event";
import {config_set} from "../config";

export const unlock_doublejump = async (e: Event) => {
    config_set({
        canDoubleJump: true
    })
}