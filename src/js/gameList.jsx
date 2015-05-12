var React = require('react'),
    gameStore = require('./gamestore')

var RecentResults = React.createClass({
    render: function () {
        console.log(this.state);
        var results = this.props.games.map(function (game) {
            return <a href="#" className="list-group-item">
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
        </div>;
    }
});

module.exports = RecentResults;