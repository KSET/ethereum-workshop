import React from 'react';
/*
 * this.props.grid_size: Contains grid size
 *                       N x N table (N - Rows, N - Columns) is generated
 *
 * this.props.data: Object, Contains data related to whether column is marked or not
 *                  We use combination or row+column to identify the specific column 01, 02, 03 etc
 */
export class Board extends React.Component {
    render() {
        var dummy_array = Array.apply(null, Array(this.props.grid_size));
        return (
            <div className="board">
                <table>
                    {
                      dummy_array.map((value, row_index) => {
                        return (
                            <tr>
                                {
                                  dummy_array.map((value, column_index) => {
                                    return (
                                        <td className={this.props.data[row_index + '' + column_index]} onClick={() => {
                                            this.props.mark(row_index, column_index)
                                        }}>
                                            {this.props.data[row_index + '' + column_index]}
                                        </td>
                                    )
                                  })
                                }
                            </tr>
                        )
                      })
                    }
                </table>
            </div>
        )
    }
}
