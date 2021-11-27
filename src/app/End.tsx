import * as React from 'react';
import './End.css';
import {game, GameState} from "../game/Game";

export class End extends React.Component<{}, {}> {

    componentDidMount() {
        setTimeout(() => {
            game.state = GameState.TITLE;
        }, 85 * 1000)
    }

    render() {
        return (
            <div className="End">
                The End.
            </div>
        );
    }
}