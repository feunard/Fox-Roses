import * as React from 'react';
import "./Level.css";
import {ILevel} from "../game/config";

interface LevelState {
}

export class Level extends React.Component<{ level: ILevel }, LevelState> {
    state: LevelState = {}

    componentDidMount() {
        document.getElementById("game")!!.style.opacity = "1";
    }

    render() {
        return (
           <div className="Level">
               <div className="Level_overlay overlay">
               </div>
               <div className="Level_dialog">
                   <div className="Level_avatar">
                       <img src={require("../resources/icon.png").default}  alt={"icon"}/>
                   </div>
                   <div className="Level_dialog_content">
                       <div className="Level_dialog_author">
                        Renard
                       </div>
                       <div className="Level_dialog_message">
                           Where can I get the song that plays after you take the book? That's the only song I really like in particular and it's not on.
                       </div>
                   </div>
               </div>
           </div>
        );
    }
}
