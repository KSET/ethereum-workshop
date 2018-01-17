import React from 'react';
import { setContract } from '../../web3';
import { Button, Col, FormControl, Row } from 'react-bootstrap';

export class Contract extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contractAddress: localStorage.getItem('contractAddress') || ''
        };
        const {web3} = props;
        if(!web3.eth.defaultAccount) {
            this.props.history.push('/');
            return;
        }
        this.submitContractAddress.bind(this);
        this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({contractAddress: e.target.value});
    };

    submitContractAddress = () => {
        const {web3} = this.props;
        localStorage.setItem('contractAddress', this.state.contractAddress);
        setContract(web3, this.state.contractAddress);
        this.props.history.push('/room')
    };

    render() {
        return (
            <div>
                <Row className="show-grid">
                    <Col>
                        <h3>Enter your contract address:</h3>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col>
                        <FormControl
                            type="text"
                            value={this.state.contractAddress}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                        />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col>
                        <Button bsStyle="primary" bsSize="large" type="submit" onClick={this.submitContractAddress} block>
                            Next
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}