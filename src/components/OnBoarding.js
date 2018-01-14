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

        return (
            accounts.map((account, index) => (
                <button key={index} onClick={() => this.props.onClick(account)}>
                    {account}
                </button>
            ))
        );
    }
}