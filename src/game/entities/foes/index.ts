import {Mirror} from "./Mirror";
import {Mage} from "./Mage";
import {War} from "./War";
import {Spawn} from "./Spawn";

export const foes = {
    Mage,
    Mirror,
    War,
    Spawn,
}

export const foes_keys = Object.keys(foes);

export type keyof_typeof_foes = keyof typeof foes;