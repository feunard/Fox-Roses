import {config_set} from "../config";
import {game} from "../Game";
import {dialogs} from "../dialogs";

export const unlock_firebolt = async () => {
    config_set({
        canFirebolt: true
    })
    game.add_message(dialogs.loot_firebolt as any)
}