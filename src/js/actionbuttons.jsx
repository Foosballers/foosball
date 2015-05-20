var React = require('react'),
    constants = require('./NotificationConstants'),
    gameActions = require('./gamesActionCreator'),
    gameStore = require('./gamestore'),
    GoalGraph = require('./goalGraph.jsx'),
    Modalizer = require('./modal-izer.jsx');


module.exports = React.createClass({
  getInitialState: function() {
    return { }
  }
 
, render: function() {
    var buttons = [
        {type: 'primary', text: 'game on', handler: this._onStartGameClick}
      , {type: 'danger',  text: 'cancel',  handler: this.handleExternalHide}
      ]
    return <div className="panel panel-default">
        <button type="button" className="btn btn-primary"
            onClick={this.handleShowModal}>Start Next</button>&nbsp;&nbsp;
        <button type="button" className="btn btn-primary"
            onClick={this._onStartGameClick}>Start Game</button>&nbsp;&nbsp;
        <button type="button" className="btn btn-primary"
            onClick={this._onQueueGameClick}>Queue Game</button>
        <Modalizer ref="gamemodal"
            show={false}
            header="Start Game"
            buttons={buttons}>
            <p>I said what?</p>
            <GoalGraph gameId="game-03" />
        </Modalizer>
    </div>
  }
 
, handleShowModal: function() {
    this.refs.gamemodal.show();
  }
, handleExternalHide: function() {
    this.refs.gamemodal.hide();
  }
, handleDoingNothing: function() {
  }
, _onStartNextGameClick: function () {
    var queue = gameStore.getQueue();
      if (queue.length > 0) {
      gameActions.startGame(queue[0]);
    }
  }
, _onStartGameClick: function () {
    console.log('start game');
    this.refs.gamemodal.hide();
  }
, _onQueueGameClick: function () {
    this.setState({queuingGame: true});
    console.log('queue game');
  }
})
