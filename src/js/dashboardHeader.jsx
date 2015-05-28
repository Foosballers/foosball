var React = require('react'),
    HeaderItem = require('./gameHeaderItem.jsx'),
    Modalizer = require('./modal-izer.jsx'),
    GoalGraph = require('./goalGraph.jsx'),
    gameActions = require('./gamesActionCreator'),
    gameStore = require('./gamestore.js');

var DashboardHeader = React.createClass({
    _closeModal: function () {
        this.refs.lastGameModal.hide();
    }
  , _openModal: function () {
        this.refs.lastGameModal.show();
    }
  , getInitialState: function () {
        return {games: gameStore.getGames(), queue: gameStore.getQueue()}
    },
    _onChange: function(){
        this.setState({games: gameStore.getGames(), queue: gameStore.getQueue()});
    },
    componentDidMount: function(){
        gameStore.addChangeListener(this._onChange);
    },
    render: function () {
        var last_game = this.state.games[0];
        return <span>
                    <HeaderItem name="Current Game" game={gameStore.getCurrentGame()}/>
                    <HeaderItem name="Last Game" game={this.state.games[0]} clickable={this._openModal} />
                    <HeaderItem name="Up Next" game={this.state.queue[0]} clickable={this._startUpNextGame} />
                    <Modalizer ref="lastGameModal"
                        show={false}
                        handleShown={this._showGraph}
                        handleHidden={this._closeGraph}
                        header={last_game ? last_game.player1 + " - vs - " + last_game.player2 : "- game chart -"}
                        buttons={[
                            {type:'primary',text:'rematch',handler:this._openRematch},
                            {type:'danger',text:'close',handler:this._closeModal}]}>
                        <GoalGraph ref="rec_g_graph" gameId={last_game ? last_game.id : null} />
                    </Modalizer>
                    <Modalizer ref="rematchmodal"
                        show={false}
                        small={true}
                        header="rematch!"
                        handleHide={this._closeModal}
                        buttons={[
                            {type:'danger',text:'close',handler:this._closeRematch}]}>
                        <button type="button" className="btn btn-primary btn-block" onClick={this._rematch_swap_sides} >
                            <i className="fa fa-exchange"></i>&nbsp; swap sides
                        </button>
                        <button type="button" className="btn btn-primary btn-block" onClick={this._rematch_same_sides} >
                            <i className="fa fa-circle-o"></i>&nbsp; same sides
                        </button>
                    </Modalizer>
                </span>; }
  , _showGraph: function() {
    this.refs.rec_g_graph._show()
  }
  , _closeGraph: function() {
    this.refs.rec_g_graph._hide()
  }
  , _rematch_same_sides: function() {
        gameActions.startGame({player1: this.state.games[0].player1, player2: this.state.games[0].player2});
        this.refs.rematchmodal.hide();
  }
  , _rematch_swap_sides: function() {
        gameActions.startGame({player1: this.state.games[0].player2, player2: this.state.games[0].player1});
        this.refs.rematchmodal.hide();
  }
  , _closeRematch: function() {
        this.refs.rematchmodal.hide();
    }
  , _openRematch: function() {
        this.refs.rematchmodal.show();
    }
  , _startUpNextGame: function(game) {
    if(this.state.queue.length > 0) {
        gameActions.startGame(this.state.queue[0]);
    }
  }
});

module.exports = DashboardHeader;