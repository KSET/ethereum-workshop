import React from 'react'

export class AccountList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
        }
    }

    componentWillMount() {
        const { web3 } = this.props;
        web3.eth.getAccounts().then((accounts) => {
            this.setState({ accounts });
        })
    }

    render() {
        const { accounts } = this.state;
        const { web3 } = this.props;

        return (
            accounts.map((account, index) => (
                <button key={index}>
                    {account}
                    <ol>{web3.eth.getBalance(account).toString()}</ol>
                </button>
            ))
        );
    }
}