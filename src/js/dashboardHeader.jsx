var React = require('react'),
    HeaderItem = require('./gameHeaderItem.jsx'),
    gameStore = require('./gamestore.js');

var DashboardHeader = React.createClass({
    getInitialState: function () {
        return {games: gameStore.getGames(), queue: gameStore.getQueue()}
    },
    _onChange: function(){
        this.setState({games: gameStore.getGames(), queue: gameStore.getQueue()});
    },
    componentDidMount: function(){
        gameStore.addChangeListener(this._onChange);
    },
    render: function () {
        return <span>
                    <HeaderItem name="Current Game" game={gameStore.getCurrentGame()}/>
                    <HeaderItem name="Last Game" game={this.state.games[0]}/>
                    <HeaderItem name="Up Next" game={this.state.queue[0]}/>
                </span>;
    }
});

module.exports = DashboardHeader;