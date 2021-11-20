import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import {game} from "./game/Game";

game.initialize()
    .catch((e) => {
        console.error(e);
    })
// =
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
