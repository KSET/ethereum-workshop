import React from 'react';
/*
 * this.props.data: Object, Contains data related to whether column is marked or not
 *                  We use combination or row+column to identify the specific column 01, 02, 03 etc
 */
export class Board extends React.Component {
    render() {
        const dummy_array = Array.apply(null, Array(3));

        return (
            <div className="board">
                <table>
                    <tbody>
                        {
                          dummy_array.map((value, row_index) => {
                            return (
                                <tr key={row_index}>
                                    {
                                      dummy_array.map((value, column_index) => {
                                        return (
                                            <td
                                                key={column_index}
                                                className={this.props.data[row_index + '' + column_index]}
                                                onClick={() => {
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
                    </tbody>
                </table>
            </div>
        )
    }
}
