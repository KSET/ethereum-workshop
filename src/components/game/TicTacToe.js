import React from 'react';

import { Scoreboard } from "./Scoreboard";
import { Board } from "./Board";
import {createGame, joinGame, makeMove, subscribeToEvent} from "../../web3";

export class TicTacToe extends React.Component {
    constructor() {
        super();
        this.mark = this.mark.bind(this);

        this.state = {
            grid_size: 3, // 3 x 3 is initial table size
            playerMark: null,
            gameId: null,
        };
    }



    /*
     * Initialize the game
     */
    init() {
        // TODO: Make user input for new game or join game
        const { gameId, web3 } = this.props;
        // Saves numbers of moves made
        this.moves = 0;

        this.setState({
            // Saves & Prints the scores of player 1 & 2
            score: {
                X: 0,
                O: 0
            },
            // Contains data of current game..which column is marked by which player
            data: {}
        });

        if (!!gameId) {
            createGame(web3, "Input game name");
            this.setState({ playerMark: 'X'})
        } else {
            joinGame(web3, gameId);
            this.setState({ playerMark: 'O'})
        }

        this.subscribeToEvents();
    }

    updateBoard(event) {

    }

    subscribeToEvents() {
        const { contract } = this.props;

        subscribeToEvent(contract, 'BoardState', this.updateBoard);
        subscribeToEvent(contract, 'GameResult', this.announceWinner);
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


    /*
     * Mark particular column
     */
    mark(row_index, col_index) {
        // Return If already marked
        if (this.state.data[row_index + '' + col_index]) {
            return;
        }

        // Increment the number of moves
        this.moves++;


        const { gameId, playerMark, data } = this.state;
        makeMove(this.props.web3, gameId, (row_index + col_index) * 2);

        // Assign mark data to the data object
        /*this.setState({
            data: {
                ...data,
                [row_index + '' + col_index]: playerMark
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

                <Board data={this.state.data} mark={this.mark}/>
            </div>

        )
    }
}
