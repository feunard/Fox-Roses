import * as React from 'react';
import './Title.css';
import {game, GameState} from "../game/Game";

export class Title extends React.Component<{}, {opacity: number}> {
    state = {opacity: 0}

    componentDidMount() {
        setTimeout(async () => {
            try {
                await game.initialize();
            } catch (e) {
                console.error(e);
            }
        })
        setTimeout(() => {
            this.setState({opacity: 1})
        }, 1000);
    }

    newGame() {
        game.start();
    }

    editor() {
        game.editor();
    }

    render() {
        return (
            <div className="Title" style={{opacity: this.state.opacity}}>
                <div>
                    <img src={require("../resources/bg_fox.png").default} />
                </div>
                <div className="Title_h1">
                    Fox & Roses
                </div>
                <div className="Title_menu">
                    <button onClick={() => this.newGame()}>New Game</button>
                    <button onClick={() => {
                    }}>Continue
                    </button>
                    <button onClick={() => this.editor()}>Editor</button>
                    <button onClick={() => game.state = GameState.SETTINGS}>Settings</button>
                </div>
            </div>
        );
    }
}
