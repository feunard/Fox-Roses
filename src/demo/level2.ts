import {Hero} from './Hero';
import {Floor} from './floor';
import {Engine, Scene} from "excalibur";

export class Level2 extends Scene {

    /**
     *
     * @private
     */
    private actor!: Hero;

    /**
     *
     * @private
     */
    private floor!: Floor;

    onInitialize(engine: Engine) {

        // Create collision groups for the game

        // Compose actors in scene
        this.actor = new Hero();
        this.floor = new Floor(0, 320, 3000, 100);

        this.add(this.actor);
        this.add(this.floor);

        // Create camera strategy
        this.camera.clearAllStrategies();
        this.camera.strategy.elasticToActor(this.actor, 0.05, 0.1);
        this.camera.zoom = 0.1;
        this.camera.zoomOverTime(1, 2000);
    }
}