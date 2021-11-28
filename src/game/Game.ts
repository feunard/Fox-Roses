import {Color, DisplayMode, Engine, Loader, Physics, Vector} from "excalibur";
import {images, sounds} from "../resources";
import {Level} from "./Level";
import {config, config_set} from "./config";
import {ILevel, IMessage} from "./interfaces";
import {audio} from "./audio";

export enum GameState {
    INTRO,
    TITLE,
    CONTINUE,
    LEVEL,
    EDITOR,
    END,
    SETTINGS,
    BEGIN
}

export class Game {

    messages: IMessage[] = [];
    callbacksChangeState: ((s: GameState) => any)[] = [];
    callbacksChangeLevel: ((s: ILevel) => any)[] = [];
    callbacksOnMessage: ((s?: IMessage) => any)[] = [];
    levelId = localStorage["GameLevel"] ? Number(localStorage["GameLevel"]) : 0;
    preview: boolean = false;
    loader = new Loader();
    engine = new Engine({
        displayMode: DisplayMode.FillScreen,
        backgroundColor: Color.Black,
        suppressPlayButton: true,
        suppressConsoleBootMessage: true,
        antialiasing: true,
        canvasElementId: "game"
    });
    internalState = localStorage["GameState"]
        ? Number(localStorage["GameState"])
        : GameState.INTRO;
    message_timer: any = null;
    message_delay_default = 1000 * 5;//ms

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

        config.levels.forEach((_, i) => {
            this.engine.addScene('level' + i, new Level());
        })
        this.engine.addScene('level', new Level());
    }

    get state(): GameState {
        return this.internalState;
    }

    set state(s: GameState) {
        this.internalState = s;
        this.callbacksChangeState.forEach(cb => cb(s));
    }

    get level() {
        return config.levels[this.levelId] as ILevel;
    }

    callbackIsReady: () => any = () => 0;

    configure() {
        console.log("game::configure");
        Physics.acc = new Vector(0, 800);
    }

    async initialize() {
        console.log("game::initialize")

        await this.engine.start(this.loader);

        console.log("game::initialize START=OK")

        if (this.callbackIsReady) {
            this.callbackIsReady();
        }
    }

    onChangeLevel(cb: (s: ILevel) => any) {
        this.callbacksChangeLevel.push(cb);
    }

    onChangeState(cb: (s: GameState) => any) {
        this.callbacksChangeState.push(cb);
    }

    test(id: number, entities: any) {
        console.log("game::test", id, entities);
        config.levels[id].entities = entities;

        this.next(id);
        this.preview = true;
        this.engine.start(this.loader);
        this.engine.goToScene('level' + id);

        this.state = GameState.LEVEL;
    }

    editor() {
        this.state = GameState.EDITOR;
    }

    next(levelId = -1) {
        audio.stop();
        console.log("game::next_level");

        if (this.preview) {
            console.log("game::next_level as preview: abort & back to editor");
            this.preview = false;
            this.engine.stop();
            this.state = GameState.EDITOR;
            return;
        }

        if (levelId > -1) {
            console.log("game::next_level (set one)");
            this.levelId = levelId;
        } else {
            config.roses[this.levelId] = 1;
            config_set(config);
            console.log("game::next_level (inc +1)");
            this.levelId += 1;
            this.engine.goToScene('level' + this.levelId);
        }

        if (this.levelId === config.levels.length) {
            config.roses[this.levelId] = 1;
            config_set(config);
            console.log("game::next_level game is over");
            this.levelId = 0;
            this.engine.stop();
            this.state = GameState.END;
        } else {
            console.log("game::next_level notify");
            this.callbacksChangeLevel.forEach(cb => cb(this.level));
        }
    }

    start(levelId = 0) {
        this.next(levelId);
        this.engine.goToScene('level' + levelId);
        this.engine.start();
        this.state = GameState.LEVEL;
    }

    stop() {
        this.preview = false;
        (this.engine.currentScene as Level).clear();
        this.engine.stop();
        audio.stop();
        this.state = GameState.TITLE;
    }

    next_message() {
        clearTimeout(this.message_timer);
        this.message_timer = null;

        if (!this.messages.length) {
            this.callbacksOnMessage.forEach(c => c());
            return;
        }

        const message = this.messages[0];
        console.log("game::next_message broadcast", message)
        this.callbacksOnMessage.forEach(c => c(message));
        this.messages.shift();

        if (message.sound) {
            audio.play(message.sound);
        }

        this.message_timer = setTimeout(() => {
            this.message_timer = null;
            console.log("game::next_message auto-next delay")
            this.next_message();
        }, this.message_delay_default);
    }

    add_message(message: IMessage) {
        console.log("game::add_message", message)
        this.messages.push(message);
        if (!this.message_timer) {
            this.next_message();
        }
    }

    onMessage(cb: (message?: IMessage) => any) {
        this.callbacksOnMessage.push(cb);
    }

    onReady(cb: any) {
        this.callbackIsReady = cb;
        if (this.loader.isLoaded()) {
            cb();
        }
    }
}

export const game
    = (window as any).game
    = new Game();
