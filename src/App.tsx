import * as React from 'react';
import './App.css';
import {engine} from "./demo/main";
import {loader} from "./demo/resources";

class App extends React.Component {
    componentDidMount() {
        setTimeout(async() => {
            try {
                await engine.start(loader);
            } catch (e) {
                console.error(e);
            }
        })
    }

    render() {
        return (
            <div className="App">
                <div className="App-StatusBar"></div>
                <div className="App-Content"></div>
                <div className="App-Menu">
                    <h1>Hello :)</h1>
                </div>
            </div>
        );
    }
}

export default App;
