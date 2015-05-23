/**
 * Created by OBrien on 5/12/2015.
 */

var React = require('react'),
    gameStore = require('./gamestore'),
    Modalizer = require('./modal-izer.jsx'),
    GoalGraph = require('./goalGraph.jsx'),
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
        return <div className="col-lg-4"><GameList name="Recent Games" games={this.state.games} onclickcb={this._openModal} />
            <GameList name="Upcoming Games" games={this.state.queue} />
            <Modalizer ref="recentModal"
                show={false}
                handleShown={this._showGraph}
                handleHidden={this._closeGraph}
                header=""
                buttons={[{type:'danger',text:'close',handler:this._closeModal}]}>
                <GoalGraph gameId={this.state.chartGameId} ref="game_goal_modalizer" />
            </Modalizer></div>;
    }
  , _showGraph: function() {
    this.refs.game_goal_modalizer._show()
  }
  , _closeGraph: function() {
    this.refs.game_goal_modalizer._hide()
  }
  , _closeModal: function () {
        this.refs.recentModal.hide();
    }
  , _openModal: function (gameId) {
        var that = this;
        return function() {
            that.setState({chartGameId: gameId});
            that.refs.recentModal.show();
        }
    }
});

module.exports = listing;
