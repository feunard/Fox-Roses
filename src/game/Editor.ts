import {Engine, Scene} from "excalibur";

export class Editor extends Scene {

    onInitialize(engine: Engine) {
        this.camera.clearAllStrategies();
        this.camera.zoom = 1;
    }
}