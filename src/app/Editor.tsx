import type {MouseEvent} from "react";
import * as React from 'react';
import './Editor.css';
import {config, config_set} from "../game/config";
import {entities_keys, keyof_typeof_entities} from "../game/entities";
import {IEntity, ILevel} from "../game/interfaces";
import {game, GameState} from "../game/Game";
import {animations, animations_keys, keyof_typeof_animations} from "../game/resources";
import {foes, foes_keys, keyof_typeof_foes} from "../game/entities/foes";
import {events_keys, keyof_typeof_events} from "../game/events";

interface EditorState {
    level: ILevel;
    entities: IEntity[];
    type: keyof_typeof_entities;
    type_event: keyof_typeof_events;
    type_npc: keyof_typeof_animations;
    type_foe: keyof_typeof_foes;
    selected?: IEntity;
    current: number;
}

export class Editor extends React.Component<{}, EditorState> {
    state: EditorState = this.createState();

    drag = "";
    x = 0;
    y = 0;
    w = 0;
    h = 0;
    e!: IEntity;

    history: string[] = [];

    changeLevel = () => {
        this.setState(this.createState())
    }

    componentDidMount() {
        //game.onChangeLevel(this.changeLevel);
    }

    componentWillUnmount() {
    }

    createState(): EditorState {
        return {
            current: game.levelId,
            level: config.levels[game.levelId],
            entities: this.copy(config.levels[game.levelId].entities),
            type: entities_keys[0] as keyof_typeof_entities,
            type_event: events_keys[0] as keyof_typeof_events,
            type_npc: animations_keys[0] as keyof_typeof_animations,
            type_foe: foes_keys[0] as keyof_typeof_foes,
            selected: undefined
        }
    }

    copy(obj: object) {
        return JSON.parse(JSON.stringify(obj));
    }

    saveHistory() {
        this.history.unshift(JSON.stringify(this.state.entities));
    }

    mouseDownEntity = (e: IEntity) => (ev: MouseEvent) => {
        this.drag = "entity";
        this.e = e;
        this.x = ev.pageX - e.x;
        this.y = ev.pageY - e.y;
        this.saveHistory();
    }

    mouseDownBorder = (e: IEntity, type = "") => (ev: MouseEvent) => {
        ev.stopPropagation();
        ev.preventDefault();
        this.drag = "border_" + type;
        this.x = ev.pageX;
        this.y = ev.pageY;
        this.w = e.width;
        this.h = e.height;
        this.e = e;
        this.saveHistory();
    }

    mouseUp = () => {
        this.drag = "";
    }

    mouseMove = (ev: MouseEvent) => {

        const mod = (x: number) => x - x % 8;

        if (this.drag === "border_right") {
            this.e.width = mod(this.w + ev.pageX - this.x);
            this.forceUpdate();
        }
        if (this.drag === "border_left") {
            this.e.x = mod(ev.pageX);
            this.e.width = mod(this.w + (this.x - ev.pageX));
            this.forceUpdate();
        }
        if (this.drag === "border_top") {
            this.e.y = mod(ev.pageY);
            this.e.height = mod(this.h + (this.y - ev.pageY));
            this.forceUpdate();
        }
        if (this.drag === "border_bottom") {
            this.e.height = mod(this.h + ev.pageY - this.y);
            this.forceUpdate();
        }
        if (this.drag === "entity") {
            this.e.x = mod(ev.pageX - this.x);
            this.e.y = mod(ev.pageY - this.y);
            this.forceUpdate();
        }
    }

    stopEvent(ev: React.UIEvent<HTMLDivElement>) {
        ev.stopPropagation();
        ev.preventDefault();
    }

    action = (action: (ev: React.UIEvent<HTMLDivElement>) => any, history = true) => (ev: any) => {
        this.stopEvent(ev);
        if (history)
            this.saveHistory();
        try {
            action(ev);
        } catch (e) {
            console.error(e);
        }
    }

    $ = (n: keyof EditorState) => (ev: any) => {
        this.setState({[n]: String(ev.target["value"])} as any);
    }

    deleteEntity(e: IEntity) {
        const index = this.state.entities.indexOf(e);
        if (index > -1) {
            this.state.entities.splice(index, 1);
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div
                className="Editor"
                onMouseUp={this.mouseUp}
                onMouseMove={this.mouseMove}

            >
                <style>
                    {"body { overflow: auto !important }"}
                </style>
                <div
                    onDoubleClick={this.onDoubleClick}
                    className="Editor_area"
                >
                    {this.state.entities.map((e, i) => (
                        <div
                            onDoubleClick={this.action(() => {
                                if (this.state.selected === e) {
                                    this.setState({selected: undefined});
                                } else {
                                    this.setState({selected: e});
                                }
                            })}
                            onMouseDown={this.mouseDownEntity(e)}
                            onClick={this.stopEvent}
                            key={i}
                            className={"Editor_entity " + (this.state.selected === e ? "selected" : "")}
                            style={{
                                zIndex: this.state.selected === e ? 9999 : i,
                                left: e.x,
                                top: e.y,
                                color: "white",
                                width: e.width,
                                height: e.height,
                                backgroundColor: e.type === "event" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)"
                            }}
                        >
                            {e.type === "floor" && "floor"}
                            {e.type === "event" && e.event}
                            {e.type === "npc" && e.animation}
                            {e.type === "foe" && e.name}

                            <div className="border top" onMouseDown={this.mouseDownBorder(e, "top")}/>
                            <div className="border bottom" onMouseDown={this.mouseDownBorder(e, "bottom")}/>
                            <div className="border left" onMouseDown={this.mouseDownBorder(e, "left")}/>
                            <div className="border right" onMouseDown={this.mouseDownBorder(e, "right")}/>
                        </div>
                    ))}
                </div>
                <div className="Editor_toolbar">
                    <select
                        value={game.levelId}
                        onChange={(ev) => {
                            game.next(Number(ev.target.value));
                            localStorage.setItem("GameLevel", ev.target.value)
                        }}>
                        {config.levels.map((l, it) =>
                            <option value={String(it)} key={it}>L{it + 1}</option>
                        )}
                    </select>
                    {" | "}
                    <button
                        onClick={() => {
                            game.state = GameState.TITLE;
                        }}> Title
                    </button>
                    {" | "}
                    <button
                        onClick={() => {
                            const save = {
                                ...this.state.level,
                                entities: this.state.entities,
                            };
                            const levels = config.levels;
                            levels[game.levelId] = save;
                            config_set({
                                levels
                            })
                            navigator.clipboard.writeText(JSON.stringify(save, null, "  "))
                            game.test(
                                this.state.current,
                                this.state.entities);
                        }}>☢ Test
                    </button>
                    {" | "}
                    <button
                        onClick={() => {
                            const save = {
                                ...this.state.level,
                                entities: this.state.entities,
                            };
                            const levels = config.levels;
                            levels[game.levelId] = save;
                            config_set({
                                levels
                            })
                            navigator.clipboard.writeText(JSON.stringify(save, null, "  "))
                        }}>♕ Export
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem("$config");
                            window.location.href = "/";
                        }}> Reset
                    </button>
                    <button
                        onClick={() => {
                            localStorage.setItem("GameState", "4");
                            window.location.href = "/";
                        }}> dev
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem("GameState");
                            localStorage.removeItem("GameLevel");
                            window.location.href = "/";
                        }}> nodev
                    </button>
                    <button
                        onClick={() => {
                            if (this.history.length) {
                                this.setState({entities: JSON.parse(this.history[0])})
                                this.history.splice(0, 1);
                            }
                        }}>☇ Back
                    </button>
                    {" | "}
                    <select
                        onChange={this.$("type")}>
                        {entities_keys.map((l) =>
                            <option value={l} key={l}>{l.toUpperCase()}</option>
                        )}
                    </select>
                    {this.state.type === "event" && (
                        <select
                            onChange={this.$("type_event")}>
                            {events_keys.map((l) =>
                                <option value={l} key={l}>{l.toUpperCase()}</option>
                            )}
                        </select>
                    )}
                    {this.state.type === "npc" && (
                        <select
                            onChange={this.$("type_npc")}>
                            {animations_keys.map((l) =>
                                <option value={l} key={l}>{l.toUpperCase()}</option>
                            )}
                        </select>
                    )}
                    {this.state.type === "foe" && (
                        <select
                            onChange={this.$("type_foe")}>
                            {Object.keys(foes).map((l) =>
                                <option value={l} key={l}>{l.toUpperCase()}</option>
                            )}
                        </select>
                    )}
                </div>
                {this.state.selected && (
                    <div className="Editor_toolbar_entity">
                        (w:{this.state.selected.width})
                        (h:{this.state.selected.height})
                        (x:{this.state.selected.x})
                        (y:{this.state.selected.y})
                        <button
                            onClick={this.action(() => {
                                    this.deleteEntity(this.state.selected!!)
                                    this.setState({selected: undefined})
                                }
                            )}>
                            ♱ Delete
                        </button>
                        {this.state.selected.type === "floor" && (
                            <>
                                <input
                                    value={this.state.selected?.move?.y || 0}
                                    onChange={(ev) => {
                                        const s = this.state.selected;
                                        if (s && s.type === "floor") {
                                            const v = ev.target.value;
                                            s.move = s.move || {y: 0, x: 0, speed: 0};
                                            s.move.y = Number(v);
                                            this.forceUpdate();
                                        }
                                    }}
                                />
                                <input
                                    value={this.state.selected?.move?.x || 0}
                                    onChange={(ev) => {
                                        const s = this.state.selected;
                                        if (s && s.type === "floor") {
                                            const v = ev.target.value;
                                            s.move = s.move || {y: 0, x: 0, speed: 0};
                                            s.move.x = Number(v);
                                            this.forceUpdate();
                                        }
                                    }}
                                />
                                <input
                                    value={this.state.selected?.move?.speed || 0}
                                    onChange={(ev) => {
                                        const s = this.state.selected;
                                        if (s && s.type === "floor") {
                                            const v = ev.target.value;
                                            s.move = s.move || {y: 0, x: 0, speed: 0};
                                            s.move.speed = Number(v);
                                            this.forceUpdate();
                                        }
                                    }}
                                />
                                <input
                                    type={"color"}
                                    value={this.state.selected.color || "#ffffff"}
                                    onChange={(ev) => {
                                        const s = this.state.selected;
                                        if (s && s.type === "floor") {
                                            const v = ev.target.value;
                                            if (!v) {
                                                delete s.color;
                                            } else {
                                                s.color = v;
                                                this.forceUpdate();
                                            }
                                        }
                                    }}/>
                                <input type={"checkbox"}
                                       value={String(this.state.selected.move?.hero || false)}
                                       onChange={(ev) => {
                                           const s = this.state.selected;
                                           if (s && s.type === "floor") {
                                               s.move = s.move || {y: 0, x: 0, speed: 0};
                                               s.move.hero = ev.target.checked;
                                               this.forceUpdate();
                                           }
                                       }}
                                />
                            </>
                        )}
                        {this.state.selected.type === "event" && (
                            <>
                                <select
                                    onChange={(ev) => {
                                        const s = this.state.selected;
                                        if (s && s.type === "event") {
                                            s.event = ev.target.value as keyof_typeof_events;
                                            this.forceUpdate();
                                        }
                                    }}>
                                    {events_keys.map((l) =>
                                        <option value={l} key={l}>{l.toUpperCase()}</option>
                                    )}
                                </select>

                            </>
                        )}
                        {this.state.selected.type === "npc" && (
                            <input
                                value={this.state.selected.animation}
                                onChange={(ev) => {
                                    if (this.state.selected && this.state.selected.type === "npc") {
                                        const selected = this.state.selected;
                                        selected.animation = ev.target.value as any;
                                        this.setState({
                                            selected
                                        });
                                    }
                                }}
                            />
                        )}
                        {(this.state.selected.type === "foe" || this.state.selected.type === "event") && (
                            <>
                                <input
                                    placeholder="data1"
                                    value={this.state.selected.data1 || ""}
                                    onChange={(ev) => {
                                        const selected = this.state.selected;
                                        if (selected && (selected.type === "foe" || selected.type === "event")) {
                                            selected.data1 = ev.target.value;
                                            this.setState({
                                                selected
                                            });
                                        }
                                    }}
                                />
                                <input
                                    placeholder="data2"
                                    value={this.state.selected.data2 || ""}
                                    onChange={(ev) => {
                                        const selected = this.state.selected;
                                        if (selected && (selected.type === "foe" || selected.type === "event")) {
                                            selected.data2 = ev.target.value;
                                            this.setState({
                                                selected
                                            });
                                        }
                                    }}
                                />
                                <input
                                    placeholder="data3"
                                    value={this.state.selected.data3 || ""}
                                    onChange={(ev) => {
                                        const selected = this.state.selected;
                                        if (selected && (selected.type === "foe" || selected.type === "event")) {
                                            selected.data3 = ev.target.value;
                                            this.setState({
                                                selected
                                            });
                                        }
                                    }}
                                />
                                <input
                                    placeholder="data3"
                                    value={this.state.selected.data4 || ""}
                                    onChange={(ev) => {
                                        const selected = this.state.selected;
                                        if (selected && (selected.type === "foe" || selected.type === "event")) {
                                            selected.data4 = ev.target.value;
                                            this.setState({
                                                selected
                                            });
                                        }
                                    }}
                                />
                            </>
                        )}
                    </div>
                )}
            </div>
        );
    }

    private onDoubleClick = (ev: MouseEvent<any>) => {
        this.saveHistory();
        console.log(ev);
        let size = 64;
        if (this.state.type === "npc") {
            const sizes = {
                acidpop: 64,
                kstore: 96,
                dragon_idle: 256,
                shrek: 128
            }
            size = sizes[this.state.type_npc] || animations[this.state.type_npc].height || 128;
        }
        if (this.state.type === "foe") {
            size = 48 * 2;
            if (this.state.type_foe === "Mirror") {
                size = 128;
            }
        }
        const e: any = {
            type: this.state.type as any,
            x: ev.pageX - size / 2,
            y: ev.pageY - size / 2,
            width: size,
            height: size
        };
        if (e.type === "event") {
            e.event = this.state.type_event;
        }
        if (e.type === "npc") {
            e.animation = this.state.type_npc;
            e.dialogs = [""];
            e.name = this.state.type_npc;
        }
        if (this.state.type === "foe") {
            e.name = this.state.type_foe;
        }
        this.state.entities.push(e);
        this.forceUpdate();
    }
}
