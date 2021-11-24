import * as React from 'react';
import "./Level.css";
import {ILevel, IMessage} from "../game/config";

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
                <div className="Level_overlay overlay">
                </div>
                <div className={"Level_dialog " + (this.props.message ? " visible" : "")}>
                    <div className="Level_avatar">
                        <img src={require("../resources/icon.png").default} alt={"icon"}/>
                    </div>
                    <div className={"Level_dialog_content "}>
                        <div className="Level_dialog_author">
                            {this.props.message?.author || ""}
                        </div>
                        <div className="Level_dialog_message">
                            {this.props.message?.content || ""}
                        </div>
                    </div>
                    <button onClick={() => this.props.onNext()}>
                        {"NEXT"}
                    </button>
                </div>

            </div>
        );
    }
}
