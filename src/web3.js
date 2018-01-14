import Web3 from 'web3'
import abi from "./ABI";

const contractAddress = '';

class Web3Instance {
    constructor() {
        if (typeof window.web3 !== 'undefined') {
            this.web3 = new Web3(window.web3.currentProvider);
            this.contract = new this.web3.eth.Contract(abi, contractAddress);
        } else {
            this.web3 = null;
            alert("MetaMask is not running!");
        }
    }
}

export default new Web3Instance();

export function getListOfGames(web3) {

}

export function createGame(web3, name) {

}

export function joinGame(web3, gameId) {

}

export function makeMove(web3, gameId, position) {

}

export function subscribeToEvent(web3, eventName, callback) {
    return web3.eth.subscribe(eventName, {},
        function(error, result){
            if (!error) {
                alert("Error event");
                console.log(error);
            }

            console.log(result);
            callback(result);
        }
    );
}