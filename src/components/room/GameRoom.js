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
        let that = this;
        web3.contract.getGamesCount(function(error, result) {
            console.log("Total number of games:", result.toNumber());
            let games = [];
            for (let i = 0; i < result.toNumber(); i++) {
                web3.contract.games(i, function(error, result) {
                    if(!error) {
                        if(result[1].toNumber() === 0) {
                            games.push({
                                name: result[0],
                                id: i
                            });
                            that.setState({games: games})
                        }
                    }
                })
            }
        });
    }

    render() {
        const { games } = this.state;
        return (
            games.map((game, index) => (
                <span key={game.id}>{game.name}</span>
            ))
        );
    }

}