import {Color, Engine, Loader, Physics, Vector} from "excalibur";
import {images, sounds} from "../demo/resources";
import {Level} from "../demo/level";

export enum GameState {
    INTRO,
    TITLE,
    CONTINUE,
    LEVEL
}

export class Game {

    evs: ((s: GameState) => any)[] = [];

    _state = GameState.INTRO;

    loader = new Loader();

    engine = new Engine({
        backgroundColor: Color.Transparent,
        width: 1200,
        height: 600,
        suppressPlayButton: true,
        suppressConsoleBootMessage: true,
        antialiasing: true,
        canvasElementId: "game"
    });

    constructor() {
        this.configure();

        this.loader.playButtonText = '';
        this.loader.backgroundColor = '#ffffff'
        this.loader.logo = '';
        this.loader.loadingBarColor = Color.fromHex("#666666")

        for (const res in images) {
            this.loader.addResource(images[res]);
        }
        for (const res in sounds) {
            this.loader.addResource(sounds[res]);
        }

        this.engine.addScene('level', new Level());
    }

    configure() {
        Physics.acc = new Vector(0, 800);
    }

    initialize() {
        return this.engine.start(this.loader);
    }

    get state(): GameState {
        return this._state;
    }

    set state(s: GameState) {
        this._state = s;
        this.evs.forEach(cb => cb(s));
    }

    onStateChange(cb: (s: GameState) => any) {
        this.evs.push(cb);
    }

    start() {
        this.engine.goToScene('level');
        this.state = GameState.LEVEL;
    }
}

export const game
    = (window as any).game
    = new Game();
