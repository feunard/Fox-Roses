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
               <div style={{textAlign: "center"}}>
                   <button onClick={() => {engine.goToScene("level2")}}>click2</button>
                   <button onClick={() => {engine.goToScene("level1")}}>click1</button>
               </div>
            </div>
        );
    }
}

export default App;
