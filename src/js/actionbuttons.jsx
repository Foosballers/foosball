var React = require('react'),
    constants = require('./NotificationConstants'),
    gameActions = require('./gamesActionCreator'),
    gameStore = require('./gamestore');

var actionbuttons = React.createClass({
    getInitialState: function(){
        return {};
    },
    _onStartNextGameClick: function(){
        var queue = gameStore.getQueue();
        if(queue.length > 0){
            gameActions.startGame(queue[0]);
        }
    },
    _onStartGameClick: function(){
        console.log('start game');
    },
    _onQueueGameClick: function(){
        console.log('queue game');
    },
    render: function () {

        return <span>
            <button onClick={this._onStartNextGameClick} type="button" className="btn btn-primary">Start Next Game</button>&nbsp;
            <button onClick={this._onStartGameClick} type="button" className="btn btn-primary">Start Game</button>&nbsp;
            <button onClick={this._onQueueGameClick} type="button" className="btn btn-primary">Queue Game</button>

            <div>

            </div>
        </span>
    }
});

module.exports = actionbuttons;