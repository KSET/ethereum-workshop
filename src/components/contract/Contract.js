import React from 'react';
import { setContract } from '../../web3';

export class Contract extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contractAddress: ''
        };
        this.submitContractAddress.bind(this);
        this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({contractAddress: e.target.value});
    };

    submitContractAddress = () => {
        const {web3} = this.props;
        setContract(web3, this.state.contractAddress);
        this.props.history.push('/room')
    };

    render() {
        return (
            <div>
                <h3>Enter your contract address:</h3>
                <input
                    type="text"
                    value={this.state.contractAddress}
                    onChange={this.handleChange}
                />
                <input type="button" value="Next" onClick={this.submitContractAddress}/>
            </div>
        );
    }
}