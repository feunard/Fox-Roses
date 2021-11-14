import * as React from 'react';
import './App.css';
import {game, GameState} from "../game/Game";

export class End extends React.Component<{}, {}> {

    render() {
        return (
            <div>
                The End.
                <button onClick={() => {
                    game.state = GameState.TITLE;
                }}>back to title</button>
            </div>
        );
    }
}