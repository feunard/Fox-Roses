import * as React from 'react';
import './Intro.css';
import {game, GameState} from "../game/Game";
import {sounds} from "../resources";

interface IntroState {
    opacity: number;
    loading: boolean;
    progress: number;
}

export class Intro extends React.Component<{}, IntroState> {
    state: IntroState = {
        opacity: 0,
        loading: true,
        progress: 0,
    }

    leaving = false;
    interval: any;

    next = () => {

        if (this.state.loading) return;

        if (this.leaving) return;

        this.leaving = true;

        sounds.s2045.play();

        setTimeout(() => {
            game.state = GameState.TITLE
        }, 1000);

        clearInterval(this.interval);

        this.setState({opacity: 0})
    }


    async componentDidMount() {
        setTimeout(() => {
            game.onReady(() => {
                this.setState({loading: false});
            });
            this.setState({opacity: 1})
        }, 1000);

        this.interval = setInterval(() => {
            this.setState({progress: game.loader.progress * 100})
        }, 500);

        try {
            await game.initialize();
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const text = "A Fox and Roses"
        return (
            <div className="Intro" onClick={this.next}>
                <div className={"title" + (this.state.opacity ? " then" : "")} style={{opacity: this.state.opacity}}>
                    <div id="container">
                        <h1>{text}</h1>
                        <h1>{text}</h1>
                        <h1>{text}</h1>
                    </div>
                    <div className="loading" style={{marginTop: 32}}>
                        {this.state.loading && <span>{Math.floor(this.state.progress)} %</span>}
                        {!this.state.loading && <span>Cliquez n'importe où pour continuer.</span>}
                    </div>
                </div>
            </div>
        );
    }
}