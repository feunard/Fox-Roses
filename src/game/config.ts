import {Input} from "excalibur";
import {levels} from "./levels";
import {AnimationsType} from "./resources";
import {foes} from "./entities/foes";

export const GameEvents = {
    start: {},
    end: {},
    cam_back_1: {},
    cam_back_2: {}
}
export const eventList = Object.keys(GameEvents);
export type GameEventType = keyof typeof GameEvents;

export const EntityTypes = {
    floor: {},
    event: {},
    npc: {},
    foe: {}
}
export const entityTypeList = Object.keys(EntityTypes);
export type EntityTypeType = keyof typeof EntityTypes;

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
}

export interface IEntityNPC extends IEntityBase {
    type: "npc";
    name?: string;
    dialogs?: string[];
    animation: AnimationsType;
}

export interface IEntityFoe extends IEntityBase {
    type: "foe";
    name: keyof typeof foes;
}

export interface IEntityEvent extends IEntityBase {
    type: "event";
    event: GameEventType;
}

export type IEntity =
    IEntityEvent |
    IEntityNPC |
    IEntityFoe |
    IEntityFloor
    ;

export interface ILevel {
    name: string;
    entities: IEntity[];
}

export const config = {
    keybinds: {
        sit: [
            Input.Keys.S,
            Input.Keys.Down,
            Input.Keys.ShiftLeft
        ],
        left: [
            Input.Keys.A,
            Input.Keys.Q,
            Input.Keys.Left
        ],
        up: [
            Input.Keys.Up,
            Input.Keys.W,
            Input.Keys.Z
        ],
        down: [
            Input.Keys.Down,
            Input.Keys.S
        ],
        right: [
            Input.Keys.D,
            Input.Keys.Right
        ],
        jump: [
            Input.Keys.Up,
            Input.Keys.Space,
            Input.Keys.Z,
            Input.Keys.W,
        ],
        fire: [
            Input.Keys.E,
        ]
    },
    levels: levels,
    hero: 0
}
