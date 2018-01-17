import React from 'react';
import { createGame, listenOnGames } from '../../web3';

export class GameRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: [],
            gameName: ''
        };
        this.joinGame.bind(this);
        this.createNewGame.bind(this);
        this.handleChange.bind(this);
    }

    componentWillMount() {
        const {web3} = this.props;
        console.log('contract', web3.contract);
        if (!web3.contract) {
            this.props.history.push('/contract');
            return;
        }
        let that = this;
        listenOnGames(web3.contract, function(game) {
           let games = that.state.games;
           games.push(game);
           that.setState({games: games});
        });
    }

    joinGame = (id) => {
        console.log('Joining game with id:', id);
    };

    createNewGame = (name) => {
        const {web3} = this.props;
        console.log('Creating game with name:', name);
        createGame(web3.contract, name);
        this.setState({gameName: ''});
    };

    handleChange = (e) => {
        this.setState({gameName: e.target.value});
    };

    render() {
        const {games} = this.state;
        return (
            <table>
                <tbody>
                    {
                        games.map((game, index) => (
                            <tr key={game.id}>
                                <td>{game.name}</td>
                                <td>
                                    <button onClick={() => this.joinGame(game.id)}>Join</button>
                                </td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td><input type="text" value={this.state.gameName} onChange={this.handleChange}/></td>
                        <td>
                            <button onClick={() => this.createNewGame(this.state.gameName)}>Create Game</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

}