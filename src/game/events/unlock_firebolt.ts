import {Event} from "../entities/Event";
import {config_set} from "../config";

export const unlock_firebolt = async (e: Event) => {
    config_set({
        canFirebolt: true
    })
}