import {Input} from "excalibur";

export type LevelConfig = typeof config["levels"][0];

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
    },
    "levels": [
        {
            "name": "Test1",
            start: [100, -200],
            end: [0, -500],
        },
        {
            "name": "Test2",
            start: [100, -200],
            end: [0, -600],
        },
        {
            "name": "Test3",
            start: [-100, -200],
            end: [200, -400],
        }
    ]
}