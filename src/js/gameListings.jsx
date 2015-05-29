/**
 * Created by OBrien on 5/12/2015.
 */

var React = require('react'),
    gameStore = require('./gamestore'),
    gameActions = require('./gamesActionCreator'),
    modalActions = require('./modalActionCreator'),
    GameList = require('./gameList.jsx');

var listing = React.createClass({
    getInitialState: function(){
        return {games: gameStore.getGames(), queue: gameStore.getQueue()};
    },
    _onChange: function(){
      this.setState({games: gameStore.getGames(), queue: gameStore.getQueue()})
    },
    componentDidMount: function(){
       gameStore.addChangeListener(this._onChange);
    },
    render: function() {
        return  <div className="col-lg-4"><GameList name="Recent Games" games={this.state.games} onclickcb={this._openModal} icon="fa-area-chart" />
                    <GameList name="Upcoming Games" games={this.state.queue} onclickcb={this._startQueuedGame} />
                </div>
    }
  , _openModal: function (game) {
        return function() { modalActions.modalGame(game); };
    }
  , _startQueuedGame: function(game){
        return function() { gameActions.startGame(game); };
    }
});

module.exports = listing;
