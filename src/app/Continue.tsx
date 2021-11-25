import * as React from 'react';
import './Intro.css';
import {game, GameState} from "../game/Game";
import {levels} from "../game/levels";
import {audio} from "../game/audio";

interface IContinueState {

}

export class Continue extends React.Component<{}, IContinueState> {
    state: IContinueState = {}

    render() {
        return (
            <div className="Continue">
                {levels.map((l, i) =>
                    <button key={l.name} onClick={() => {
                        audio.stop();
                        audio.play("s2045");
                        game.start(i);
                    }}>Niveau ${i} : {l.name}</button>
                )}
                <button onClick={() => game.state = GameState.TITLE}>Back</button>
            </div>
        );
    }
}