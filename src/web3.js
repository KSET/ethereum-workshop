import Web3 from 'web3'
import abi from "./ABI";

const contractAddress = '0x9741aec2eeebf9e3e6c15d4416a57bfb9927a556';

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

export function getListOfGames(contract) {

}

export function createGame(contract, name) {

}

export function joinGame(contract, gameId) {

}

export function makeMove(contract, gameId, position) {

}


export function setContract(web3, contractAddress) {
    console.log("Setting contract on address:", contractAddress);
    const Contract = web3.eth.contract(abi);
    web3.contract = Contract.at(contractAddress);
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