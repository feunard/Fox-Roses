import * as React from 'react';
import './App.scss';
import {game} from "../game/Game";

export class Title extends React.Component<{}, {}> {
    state = {}

    componentDidMount() {
        setTimeout(async () => {
            try {
                await game.initialize();
            } catch (e) {
                console.error(e);
            }
        })
    }

    newGame() {
        game.start();
    }

    editor() {
        game.editor();
    }

    render() {
        return (
            <div>
                <button onClick={() => this.newGame()}>New Game</button>
                <button onClick={() => {
                }}>Continue
                </button>
                <button onClick={() => this.editor()}>Editor</button>
            </div>
        );
    }
}
