export default [
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "games",
        "outputs": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "status",
                "type": "uint8"
            },
            {
                "name": "turn",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_gameId",
                "type": "uint256"
            },
            {
                "name": "position",
                "type": "uint8"
            }
        ],
        "name": "move",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "createGame",
        "outputs": [
            {
                "name": "gameId",
                "type": "uint256"
            },
            {
                "name": "board",
                "type": "uint8[9]"
            },
            {
                "name": "turn",
                "type": "uint8"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_gameId",
                "type": "uint256"
            },
            {
                "name": "_symbol",
                "type": "uint8"
            }
        ],
        "name": "getPlayer",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_gameId",
                "type": "uint256"
            },
            {
                "name": "position",
                "type": "uint8"
            }
        ],
        "name": "getBoardPosition",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_gameId",
                "type": "uint256"
            }
        ],
        "name": "joinGame",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "gameId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "board",
                "type": "uint8[9]"
            },
            {
                "indexed": false,
                "name": "turn",
                "type": "uint8"
            }
        ],
        "name": "BoardState",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "gameId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "winner",
                "type": "address"
            }
        ],
        "name": "GameResult",
        "type": "event"
    }
];