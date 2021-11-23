import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import {game} from "./game/Game";

// =
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
