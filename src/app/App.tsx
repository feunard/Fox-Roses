import * as React from 'react';
import './App.css';
import {game, GameState} from "../game/Game";
import {Intro} from "./Intro";
import {Title} from "./Title";
import {Editor} from "./Editor";
import {End} from "./End";

class App extends React.Component<{}, { overlay: boolean; gameState: GameState }> {
    state = {
        overlay: true,
        gameState: game.state
    }

    componentDidMount() {
        setTimeout(async () => {
            try {
                await game.initialize();
            } catch (e) {
                console.error(e);
            }
        })

        game.onStateChange((gameState) => {
            this.setState({gameState});
        });
    }

    render() {
        const gs = this.state.gameState;

        if (gs === GameState.LEVEL) {
            return null;
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
