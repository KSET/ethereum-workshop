import Web3 from 'web3'
import abi from "./ABI";

const contractAddress = '0x9741aec2eeebf9e3e6c15d4416a57bfb9927a556';

class Web3Instance {
    constructor() {
        if (typeof window.web3 !== 'undefined') {
            this.web3 = new Web3(window.web3.currentProvider);
            // this.contract = new this.web3.eth.Contract(abi, contractAddress);
            const Contract = this.web3.eth.contract(abi);
            this.contract  = Contract.at(contractAddress);
        } else {
            this.web3 = null;
            this.contract = null;
            alert("MetaMask is not running!");
        }
    }
}

export default new Web3Instance();

export function getListOfGames(contract) {

}

export function createGame(contract, name) {

}

export function joinGame(contract, gameId) {

}

export function makeMove(contract, gameId, position) {

}

export function subscribeToEvent(contract, eventName, callback) {
    contract[eventName]({}, {},
        function(error, log) {
            console.log(error);


            if (!error) {
                callback(log);
            }
        }
    );
}