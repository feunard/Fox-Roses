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

               </div>
            </div>
        );
    }
}

export default App;
