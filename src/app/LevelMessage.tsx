import * as React from 'react';

interface ILevelMessageProps {
    content: string;
}

interface ILevelMessageState {
    content_parts: string;
}

export class LevelMessage extends React.Component<ILevelMessageProps, ILevelMessageState> {

    content_it = 0;
    content_to_display = "";

    state: ILevelMessageState = {
        content_parts: "",
    }

    clock: any = null;

    componentDidMount() {
        this.timer();
    }

    timer() {
        this.clock = setInterval(() => {
            this.tick();
        }, 32);
    }

    tick() {
        if (this.props.content !== "") {
            if (this.props.content !== this.content_to_display) {
                this.content_to_display = this.props.content;
                this.content_it = 1;
                this.setState({content_parts: this.content_to_display.slice(0, this.content_it)})
            } else {
                this.content_it += 1;
                this.setState({content_parts: this.content_to_display.slice(0, this.content_it)})
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.clock);
    }

    render() {
        return (
            <span className={"text"}>
                {this.state.content_parts}
            </span>
        );
    }
}
