import Web3 from 'web3'
import abi from "./ABI";
import { GameState } from './GameState';

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

export function listenOnGames(contract, addGameCallback) {
    contract.getGamesCount(function (error, result) {
        console.log('Total number of games:', result.toNumber());
        for (let i = 0; i < result.toNumber(); i++) {
            contract.games(i, function (error, result) {
                if (!error) {
                    addGameCallback({
                       id: i,
                       name: result[0],
                       status: result[1].toNumber(),
                       turn: result[2].toNumber()
                    });
                } else {
                    console.log("error while fetching game with id:", i, error);
                }
            })
        }
    });
    subscribeToEvent(contract, "GameCreated", function (result) {
       addGameCallback({
           id: result.gameId.toNumber(),
           name: result.name,
           status: GameState.WAITING,
           turn: result.turn.toNumber()
       })
    });
}

export function createGame(contract, name) {
    contract.createGame(name, {value: contract.ENTRY_FEE}, function(error, result) {
        if (!error) {
            console.log("Contract transaction send: TransactionHash: "
                + result + " waiting to be mined...");
        }
    });
}

export function joinGame(contract, gameId) {

}

export function makeMove(contract, gameId, position) {

}


export function setContract(web3, contractAddress) {
    console.log("Setting contract on address:", contractAddress);
    const Contract = web3.eth.contract(abi);
    web3.contract = Contract.at(contractAddress);
    web3.contract.ENTRY_FEE(function (error, result) {
        web3.contract.ENTRY_FEE = result.toNumber();
    });
}

export function subscribeToEvent(contract, eventName, callback) {
    contract[eventName]({}, {},
        function(error, log) {
            console.log(error);


            if (!error) {
                console.log(eventName, log);
                callback(log.args);
            }
        }
    );
}