var React = require('react'),
    gameStore = require('./gamestore');

var RecentResults = React.createClass({
    getInitialState: function() {
        return { }
    }
  , render: function () {
        var f = this.props.onclickcb || function(throwaway) { return function() {}; }
        var icon_col = this.props.icon
            ? {left_class: 'col-lg-11', col: <div className="col-lg-1 left-border-gray"><i className="fa fa-area-chart"/></div>}
            : {left_class: 'col-lg-12', body: ''}
        var results = this.props.games.map(function (game) {
            return <a href="#" onClick={f(game.id)} className="list-group-item">
                <div className="row">
                    <div className={icon_col.left_class}>
                        <i className={(game.player1Score > game.player2Score) ? "fa fa-trophy fa-fw" : ""}></i>
                            {game.player1} - {game.player1Score}
                        <span className="pull-right">{game.player2Score} - {game.player2}
                            <i className={(game.player2Score > game.player1Score) ? "fa fa-trophy fa-fw" : ""}></i>
                        </span>
                    </div>
                    {icon_col.col}
                </div>
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
        </div>;
    }
});

module.exports = RecentResults;