import {keyof_typeof_animations} from "./resources";
import {foes} from "./entities/foes";
import {keyof_typeof_events} from "./events";
import {keyof_typeof_sounds} from "./audio";

export interface IEntityBase {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface IEntityFloor extends IEntityBase {
    type: "floor";
    move?: {
        y: number;
        speed?: number;
    }
    physic?: boolean;
    color?: string;
}

export interface IEntityNPC extends IEntityBase {
    type: "npc";
    animation: keyof_typeof_animations;
    messages: IMessage[];
}

export interface IEntityFoe extends IEntityBase {
    type: "foe";
    name: keyof typeof foes;
    data1?: string;
    data2?: string;
    data3?: string;
    data4?: string;
}

export interface IEntityEvent extends IEntityBase {
    type: "event";
    event: keyof_typeof_events;
    repeat?: number; // 1
    filter?: string;
    data1?: string;
    data2?: string;
    data3?: string;
    data4?: string;
}

export type IEntity =
    IEntityEvent |
    IEntityNPC |
    IEntityFoe |
    IEntityFloor
    ;

export interface IMessage {
    content: string;
    author: string;
    icon?: string;
    sound?: keyof_typeof_sounds;
}

export interface ILevel {
    name: string;
    music?: string;
    entities: IEntity[];
}