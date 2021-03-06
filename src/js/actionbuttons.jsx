var React = require('react'),
    constants = require('./NotificationConstants'),
    gameActions = require('./gamesActionCreator'),
    gameStore = require('./gamestore'),
    playerStore = require('./playerStore'),
    GoalGraph = require('./goalGraph.jsx'),
    Select = require('react-select'),
    Modalizer = require('./modal-izer.jsx');

var buildOptions = function(players){
    return players.map(function(player){
        return {value: player, label: player};
    });
}

module.exports = React.createClass({
    _onChange: function(event){
      this.setState({players: buildOptions(playerStore.getPlayers())});
    },
    getInitialState: function () {
        var players = playerStore.getPlayers();
        return {
            _onformsubmit: function () {
            },
            _modalHeader: 'ima header',
            players: players
        }
    },
    componentDidMount: function(){
      playerStore.addChangeListener(this._onChange);
    },
    _submitGame: function () {
        var players1 = this.refs.player1.state.value.split('/').sort().join('/');
        var players2 = this.refs.player2.state.value.split('/').sort().join('/');
        gameActions.startGame({player1: players1, player2: players2});
        this.handleExternalHide();
    }, _queueGame: function () {
        gameActions.queueGame({player1: this.refs.player1.state.value, player2: this.refs.player2.state.value})
        this.handleExternalHide();
    },
    render: function () {
        var buttons = [
            {type: 'primary', text: 'game on', handler: this.state._onformsubmit}
            , {type: 'danger', text: 'cancel', handler: this.handleExternalHide}
        ]
        return <div className="panel panel-default">
            <button type="button" className="btn btn-primary"
                    onClick={this._onStartGameClick}>Start New Game
            </button>
            &nbsp;&nbsp;
            <button type="button" className="btn btn-primary"
                    onClick={this._onStartNextGameClick}>Start Next Game
            </button>
            &nbsp;&nbsp;
            <button type="button" className="btn btn-primary"
                    onClick={this._onQueueGameClick}>Queue Game
            </button>
            <Modalizer ref="gamemodal"
                       show={false}
                       header={this.state._modalHeader}
                       handleShown={this._setinputfocus}
                       handleHidden={this._emptyForm}
                       buttons={buttons}>
                <div className="panel-body">
                    <form role="form">
                        <div>
                            <Select ref="player1" name="player1" delimiter="/" options={this.state.players} multi={true}
                                    onChange={this._player1Changed}></Select>
                        </div>
                        <br />

                        <div>
                            <Select ref="player2" name="player2" delimiter="/" options={this.state.players} multi={true}
                                    onChange={this._player2Changed}></Select>
                        </div>
                        <div className="input-group" hidden="hidden">
                            <button type="submit" className="btn btn-primary hidden hide"
                                    onClick={this.state._onformsubmit}>game on
                            </button>
                        </div>
                    </form>
                </div>
            </Modalizer>
        </div>
    }
    ,
    handleExternalHide: function () {
        this.refs.gamemodal.hide();
    }
    ,
    _onStartNextGameClick: function () {
        var queue = gameStore.getQueue();
        if (queue.length > 0) {
            gameActions.startGame(queue[0]);
        }
    }
    ,
    _onStartGameClick: function () {
        this.setState({_onformsubmit: this._submitGame, _modalHeader: 'Start a new game'})
        this.refs.gamemodal.show();
    }
    ,
    _onQueueGameClick: function () {
        this.setState({_onformsubmit: this._queueGame, _modalHeader: 'Queue a game'})
        this.refs.gamemodal.show();
    }
    ,
    _setinputfocus: function () {
        this.refs.player1.getDOMNode().focus();
    }
    ,
    _emptyForm: function () {
        this.refs.player1.getDOMNode().value = '';
        this.refs.player2.getDOMNode().value = '';
    }
})
