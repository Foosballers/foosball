var React = require('react');

var GameHeader = React.createClass({
    render: function(){
        return <div className="col-lg-3 col-md-6">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <i className="fa fa-trophy fa-5x"></i>
                                </div>
                                <div className="col-xs-9 text-right">
                                    <div className="huge pull-left">{this.props.game.player1Score}</div>
                                    <div className="huge pull-right">{this.props.game.player2Score}</div>
                                    <div className="pull-left">{this.props.game.player1}</div>
                                    <div className="pull-right">{this.props.game.player2}</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div className="panel-footer">
                                <span className="pull-left">{this.props.name}</span>
                                <div className="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>;
    }
});

module.exports = GameHeader;