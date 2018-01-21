import React from 'react';

import { Scoreboard } from "./Scoreboard";
import { Board } from "./Board";
import {getPastBoardEvents, getPlayerSymbol, makeMove, setContract, subscribeToEvent} from "../../web3";

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
            web3.eth.defaultAccount = localStorage.getItem('account');
        }

        const gameId = this.props.match.params['gameId'];

        getPlayerSymbol(web3.contract, gameId).then(playerSymbol => {
            this.setState({ playerSymbol });

            this.loadCurrentBoardState();
            this.listenForBoardChanges();
        });
        // subscribeToEvent(web3.contract, 'GameResult', this.announceWinner);
    }

    updateBoard(event) {

    }


    announceWinner(event) {
        const mark = event.mark;

        if (!!mark) {
            alert(mark + " has won");
            this.setState({
                score: {
                    ...this.state.score,
                    [mark]: this.state.score[mark] + 1
                }
            });
        } else {
            alert("It's a draw !");
        }
    }


    listenForBoardChanges() {
        const { web3 } = this.props;
        const { gameId } = this.props.match.params;

        subscribeToEvent(web3.contract, "BoardState", function (result) {
            const board = result.board;
            // const turn = result.turn;

            console.log("Getting board state,,");
            board.forEach(position => console.log(position));
        }, {gameId: gameId});
    }


    loadCurrentBoardState() {
        const { gameId } = this.props.match.params;
        const { web3 } = this.props;
        const { grid_size, playerSymbol } = this.state;

        console.log("Loading current board state....");

        getPastBoardEvents(web3.contract, gameId).then(result => {
            const board = {};
            result.forEach(event => {
                const eventBoard = event.args.board;
                eventBoard.forEach((position, index) => {
                    const i = position.toNumber();
                    if (i !== 0) {
                        board[index % grid_size + '' + Math.floor(index / grid_size)] = this.playerSymbolConst(i);
                    }
                });

                console.log(board);
            });
            this.setState({board});
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

        makeMove(web3.contract, gameId, row_index * grid_size + col_index);

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
