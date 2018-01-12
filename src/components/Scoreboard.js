import React from 'react';

export class Scoreboard extends React.Component {
  render() {
    return (
      <table className="scoreboard">
        <tr>
          <td> Player 1 </td>
          <td width="30"> &nbsp; </td>
          <td> Player 2 </td>
        </tr>
        <tr>
          <td className="score X">
            {this.props.score.X}
          </td>
          <td> &nbsp; </td>
          <td className="score O">
            {this.props.score.O}
          </td>
        </tr>
      </table>
    )
  }
}
