import {Engine} from "excalibur";
import {config} from "./config";

export class Keybinds {
    constructor(private engine: Engine) {
    }

    isHeld(key: keyof typeof config["keybinds"]) {
        const inputs = config.keybinds[key];
        return inputs.some(s => this.engine.input.keyboard.isHeld(s))
    }

    wasPressed(key: keyof typeof config["keybinds"]) {
        const inputs = config.keybinds[key];
        return inputs.some(s => this.engine.input.keyboard.wasPressed(s))
    }
}