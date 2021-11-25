import * as React from 'react';
import './App.css';
import {game, GameState} from "../game/Game";
import {Intro} from "./Intro";
import {Title} from "./Title";
import {Editor} from "./Editor";
import {End} from "./End";
import {ILevel, IMessage} from "../game/interfaces";
import {Level} from "./Level";
import {Settings} from "./Settings";
import {Continue} from "./Continue";
import {Begin} from "./Begin";

interface AppState {
    overlay: boolean;
    gameState: GameState;
    level: ILevel;
    message?: IMessage;
}

class App extends React.Component<{}, AppState> {
    state: AppState = {
        overlay: true,
        gameState: game.state,
        level: game.level,
    }

    componentDidMount() {
        game.onChangeLevel((level) => {
            this.setState({level});
        });
        game.onChangeState((gameState) => {
            this.setState({gameState});
        });
        game.onMessage((message) => {
            this.setState({message});
        });
    }

    render() {
        const gs = this.state.gameState;

        if (gs === GameState.LEVEL) {
            return <Level
                level={this.state.level}
                message={this.state.message}
                onNext={() => {
                    game.next_message();
                }}
            />
        }

        return (
            <div className={"overlay " + (gs === GameState.EDITOR ? "full" : "")}>
                {gs === GameState.INTRO && <Intro/>}
                {gs === GameState.TITLE && <Title/>}
                {gs === GameState.EDITOR && <Editor/>}
                {gs === GameState.END && <End/>}
                {gs === GameState.SETTINGS && <Settings/>}
                {gs === GameState.CONTINUE && <Continue/>}
                {gs === GameState.BEGIN && <Begin/>}
            </div>
        );
    }
}

export default App;
