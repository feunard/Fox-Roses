import * as React from 'react';
import './App.css';
import {config} from "../game/config";
import {game} from "../game/Game";

export class Editor extends React.Component<{}, {}> {

    render() {
        return (
            <div>
                {config.levels.map((l, it) =>
                    <button key={it} onClick={() => {
                        game.next(it);
                    }}>L{it + 1}</button>
                )}
                <button>test</button>
                <button>save</button>
            </div>
        );
    }
}
