import * as React from 'react';
import './Stars.css';
import './Title.css';
import {game, GameState} from "../game/Game";
import {audio} from "../game/audio";

export class Title extends React.Component<{}, { opacity: number }> {
    state = {opacity: 0}
    c: any;

    componentDidMount() {
        setTimeout(() => {
            this.setState({opacity: 1})
        }, 500);
        audio.playMusic("sky");
    }

    new_game() {
        audio.stop();
        audio.play("s2045");
        game.state = GameState.BEGIN

    }

    continue() {
        game.state = GameState.CONTINUE
    }

    editor() {
        audio.stop();
        audio.play("s2045");
        game.editor();
    }

    settings() {
        game.state = GameState.SETTINGS
    }

    render() {
        return (
            <div className="Title" style={{opacity: this.state.opacity}}>
                <div id="stars"/>
                <div id="stars2"/>
                <div id="stars3"/>
                <div className={"Title_menu"} id="title">
                    <button
                        onClick={() => this.new_game()}>Nouvelle Partie
                    </button>
                    <button
                        onClick={() => {
                            this.continue();
                        }}>Continuer
                    </button>
                    <button
                        onClick={() => this.editor()}>Editeur
                    </button>
                </div>
            </div>
        );
    }

}
