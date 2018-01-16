import React from 'react';

export class GameRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: []
        };
    }

    componentWillMount() {
        const {web3} = this.props;
        console.log("contract", web3.contract);
        if(!web3.contract) {
            this.props.history.push('/contract');
            return;
        }
        web3.contract.getGamesCount(function(error, result) {
            console.log(result);
        });
        // console.log("num", gamesCount);
        // let games = [];
        // for (let i = 0; i < gamesCount; i++) {
        //     games.push(web3.contract.games(i));
        // }
        // console.log(games);
        // this.setState({games: games});
    }

    render() {
        const { games } = this.state;
        return (
            games.map((game, index) => (
                <span>{game.name}</span>
            ))
        );
    }

}