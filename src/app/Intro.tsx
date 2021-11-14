import * as React from 'react';
import './App.css';
import {game, GameState} from "../game/main";

class App extends React.Component<{}, {}> {

    componentDidMount() {
        setTimeout(() => {
            game.state = GameState.TITLE
        }, 1000);
    }

    render() {
        return (
            <div>
                Fox & Roses
            </div>
        );
    }
}

export default App;
