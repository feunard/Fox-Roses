import * as React from 'react';
import "./Level.css";
import {ILevel} from "../game/config";

interface LevelState {
}

export class Level extends React.Component<{ level: ILevel }, LevelState> {
    state: LevelState = {}

    componentDidMount() {
        document.getElementById("game")!!.style.opacity = "1";
    }

    render() {
        return (
            <div className="Level">
                <div className="Level_title">{this.props.level.name.toUpperCase()}</div>
            </div>
        );
    }
}
