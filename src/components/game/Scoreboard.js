import React from 'react';

export class Scoreboard extends React.Component {
  render() {
    return (
      <table className="scoreboard">
          <tbody>
            <tr>
              <td> You are player {this.props.playerSymbol} </td>
            </tr>
          </tbody>
      </table>
    )
  }
}
