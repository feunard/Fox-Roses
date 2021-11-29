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
    current_count_dead = 0;
    current_startAt = 0;

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
        if (this.internalState === GameState.LEVEL && s !== GameState.LEVEL) {
            this.stop_messages();
        }
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
        this.engine.goToScene('level');
        this.engine.goToScene('level' + id);

        this.state = GameState.LEVEL;
    }

    editor() {
        this.state = GameState.EDITOR;
    }

    end_of_level() {
        const now = Date.now();
        const i = this.levelId;
        const actual_cd = config.count_dead[i];
        const actual_timer = config.timers[i];
        const cd = this.current_count_dead;
        const timer = (now - this.current_startAt) / 1000;

        if (actual_cd === -1 || actual_cd > cd) {
            const count_dead = config.count_dead;
            count_dead[i] = cd;
            config_set({
                count_dead,
            });
        }

        if (actual_timer === -1 || actual_timer > timer) {
            const timers = config.timers;
            timers[i] = timer;
            config_set({
                timers,
            });
        }

        this.current_count_dead = 0;
        this.current_startAt = 0;
        this.next();
    }

    next(levelId = -1) {
        this.current_count_dead = 0;
        this.stop_messages();
        audio.stop();
        console.log("game::next_level");

        if (this.preview) {
            console.log("game::next_level as preview: abort & back to editor");
            this.preview = false;
            this.engine.currentScene.entities.forEach(a => this.engine.currentScene.remove(a));
            this.engine.currentScene.actors.forEach(a => this.engine.currentScene.contains(a) && this.engine.currentScene.remove(a));
            this.engine.currentScene.triggers.forEach(a => this.engine.currentScene.remove(a));
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
            this.engine.currentScene.entities.forEach(a => this.engine.currentScene.remove(a));
            this.engine.currentScene.actors.forEach(a => this.engine.currentScene.contains(a) && this.engine.currentScene.remove(a));
            this.engine.currentScene.triggers.forEach(a => this.engine.currentScene.remove(a));
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
            this.current_startAt = Date.now();
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
        if (this.preview) {
            window.location.reload();
            return;
        }
        this.preview = false;
        (this.engine.currentScene as Level).clear();
        this.engine.stop();
        audio.stop();
        this.state = GameState.TITLE;
    }

    stop_messages() {
        console.log("game::clear_messages");
        clearTimeout(this.message_timer);
        this.message_timer = null;
        this.messages = [];
        this.callbacksOnMessage.forEach(c => c());
    }

    next_message() {
        console.log("game::next_message")
        clearTimeout(this.message_timer);
        this.message_timer = null;

        if (!this.messages.length) {
            console.log("game::next_message callbacksOnMessage empty")
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
            console.log("game::next_message auto-next delay")
            this.next_message();
            this.message_timer = null;
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
