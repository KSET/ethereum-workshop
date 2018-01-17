import React from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';

export class AccountList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
        };
        this.setAccount.bind(this);
    }

    componentWillMount() {
        const {web3} = this.props;
        web3.eth.getAccounts((error, accounts) => {
            this.setState({accounts});
        })
    }

    setAccount(account) {
        const {web3} = this.props;
        console.log('Account chosen:', account);
        web3.eth.defaultAccount = account;
        this.props.history.push('/contract')
    }

    render() {
        const {accounts} = this.state;

        return (
            <div>
                <Row>
                    <Col>
                        <h3>Choose your account:</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            accounts.length > 0 ?
                                accounts.map((account, index) => (
                                    <Button bsStyle="primary" key={index} onClick={() => this.setAccount(account)}>
                                        {account}
                                    </Button>
                                ))
                                :
                                <Alert bsStyle="danger">
                                    <h4>Oops, seems like you don't have any account!</h4>
                                    <p>
                                        Please check if your Metamask is working (unlocked) and refresh page (F5).
                                    </p>
                                </Alert>
                        }
                    </Col>
                </Row>
            </div>
        );
    }

}