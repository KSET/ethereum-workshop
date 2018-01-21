import React from 'react';

import { Scoreboard } from "./Scoreboard";
import { Board } from "./Board";
import {getPastEvents, getCurrentBoard, getPlayerSymbol, makeMove, setContract, subscribeToEvent} from "../../web3";

export class TicTacToe extends React.Component {
    constructor() {
        super();
        this.mark = this.mark.bind(this);

        this.state = {
            grid_size: 3, // 3 x 3
            playerSymbol: null,
            board: {},
            score: {
                X: 0,
                O: 0
            }
        };
    }

    playerSymbolConst = (number) => (number === 1 ? 'X' : 'O');

    /*
     * Initialize the game
     */
    init() {
        const { web3 } = this.props;
        // Load previous contract if user is accessing the game directly with URL
        if (web3 && !web3.contract) {
            setContract(web3, localStorage.getItem('contractAddress'));
            web3.eth.defaultAccount = sessionStorage.getItem('account');
        }

        const gameId = this.props.match.params['gameId'];

        getPlayerSymbol(web3.contract, gameId).then(playerSymbol => {
            this.setState({ playerSymbol });

            this.checkIfGameFinished();
            this.loadCurrentBoardState();
            this.listenForBoardChanges();
        });

        subscribeToEvent(web3.contract, 'GameResult', this.announceWinner);
    }

    announceWinner(event) {
        const winner = event.args ? event.args.winner : event.winner;

        if (winner) {
            alert(winner + " has won");
        } else {
            alert("It's a draw !");
        }
    }

    updateBoard(board) {
        const { grid_size } = this.state;
        const newBoard = {};

        for (let index = 0; index < board.length; index++) {
            const mark = board[index].toNumber();

            if (mark !== 0) {
                // Field has been played - contains symbol
                console.log("Mark ", this.playerSymbolConst(mark), " played on position ", index);
                newBoard[Math.floor(index / grid_size) + '' + index % grid_size] = this.playerSymbolConst(mark);
            }
        }

        this.setState({board: newBoard});
    }


    listenForBoardChanges() {
        const { web3 } = this.props;
        const { gameId } = this.props.match.params;

        let that = this;
        subscribeToEvent(web3.contract, "BoardState", function (result) {
            console.log("Updating board state...", result);
            that.updateBoard(result.board);
        }, {gameId: gameId});
    }


    loadCurrentBoardState() {
        const { gameId } = this.props.match.params;
        const { web3 } = this.props;

        console.log("Loading current board state....");

        getCurrentBoard(web3.contract, gameId).then(result => this.updateBoard(result));

        /*getPastEvents(web3.contract, 'BoardState', gameId).then(result => {
            if (result.length > 0) {
                result.forEach(event => this.updateBoard(event));
            }
        });*/
    }

    checkIfGameFinished() {
        const { gameId } = this.props.match.params;
        const { web3 } = this.props;

        let that = this;
        getPastEvents(web3.contract, 'GameResult', gameId).then(result => {
           if (result.length > 0) {
               that.announceWinner(result[0]);
           }
        });
    }

    /*
     * Mark particular column
     */
    mark(row_index, col_index) {
        // Return If already marked
        if (this.state.board[row_index + '' + col_index]) {
            return;
        }

        const { grid_size } = this.state;
        const { web3 } = this.props;
        const { gameId } = this.props.match.params;

        const position = row_index * grid_size + col_index;
        console.log("Making move on position ", position, " for gameId ", gameId);
        makeMove(web3.contract, gameId, position);

        // Assume success and update view for user
        /*this.setState({
            board: {
                ...this.state.board,
                [row_index + '' + col_index]: this.state.playerSymbol
            }
        });*/
    }


    /*
     * Initialize the game when component is ready to be mounted
     */
    componentWillMount() {
        this.init();
    }


    render() {
        return (
            <div className="tic-tac-toe">
                <Scoreboard score={this.state.score}/>

                <Board data={this.state.board} mark={this.mark}/>
            </div>

        )
    }
}