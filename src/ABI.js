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
        "constant": true,
        "inputs": [],
        "name": "getGamesCount",
        "outputs": [
            {
                "name": "count",
                "type": "uint256"
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
        "outputs": [],
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
            }
        ],
        "name": "getBoard",
        "outputs": [
            {
                "name": "",
                "type": "uint8[9]"
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
            }
        ],
        "name": "getPlayerSymbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
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
                "name": "_symbol",
                "type": "uint8"
            }
        ],
        "name": "getPlayerAddress",
        "outputs": [
            {
                "name": "player",
                "type": "address"
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
        "constant": true,
        "inputs": [],
        "name": "ENTRY_FEE",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
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
        "name": "GameCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
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
                "indexed": true,
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
]