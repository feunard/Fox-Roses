import * as React from 'react';
import './App.css';
import {config} from "../game/config";
import {game, GameState} from "../game/Game";

export class Settings extends React.Component<{}, { hero: number }> {
    state = {hero: config.hero}

    render() {
        return (
            <div>
                <button
                    disabled={this.state.hero === 0}
                    onClick={() => {
                        this.setState({hero: 0});
                        config.hero = 0;
                    }}>Cara
                </button>
                <button
                    disabled={this.state.hero === 1}
                    onClick={() => {
                        this.setState({hero: 1});
                        config.hero = 1;
                    }}>Exias
                </button>
                {" "}
                <button onClick={() => game.state = GameState.TITLE}>Back</button>
            </div>
        );
    }
}
