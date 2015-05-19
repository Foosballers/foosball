var React = require('react'),
    constants = require('./NotificationConstants'),
    gameActions = require('./gamesActionCreator'),
    gameStore = require('./gamestore'),
    Modal = require('react-modal');

Modal.setAppElement(document.getElementById('body'));
Modal.injectCSS();

var actionbuttons = React.createClass({
    getInitialState: function () {
        return {};
    },
    _onStartNextGameClick: function () {
        var queue = gameStore.getQueue();
        if (queue.length > 0) {
            gameActions.startGame(queue[0]);
        }
    },
    _onStartGameClick: function () {
        console.log('start game');
    },
    _onQueueGameClick: function () {
        this.setState({queuingGame: true});
        console.log('queue game');
    },
    closeModal: function () {
        this.setState({queuingGame: false});
    },
    queueGame: function(){
        console.log(this.refs.player1.getDOMNode().value);
        console.log(this.refs.player2.getDOMNode().value);
        gameActions.queueGame({player1: this.refs.player1.getDOMNode().value, player2: this.refs.player2.getDOMNode().value})
    },
    render: function () {

        return <span>
            <button onClick={this._onStartNextGameClick} type="button" className="btn btn-primary">Start Next Game
            </button>
            &nbsp;
            <button onClick={this._onStartGameClick} type="button" className="btn btn-primary">Start Game</button>
            &nbsp;
            <button onClick={this._onQueueGameClick} type="button" className="btn btn-primary">Queue Game</button>
            <Modal isOpen={this.state.queuingGame} onRequestClose={this.closeModal}>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Add a game to the queue
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-lg-4">
                                <div class="form-group">
                                    <div className="panel-body">
                                        <div className="form-group input-group">
                                            <input className="form-control" ref="player1" placeholder="Player 1"></input>
                                        </div>
                                        <div className="form-group input-group">
                                            <input className="form-control" ref="player2" placeholder="Player 2"></input>
                                        </div>
                                        <div className="form-group input-group">
                                            <button type="button" className="btn btn-primary" onClick={this.queueGame}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
                <div>

                </div>
            </span>
    }
});

module.exports = actionbuttons;