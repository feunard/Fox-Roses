import * as React from 'react';
import './Intro.scss';
import {game, GameState} from "../game/Game";


interface IntroState {
    opacity: number
}

export class Intro extends React.Component<{}, IntroState> {
    state: IntroState = {
        opacity: 0
    }

    componentDidMount() {
        setTimeout(() => {
            setTimeout(() => {
                setTimeout(() => {
                        game.state = GameState.TITLE
                    },1000);
                this.setState({opacity: 0})
            }, 2000);
            this.setState({opacity: 1})
        }, 1000);
    }

    render() {
        return (
            <div className="Intro">
                <div className={"title" + (this.state.opacity ? " then" : "")} style={{opacity: this.state.opacity}}>
                    <img src="icon.png" alt={"icon"}/>
                    <div>
                        Feunard
                        <br/><span className="sub">github.com/feunard</span>
                    </div>
                </div>
            </div>
        );
    }
}