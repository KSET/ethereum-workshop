import React from 'react';

import './App.css';

export default class App extends React.Component {

    render() {

        return (
            <div>
                <h1 className="title">Tic-Tac-Toe on Ethereum blockchain!</h1>

                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
