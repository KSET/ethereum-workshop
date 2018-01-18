import React from 'react';

import { Scoreboard } from "./Scoreboard";
import { Board } from "./Board";
import {createGame, getPlayerSymbol, joinGame, makeMove, subscribeToEvent} from "../../web3";

export class TicTacToe extends React.Component {
    constructor() {
        super();
        this.mark = this.mark.bind(this);

        this.state = {
            grid_size: 3, // 3 x 3 is initial table size
            playerSymbol: null,
            gameId: null,
        };
    }



    /*
     * Initialize the game
     */
    init() {
        const { web3 } = this.props;
        const gameId = this.props.match.params['gameId'];

        this.setState({
            // Saves & Prints the scores of player 1 & 2
            score: {
                X: 0,
                O: 0
            },
            // Contains data of current game..which column is marked by which player
            data: {}
        });

        const playerSymbol = getPlayerSymbol(web3.contract, gameId);
        this.setState({ playerSymbol });

        subscribeToEvent(web3.contract, 'BoardState', this.updateBoard);
        subscribeToEvent(web3.contract, 'GameResult', this.announceWinner);
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


    /*
     * Mark particular column
     */
    mark(row_index, col_index) {
        // Return If already marked
        if (this.state.data[row_index + '' + col_index]) {
            return;
        }

        const { gameId, playerSymbol, data } = this.state;
        makeMove(this.props.web3, gameId, (row_index + col_index) * 2);

        // Assign mark data to the data object
        /*this.setState({
            data: {
                ...data,
                [row_index + '' + col_index]: playerSymbol
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
