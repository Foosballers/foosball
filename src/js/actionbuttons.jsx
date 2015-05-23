var React = require('react'),
    constants = require('./NotificationConstants'),
    gameActions = require('./gamesActionCreator'),
    gameStore = require('./gamestore'),
    GoalGraph = require('./goalGraph.jsx'),
    Modalizer = require('./modal-izer.jsx');


module.exports = React.createClass({
  getInitialState: function() {
    return { _onformsubmit: function() {}, _modalHeader: 'ima header' }
  }
, _submitGame: function(){
    gameActions.startGame({player1: this.refs.player1.getDOMNode().value, player2: this.refs.player2.getDOMNode().value})
    this.handleExternalHide();
    this._emptyForm();
  }
, _queueGame: function(){
    gameActions.queueGame({player1: this.refs.player1.getDOMNode().value, player2: this.refs.player2.getDOMNode().value})
    this.handleExternalHide();
    this._emptyForm();
  }
, _emptyForm: function() {
    this.refs.player1.getDOMNode().value = '';
    this.refs.player2.getDOMNode().value = '';
}
, render: function() {
    var buttons = [
        {type: 'primary', text: 'game on', handler: this.state._onformsubmit}
      , {type: 'danger',  text: 'cancel',  handler: this.handleExternalHide}
      ]
    return <div className="panel panel-default">
        <button type="button" className="btn btn-primary"
            onClick={this._onStartGameClick}>Start Next</button>&nbsp;&nbsp;
        <button type="button" className="btn btn-primary"
            onClick={this._onStartNextGameClick}>Start Next Game</button>&nbsp;&nbsp;
        <button type="button" className="btn btn-primary"
            onClick={this._onQueueGameClick}>Queue Game</button>
        <Modalizer ref="gamemodal"
            show={false}
            header={this.state._modalHeader}
            buttons={buttons}>
        <div className="panel-body">
          <form role="form">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-user"></i></span>
              <input className="form-control" ref="player1" placeholder="Player 1"></input>
            </div><br />
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-user"></i></span>
              <input className="form-control" ref="player2" placeholder="Player 2"></input>
            </div>
            <div className="input-group" hidden="hidden" >
              <button type="submit" className="btn btn-primary hidden hide" onClick={this.state._onformsubmit}>game on</button>
            </div>
          </form>
        </div>
        </Modalizer>
    </div>
  }
, handleExternalHide: function() {
    this.refs.gamemodal.hide();
  }
, _onStartNextGameClick: function () {
    var queue = gameStore.getQueue();
      if (queue.length > 0) {
      gameActions.startGame(queue[0]);
    }
  }
, _onStartGameClick: function () {
    this.setState({_onformsubmit:this._submitGame,_modalHeader:'Start a new game'})
    this.refs.gamemodal.show();
  }
, _onQueueGameClick: function () {
    this.setState({_onformsubmit:this._queueGame,_modalHeader:'Queue a game'})
    this.refs.gamemodal.show();
  }
})
