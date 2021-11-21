import * as React from 'react';
import './App.css';
import {game} from "../game/Game";
import {config} from "../game/config";

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
                <button onClick={() =>config.hero=0}>Cara</button>
                <button onClick={() =>config.hero=1}>Exias</button>
            </div>
        );
    }
}
