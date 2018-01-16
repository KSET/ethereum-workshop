import React from 'react'
import {getListOfGames} from "../web3";

export class AccountList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
        }
    }

    componentWillMount() {
        const { web3 } = this.props;

        web3.eth.getAccounts((error, accounts) => {
            this.setState({ accounts });
        })
    }

    render() {
        const { accounts } = this.state;

        return (
            accounts.map((account, index) => (
                <button key={index} onClick={() => this.props.onClick(account)}>
                    {account}
                </button>
            ))
        );
    }
}

export class GamesList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
        }
    }

    componentWillMount() {
        const { contract } = this.props;

        const games = getListOfGames(contract);
        this.setState({ games });
    }

    render() {
        const { games } = this.state;

        return (
            games.map((game, index) => (
                <button key={index} onClick={() => this.props.onClick(game)}>
                    {game}
                </button>
            ))
        )
    }
}