import * as React from 'react';
import './App.css';

export class Editor extends React.Component<{}, {}> {

    render() {
        return (
            <div>
                <button>save</button>
                <button>load</button>
            </div>
        );
    }
}
