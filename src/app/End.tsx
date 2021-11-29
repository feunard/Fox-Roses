import * as React from 'react';
import './End.css';
import {sleep} from "../game/sleep";
import {game, GameState} from "../game/Game";

interface IEndState {
    opacity: number;
    message: string;
}

export class End extends React.Component<{}, IEndState> {
    state: IEndState = {
        opacity: 0,
        message: ""
    }

    async componentDidMount() {
        await sleep(1000);
        await this.show("Après une longue & aventureuse nuit. Notre rêveuse se réveilla au chaud chez elle. Le sourire aux lèvres.");
        await this.show("Kstore et Acidpop continuèrent leurs explorations dans les rêves, à la recherche de nouveaux compagnons.");
        await this.show("Shrek décida d'offrir des cadeaux aux morts-vivants restant, espérant les rendre gentils.");
        await this.show("Sindragoseur s'est endormi une dernière fois, la rose des rêves à ses côtés.");
        await this.show("Quant à Renard, il resta au même endroit. Espérant revoir la rêveuse une nouvelle fois.");
        this.setState({opacity: 1, message: "Fin"});
        await sleep(12000);
        game.state = GameState.TITLE;
    }

    async show(message: string) {
        this.setState({opacity: 1, message})
        await sleep(12000);
        this.setState({opacity: 0})
        await sleep(4000);
    }

    render() {
        return (
            <div className="End">
                <div className="text" style={{opacity: this.state.opacity}}>
                    {this.state.message}
                </div>
            </div>
        );
    }
}