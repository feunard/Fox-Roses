import * as React from 'react';
import './App.css';
import {game, GameState} from "../game/Game";
import {Intro} from "./Intro";
import {Title} from "./Title";
import {Editor} from "./Editor";
import {End} from "./End";
import {LevelConfig} from "../game/config";

class App extends React.Component<{}, { overlay: boolean; gameState: GameState; level: LevelConfig }> {
    state = {
        overlay: true,
        gameState: game.state,
        level: game.level,
    }

    componentDidMount() {
        setTimeout(async () => {
            try {
                await game.initialize();
            } catch (e) {
                console.error(e);
            }
        })
        game.onChangeLevel((level) => {
            this.setState({level});
        });
        game.onChangeState((gameState) => {
            this.setState({gameState});
        });
    }

    render() {
        const gs = this.state.gameState;

        if (gs === GameState.LEVEL) {
            return <div>Level : {this.state.level.name}</div>;
        }

        if (gs === GameState.EDITOR) {
            return <Editor/>
        }

        return (
            <div className={"overlay"}>
                {gs === GameState.INTRO && <Intro/>}
                {gs === GameState.TITLE && <Title/>}
                {gs === GameState.END && <End/>}
            </div>
        );
    }
}

export default App;
