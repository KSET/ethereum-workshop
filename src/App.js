import React from 'react';
import './App.css';

import {TicTacToe} from "./components/TicTacToe";

export default class App extends React.Component {
  render() {
    return (
      <div>
          <h1 class="title">Tic-Tac-Toe on Ethereum blockchain!</h1>

          <TicTacToe />
      </div>
    );
  }
}
