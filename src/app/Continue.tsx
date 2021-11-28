import * as React from 'react';
import './Continue.css';
import {game, GameState} from "../game/Game";
import {levels} from "../game/levels";
import {audio} from "../game/audio";
import {config} from "../game/config";

interface IContinueState {

}

export class Continue extends React.Component<{}, IContinueState> {
    state: IContinueState = {}

    render() {
        return (
            <div className="Continue">
                {levels.map((l, i) =>
                    <button className="select" key={l.name} onClick={() => {
                        audio.stop();
                        audio.play("s2045");
                        game.start(i);
                    }}>
                        <span className="left">Chapitre {i + 1} - {l.name}</span>
                        <span className="right">
                            {config.roses[i] * 6} / 6
                        </span>
                    </button>
                )}
                <button onClick={() => game.state = GameState.TITLE}>Back</button>
            </div>
        );
    }
}