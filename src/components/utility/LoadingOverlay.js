import React from 'react';

export class LoadingOverlay extends React.Component {

    constructor(props) {
        super(props);
        const {isLoading, text} = props;
        this.state = {
            isLoading: isLoading,
            text: text ? text : 'Please Wait!'
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoading !== this.state.isLoading) {
            this.setState({isLoading: nextProps.isLoading});
        }
    }

    render() {
        return (
            <div className="loader" hidden={!this.state.isLoading}>
                <div className="loader-content">
                    <img src="/loader.gif" width="100" alt="spinner" height="100" />
                    <h2 className="loader-text">{this.state.text}</h2>
                </div>
            </div>
        );
    }
}