var React = require('react'),
    HeaderItem = require('./gameHeaderItem.jsx'),
    gameActions = require('./gamesActionCreator'),
    modalActions = require('./modalActionCreator'),
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
    _modalLastGame: function() {
        modalActions.modalGame(this.state.games[0]);
    },
    render: function () {
        var last_game = this.state.games[0];
        return <span>
                    <HeaderItem name="Current Game" game={gameStore.getCurrentGame()}/>
                    <HeaderItem name="Last Game" game={this.state.games[0]} clickable={this._modalLastGame} />
                    <HeaderItem name="Up Next" game={this.state.queue[0]} clickable={this._startUpNextGame} />
                </span>; }
  , _startUpNextGame: function(game) {
    if(this.state.queue.length > 0) {
        gameActions.startGame(this.state.queue[0]);
    }
  }
});

module.exports = DashboardHeader;