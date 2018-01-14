import Web3 from 'web3'

class Web3Instance {
    constructor() {
        if (typeof window.web3 !== 'undefined') {
            this.web3 = new Web3(window.web3.currentProvider);
        } else {
            this.web3 = null;
            alert("MetaMask is not running!");
        }
    }
}

export default new Web3Instance();