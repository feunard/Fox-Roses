import {config_set} from "../config";
import {game} from "../Game";
import {dialogs} from "../dialogs";

export const unlock_doublejump = async () => {
    config_set({
        canDoubleJump: true
    })
    game.add_message(dialogs.loot_doublejump as any)
}