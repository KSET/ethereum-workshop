import React from 'react';

import './App.css';
import Web3Instance from './web3';
import {TicTacToe} from "./components/TicTacToe";
import {AccountList, GamesList} from "./components/OnBoarding";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.onAccountChoose = this.onAccountChoose.bind(this);

        this.state = {
            account: null,
            gameId: null,
        }
    }

    onAccountChoose(account) {
        this.setState({ account });
    }

    render() {
        const web3 = Web3Instance.web3;
        const contract = Web3Instance.contract;

        return (
            <div>
                <h1 className="title">Tic-Tac-Toe on Ethereum blockchain!</h1>

                {this.state.account ?
                    this.state.gameId ?
                        <TicTacToe
                            web3={web3}
                            account={this.state.account}
                            contract={contract}
                        />
                        :
                        <GamesList contract={contract} />
                    :
                    <AccountList web3={web3} onClick={this.onAccountChoose} />
                }
            </div>
        );
    }
}
