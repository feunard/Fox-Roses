import {Event} from "../entities/Event";
import {game} from "../Game";
import {dialogs} from "../dialogs";
import {IMessage} from "../interfaces";

export const dialog = async (e: Event) => {
    const data1 = e.config.data1;
    if (data1 && dialogs[data1]) {
        dialogs[data1].forEach((o: IMessage) => game.add_message(o));
    }
}