var React = require('react'),
    Modalizer = require('./modal-izer.jsx'),
    GoalGraph = require('./goalGraph.jsx'),
    gameStore = require('./gamestore');

var RecentResults = React.createClass({
    _closeModal: function () {
        this.refs.recentModal.hide();
    }
  , _openModal: function (gameId) {
        var that = this;
        return function() {
            that.setState({chartGameId: gameId});
            that.refs.recentModal.show();
        }
    }
  , getInitialState: function() {
        return { }
    }
  , render: function () {
        var f = this._openModal
        var results = this.props.games.map(function (game) {
            return <a href="#" onClick={f(game.id)} className="list-group-item">
                    <i className={(game.player1Score > game.player2Score) ? "fa fa-trophy fa-fw" : ""}></i>
                    {game.player1} - {game.player1Score}
                <span className="pull-right">{game.player2Score} - {game.player2}
                    <i className={(game.player2Score > game.player1Score) ? "fa fa-trophy fa-fw" : ""}></i>
                </span>
            </a>;
        })
        return <div className="panel panel-default">
            <div className="panel-heading">
                <i className="fa fa-futbol-o fa-fw"></i>{this.props.name}
            </div>
            <div className="panel-body">
                <div className="list-group">
                    {results}
                </div>
            </div>
            <Modalizer ref="recentModal"
                show={false}
                handleShown={this._showGraph}
                handleHide={this._closeGraph}
                header={this.props._modalheader} 
                buttons={[{type:'danger',text:'close',handler:this._closeModal}]}>
                <GoalGraph gameId={this.state.chartGameId} ref="game_goal_modalizer" />
            </Modalizer>
        </div>;
    }
  , _showGraph: function() {
    this.refs.game_goal_modalizer._show()
  }
  , _closeGraph: function() {
    this.refs.game_goal_modalizer._hide()
  }
});

module.exports = RecentResults;