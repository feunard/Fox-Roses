import {Mirror} from "./Mirror";
import {Mage} from "./Mage";
import {War} from "./War";

export const foes = {
    Mage,
    Mirror,
    War
}

export const foes_keys = Object.keys(foes);

export type keyof_typeof_foes = keyof typeof foes;