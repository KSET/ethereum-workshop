import React from 'react';

import { Scoreboard } from "./Scoreboard";
import { Board } from "./Board";

export class TicTacToe extends React.Component {

    constructor() {
        super();
        this.state = {
            grid_size: 3 // 3 x 3 is initial table size
        };
    }

    /*
     * Initialize the game
     */
    init() {
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
    }


    /*
     * Empty the board
     */
    empty() {
        // Zero the moves count
        this.moves = 0;
        // Empty the data
        this.setState({data: {}});
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

        // Get the current mark "X" or "O" based on the moves count
        var current_mark = this.moves % 2 === 1
            ? 'X'
            : 'O';

        // Assign mark data to the data object
        this.setState({
            data: {
                ...this.state.data,
                [row_index + '' + col_index]: current_mark
            }
        });

        // Let react update the dom
        setTimeout(() => {

            // Check if the user has won
            if (this.didWin(current_mark)) {
                alert(current_mark + " has won");
                this.setState({
                    score: {
                        ...this.state.score,
                        [current_mark]: this.state.score[current_mark] + 1
                    }
                });
                this.empty();
            }
            // Check if it's a draw
            else if (this.moves === Math.pow(this.state.grid_size, 2)) {
                alert("It's a draw !");
                this.empty();
            }
        }, 200);
    }


    //  Board:
    //  ________________
    //  | 00 | 01 | 02 |
    //  |----|----|----|
    //  | 10 | 11 | 12 |
    //  |----|----|----|
    //  | 20 | 21 | 22 |
    //  ----------------
    //
    // We need to go through all columns like
    //
    // (00, 01, 02)  (10, 11, 12)  (20, 21, 22) - Horizontal
    // (00, 10, 20)  (01, 11, 21)  (02, 12, 22) - Vertical
    // (00, 11, 22)  (02, 11, 20)               - Diagonal
    //
    // If mark is present in "all columns" of "any one of the combinations" then user won
    //
    // Instead of going through each combination manually we can make use of loops,
    // So that it can be used for any grids like 7 X 7
    //
    // Check if the player with the current mark has won
    didWin(mark) {

        // Declare variables to count the presence of the mark
        var vertical_count = 0,
            horizontal_count = 0,
            right_to_left_count = 0,
            left_to_right_count = 0;

        // Loop 1
        for (var i = 0; i < this.state.grid_size; i++) {

            // Empty the count
            vertical_count = 0;
            horizontal_count = 0;

            // Loop 2
            for (var j = 0; j < this.state.grid_size; j++) {

                // (00, 01, 02)  (10, 11, 12)  (20, 21, 22)
                if (this.state.data[i + '' + j] === mark) {
                    horizontal_count++;
                }

                // (00, 10, 20)  (01, 11, 21)  (02, 12, 22)
                if (this.state.data[j + '' + i] === mark) {
                    vertical_count++;
                }

            }

            // (00, 11, 22)
            if (this.state.data[i + '' + i] === mark) {
                left_to_right_count++;
            }

            // (this.state.grid_size - 1 - i) + '' + i ==> (02, 11, 20)
            if (this.state.data[(this.state.grid_size - 1 - i) + '' + i] === mark) {
                right_to_left_count++;
            }

            // If vertical/horizontal count matches the grid size in this loop then user has won
            if (horizontal_count === this.state.grid_size || vertical_count === this.state.grid_size) {
                return true;
            }

        }

        // If diagonal count matches the grid size then user has won
        if (left_to_right_count === this.state.grid_size || right_to_left_count === this.state.grid_size) {
            return true;
        }

        // Nobody won
        return false;
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

                <Board data={this.state.data} mark={this.mark.bind(this)}/>

                <div>
                    <button onClick={this.empty.bind(this)}>
                        Reset
                    </button>
                </div>

            </div>

        )
    }
}
