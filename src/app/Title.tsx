import * as React from 'react';
import './Stars.css';
import './Title.css';
import {game, GameState} from "../game/Game";
import {sounds} from "../game/resources";

export class Title extends React.Component<{}, { opacity: number }> {
    state = {opacity: 0}

    componentDidMount() {
        setTimeout(() => {
            this.setState({opacity: 1})
        }, 500);
        sounds.sky.play();
    }

    newGame() {
        sounds.s2045.play(0.5);
        sounds.sky.stop();
        game.start();
    }

    editor() {
        sounds.s2045.play();

        sounds.sky.stop();
        game.editor();
    }

    settings() {
        sounds.s2045.play();

        sounds.sky.stop();
        game.state = GameState.SETTINGS
    }

    c: any;

    render() {
        return (
            <div className="Title" style={{opacity: this.state.opacity}}>
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
                <div className={"Title_menu"} id="title">
                    <button
                        onMouseLeave={() => {
                            sounds.s2043.stop()
                        }}
                        onMouseEnter={() => {
                            sounds.s2043.play(0.2);

                        }}
                        onClick={() => this.newGame()}>New Game
                    </button>
                    <button
                        onMouseLeave={() => {
                            sounds.s2043.stop()
                        }}
                        onMouseEnter={() => {
                            sounds.s2043.play(0.1);

                        }}
                        onClick={() => {
                        }}>Continue
                    </button>
                    <button
                        onMouseLeave={() => {
                            sounds.s2043.stop()
                        }}
                        onMouseEnter={() => {
                            sounds.s2043.play(.1);
                        }}
                        onClick={() => this.editor()}>Editor
                    </button>
                    <button
                        onMouseLeave={() => {
                            sounds.s2043.stop()
                        }}
                        onMouseEnter={() => {
                            sounds.s2043.play(0.2);
                        }}
                        onClick={() => {
                            this.settings()
                        }}>Settings
                    </button>
                </div>
            </div>
        );
    }

}
