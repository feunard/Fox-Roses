import * as React from 'react';
import './App.css';
import {game, GameState} from "../game/main";
import Intro from "./Intro";
import Title from "./Title";

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

    start() {
        game.start();
    }

    render() {
        const gs = this.state.gameState;

        if (gs === GameState.LEVEL) {
            return null;
        }

        return (
            <div className={"overlay"}>
                {gs === GameState.INTRO && <Intro/>}
                {gs === GameState.TITLE && <Title/>}
            </div>
        );
    }
}

export default App;
