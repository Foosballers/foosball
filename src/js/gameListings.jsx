/**
 * Created by OBrien on 5/12/2015.
 */

var React = require('react'),
    gameStore = require('./gamestore'),
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
    render: function(){
        return <div className="col-lg-4"><GameList name="Recent Games" games={this.state.games} />
        <GameList name="Upcoming Games" games={this.state.queue} /></div>;
    }
});

module.exports = listing;
