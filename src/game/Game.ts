import {Color, Engine, Loader, Physics, Vector} from "excalibur";
import {images, sounds} from "../demo/resources";
import {Level} from "../demo/level";
import {Editor} from "./Editor";
import {config, LevelConfig} from "./config";

export enum GameState {
    INTRO,
    TITLE,
    CONTINUE,
    LEVEL,
    EDITOR,
    END
}

export class Game {

    _cbs: ((s: GameState) => any)[] = [];
    _cbsl: ((s: LevelConfig) => any)[] = [];
    _state = GameState.INTRO;
    _levelId = 0;

    get level() {
        return config.levels[this._levelId];
    }

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

        this.engine.addScene('editor', new Editor());
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
        this._cbs.forEach(cb => cb(s));
    }

    onChangeLevel(cb: (s: LevelConfig) => any) {
        this._cbsl.push(cb);
    }

    onChangeState(cb: (s: GameState) => any) {
        this._cbs.push(cb);
    }

    start() {
        this.engine.goToScene('level');
        this.state = GameState.LEVEL;
    }

    editor() {
        this.engine.goToScene('editor');
        this.state = GameState.EDITOR;
    }

    next() {
        this._levelId += 1;

        if (this._levelId === config.levels.length) {
            this._levelId = 0;
            this.engine.stop();
            this.state = GameState.END;
        } else {
            this._cbsl.forEach(cb => cb(this.level));
        }
    }
}

export const game
    = (window as any).game
    = new Game();
