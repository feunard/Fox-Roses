import * as React from 'react';
import './App.css';
import {game} from "../game/main";

class App extends React.Component<{}, { overlay: boolean }> {
    state = {overlay: true}

    componentDidMount() {
        setTimeout(async () => {
            try {
                await game.initialize();
            } catch (e) {
                console.error(e);
            }
        })
    }

    start() {
        game.start();
        this.setState({overlay: false});
    }

    render() {
        return (
            <div>
                {this.state.overlay && <div className={"overlay"}>
                    <button onClick={() => this.start()}>New Game</button>
                    <button onClick={() => this.start()}>Continue</button>
                </div>}
            </div>
        );
    }
}

export default App;
