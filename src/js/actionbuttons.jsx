var React = require('react'),
    constants = require('./NotificationConstants'),
    gameActions = require('./gamesActionCreator'),
    gameStore = require('./gamestore'),
    GoalGraph = require('./goalGraph.jsx'),
    Modalizer = require('./modal-izer.jsx');


module.exports = React.createClass({
  getInitialState: function() {
    return { _onclickcb: function() {}, _modalHeader: 'ima header' }
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
        {type: 'primary', text: 'game on', handler: this.state._onclickcb}
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
               <div className="row">
                   <div className="col-lg-12">
                       <div class="form-group">
                           <div className="panel-body">
                               <div className="form-group input-group">
                                   <input className="form-control" ref="player1" placeholder="Player 1"></input>
                               </div>
                               <div className="form-group input-group">
                                   <input className="form-control" ref="player2" placeholder="Player 2"></input>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
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
    this.setState({_onclickcb:this._queueGame,_modalHeader:'Start a new game'})
    this.refs.gamemodal.show();
  }
, _onQueueGameClick: function () {
    this.setState({_onclickcb:this._submitGame,_modalHeader:'Queue a game'})
    this.refs.gamemodal.show();
  }
})
