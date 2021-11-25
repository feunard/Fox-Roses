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

    componentDidMount() {
        setInterval(() => {
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
        }, 40)
    }

    render() {
        return (
            <span>
                {this.state.content_parts}
            </span>
        );
    }
}
