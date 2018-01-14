import React from 'react';

import './App.css';
import Web3Instance from './web3';
import {TicTacToe} from "./components/TicTacToe";
import {AccountList} from "./components/OnBoarding";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.onAccountChoose = this.onAccountChoose.bind(this);

        this.state = {
            account: null,
        }
    }

    onAccountChoose(account) {
        this.setState({ account });
    }

    render() {
        const web3 = Web3Instance.web3;

        return (
            <div>
                <h1 className="title">Tic-Tac-Toe on Ethereum blockchain!</h1>

                {this.state.account ?
                    <TicTacToe web3={web3} account={this.state.account} />
                    :
                    <AccountList web3={web3} onClick={this.onAccountChoose} />
                }
            </div>
        );
    }
}
