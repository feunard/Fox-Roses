import * as React from 'react';
import './Begin.css';
import {game} from "../game/Game";
import {LevelMessage} from "./LevelMessage";
import {audio} from "../game/audio";

interface BeginState {
    opacity: number;
    message: string;
}

const sleep = async(ms: number) => await new Promise((r) => setTimeout(r, ms));

export class Begin extends React.Component<{}, BeginState> {
    state: BeginState = {
        opacity: 0,
        message: ""
    }

    async componentDidMount() {
        await sleep(1000);
        this.setState({opacity: 1})
        await sleep(1000);
        audio.play("s264");
        this.setState({message: "Mais où est-ce que je suis ?"})
        await sleep(5000);
        audio.play("s268");
        this.setState({message: "Il y a quelqu'un ?"})
        await sleep(3000);
        audio.play("s264");
        this.setState({message: "Je suis entrain de tomber ?"})
        await sleep(5000);
        audio.play("s272");
        this.setState({message: "Hey !?!"})
        await sleep(1000);
        this.setState({opacity: 0})
        await sleep(1000);
        game.start();
    }

    render() {
        return (
            <div className="Begin">
                <LevelMessage content={this.state.message}/>
            </div>
        );
    }
}