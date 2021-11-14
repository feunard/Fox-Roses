import {Input} from "excalibur";

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
        right: [
            Input.Keys.D,
            Input.Keys.Right
        ],
        jump: [
            Input.Keys.Space,
            Input.Keys.Z,
            Input.Keys.W,
        ],
        fire: [
            Input.Keys.E,
        ]
    }
}