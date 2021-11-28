import {config_set} from "../config";
import {game} from "../Game";
import {dialogs} from "../dialogs";

export const unlock_speed = async () => {
    config_set({
        canSpeed: true
    })
    game.add_message(dialogs.loot_speed as any)
}