import * as React from 'react';
import "./Level.css";
import {ILevel, IMessage} from "../game/interfaces";
import {LevelMessage} from "./LevelMessage";
import {game, GameState} from "../game/Game";
import {audio} from "../game/audio";
import {images} from "../resources";

interface ILevelProps {
    level: ILevel;
    message?: IMessage;
    onNext: () => any;
}

interface LevelState {
}

export class Level extends React.Component<ILevelProps, LevelState> {
    state: LevelState = {}

    componentDidMount() {
        document.getElementById("game")!!.style.opacity = "1";
    }

    render() {
        return (
            <div className="Level">
                <div className="Level_bar">
                    <div className="Level_bar_left">
                        <button onClick={() => {
                            game.engine.toggleDebug();
                        }}>debug
                        </button>
                        <button onClick={() => game.state = GameState.TITLE}>menu</button>
                    </div>
                    <div className="Level_bar_middle">
                        Chapitre {game.levelId + 1} - {game.level.name}
                    </div>
                    <div className="Level_bar_right">
                        <button onClick={() => {
                            audio.toggleVolume()
                            this.forceUpdate()
                        }}>Sound {audio.volume ? "ON" : "OFF"}</button>
                        <button onClick={() => {
                            audio.toggleMusicVolume()
                            this.forceUpdate()
                        }}>Music {audio.volumeMusic ? "ON" : "OFF"}</button>
                    </div>
                </div>
                <div className="Level_overlay overlay"/>
                <div
                    onClick={() => this.props.onNext()}
                    className={"Level_dialog " + (this.props.message ? " visible" : "")}>
                    <div className="Level_avatar">
                        {this.props.message && images[this.props.message?.icon as any] &&
                            <img src={images[this.props.message?.icon as any].image.src} alt={"icon"}/>
                        }
                    </div>
                    <div className={"Level_dialog_content "}>
                        <div className="Level_dialog_author">
                            {this.props.message?.author || " "}
                        </div>
                        <div className="Level_dialog_message">
                            <LevelMessage
                                content={this.props.message?.content || " "}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
