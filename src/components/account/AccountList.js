import React from 'react';

export class AccountList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
        };
        this.setAccount.bind(this);
    }

    componentWillMount() {
        const { web3 } = this.props;
        web3.eth.getAccounts((error, accounts) => {
            this.setState({ accounts });
        })
    }

    setAccount(account) {
        const { web3 } = this.props;
        console.log("Account chosen:", account);
        web3.account = account;
        this.props.history.push('/contract')
    }

    render() {
        const { accounts } = this.state;

        return (
            accounts.map((account, index) => (
                <button key={index} onClick={() => this.setAccount(account)}>
                    {account}
                </button>
            ))
        );
    }

}