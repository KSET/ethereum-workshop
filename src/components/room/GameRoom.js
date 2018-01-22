import React from 'react';
import { createGame, listenOnGames, joinGame, subscribeToEvent, getPlayerAddress } from '../../web3';
import { Alert, Button, Col, FormControl, Row } from 'react-bootstrap';
import { GameState } from '../../GameState';

export class GameRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: [],
            gameName: '',
        };

        this.joinGame = this.joinGame.bind(this);
        this.createNewGame = this.createNewGame.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        const {web3, stopLoading} = this.props;
        console.log('contract', web3.contract);
        if (!web3.contract) {
            this.props.history.push('/contract');
            return;
        }
        let that = this;
        console.log('Starting to listen on incoming games');

        // Waiting for new games
        listenOnGames(web3.contract, function (game) {
            stopLoading();
            let games = that.state.games;
            if(!that.gameExists(games, game.id)) {
                getPlayerAddress(web3.contract, game.id, 1).then(result => {
                    if (result === sessionStorage.getItem('account') && game.status === GameState.READY) {
                        that.props.history.push(`/game/${game.id}`);
                    }
                    console.log('Found game:', game);
                    if (game.status === GameState.WAITING) {
                        games.push(game);
                        that.setState({games});
                    }
                    stopLoading();
                });
            }
        }, function() {
            stopLoading();
        });
    }

    gameExists(games, gameId) {
        return games.filter(game => game.id === gameId).length > 0;
    }

    gameExists(games, gameId) {
        return games.filter(game => game.id === gameId).length > 0;
    }

    joinGame = (game) => {
        const {web3, startLoading, stopLoading} = this.props;
        let that = this;
        if (game.status === GameState.WAITING) {
            console.log("My address", sessionStorage.getItem('account'));
            startLoading();

            joinGame(web3.contract, game.id).then(() => {
                subscribeToEvent(web3.contract, 'BoardState', function (result) {
                    console.log('Received BoardState event', result);
                    if(result.gameId.toNumber() === game.id) {
                        that.props.history.push(`/game/${game.id}`)
                    }
                });
            }, (error) => stopLoading());
        }
    };

    createNewGame = (name) => {
        const {web3, startLoading, stopLoading} = this.props;
        console.log('Creating game with name:', name);
        createGame(web3.contract, name).then(function(result){}, function(error) {
            stopLoading();
        });
        startLoading();
        this.setState({gameName: ''});
    };

    handleChange = (e) => {
        this.setState({gameName: e.target.value});
    };

    render() {
        const {games} = this.state;
        return (
            <div>
                <Row>
                    <Col>
                        <h3>Join game or create new!</h3>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col md={8}>
                        <h4><b>Game Name</b></h4>
                    </Col>
                    <Col md={4}>
                    </Col>
                </Row>
                {
                    games.length > 0 ?
                        games.map((game, index) => (
                            <Row key={index} className="show-grid">
                                <Col md={8}>
                                    {game.name}
                                </Col>
                                <Col md={4}>
                                    {
                                        game.status === GameState.WAITING ?
                                        <Button block bsStyle="primary" onClick={() => this.joinGame(game)}>
                                            Join
                                        </Button> : ''
                                    }
                                </Col>
                            </Row>
                        ))
                        :
                        <Row>
                            <Alert bsStyle="warning">
                                There is <b>0</b> active games. Please create new game!
                            </Alert>
                        </Row>
                }
                <Row className="show-grid">
                    <Col md={8}>
                        <FormControl
                            type="text"
                            value={this.state.gameName}
                            placeholder="TicTac1..."
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col md={4}>
                        <Button bsStyle="primary" block
                                onClick={() => this.createNewGame(this.state.gameName)}>
                            Create Game
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }

}