import * as React from 'react';
import "./Level.scss";
import {ILevel} from "../game/config";

interface LevelState {
}

export class Level extends React.Component<{ level: ILevel }, LevelState> {
    state: LevelState = {}

    render() {
        return (
            <div className="Level">
                <div>{this.props.level.name.toUpperCase()}</div>
            </div>
        );
    }
}
