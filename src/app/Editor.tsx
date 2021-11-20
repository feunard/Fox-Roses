import type {MouseEvent} from "react";
import * as React from 'react';
import './Editor.scss';
import {config, entityTypeList, EntityTypeType, eventList, GameEventType, IEntity} from "../game/config";
import {game} from "../game/Game";
import {animationsList, AnimationsType} from "../game/resources";

interface EditorState {
    entities: IEntity[];
    type: EntityTypeType;
    type_event: GameEventType;
    type_npc: AnimationsType;
    selected?: IEntity;
    current: number;
}

export class Editor extends React.Component<{}, EditorState> {
    state: EditorState = {
        current: 0,
        entities: this.hardCopy(config.levels[0].entities),
        type: entityTypeList[0] as EntityTypeType,
        type_event: eventList[0] as GameEventType,
        type_npc: animationsList[0] as AnimationsType
    }

    drag = "";
    x = 0;
    y = 0;
    w = 0;
    h = 0;
    e!: IEntity;

    history: string[] = [];

    hardCopy(obj: object) {
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
                <div
                    className="Editor_area"
                    onDoubleClick={this.onDoubleClick}
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
                            <div className="border top" onMouseDown={this.mouseDownBorder(e, "top")}/>
                            <div className="border bottom" onMouseDown={this.mouseDownBorder(e, "bottom")}/>
                            <div className="border left" onMouseDown={this.mouseDownBorder(e, "left")}/>
                            <div className="border right" onMouseDown={this.mouseDownBorder(e, "right")}/>
                        </div>
                    ))}
                </div>
                <div className="Editor_toolbar">
                    <select onChange={(ev) => {
                        game.next(Number(ev.target.value));
                    }}>
                        {config.levels.map((l, it) =>
                            <option value={String(it)} key={it}>L{it + 1}</option>
                        )}
                    </select>
                    {" | "}
                    <button
                        onClick={() => {
                            game.test(
                                this.state.current,
                                this.state.entities);
                        }}>☢ Test
                    </button>
                    <button
                        onClick={() => {
                            console.log(JSON.stringify(this.state.entities, null, "  "))
                        }}>♕ Export
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
                        {entityTypeList.map((l, it) =>
                            <option value={l} key={l}>{l.toUpperCase()}</option>
                        )}
                    </select>
                    {this.state.type === "event" && (
                        <select
                            onChange={this.$("type_event")}>
                            {eventList.map((l, it) =>
                                <option value={l} key={l}>{l.toUpperCase()}</option>
                            )}
                        </select>
                    )}
                    {this.state.type === "npc" && (
                        <select
                            onChange={this.$("type_npc")}>
                            {animationsList.map((l, it) =>
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
                                <input onChange={(ev) => {
                                    const s = this.state.selected;
                                    if (s && s.type === "floor") {
                                        const v = ev.target.value;
                                        if (!v) {
                                            delete s.move;
                                        } else {
                                            s.move = s.move || {y: 0};
                                            s.move.y = Number(v);
                                        }
                                    }
                                }}/>
                            </>
                        )}
                        {this.state.selected.type === "event" && (
                            <select
                                onChange={(ev) => {
                                    const s = this.state.selected;
                                    if (s && s.type === "event") {
                                        s.event = ev.target.value as GameEventType;
                                        this.forceUpdate();
                                    }
                                }}>
                                {eventList.map((l, it) =>
                                    <option value={l} key={l}>{l.toUpperCase()}</option>
                                )}
                            </select>
                        )}
                        {this.state.selected.type === "npc" && (
                            <input
                                value={this.state.selected.name}
                                onChange={(ev) => {
                                    if (this.state.selected && this.state.selected.type === "npc") {
                                        const selected = this.state.selected;
                                        selected.name = ev.target.value;
                                        this.setState({
                                            selected
                                        });
                                    }
                                }}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }

    private onDoubleClick = (ev: MouseEvent<any>) => {
        this.saveHistory();
        console.log(ev);
        const size = 64;
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
        this.state.entities.push(e);
        this.forceUpdate();
    }
}
