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
, _startGame: function(){
    console.log(this.refs.player1.getDOMNode().value);
    console.log(this.refs.player2.getDOMNode().value);
    gameActions.queueGame({player1: this.refs.player1.getDOMNode().value, player2: this.refs.player2.getDOMNode().value})
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
            onClick={this._onStartNextGameClick}>Start Next Game</button>&nbsp;&nbsp;
        <button type="button" className="btn btn-primary"
            onClick={this._onQueueGameClick}>Queue Game</button>
        <Modalizer ref="gamemodal"
            show={false}
            header="Start a game"
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
                               <div className="form-group input-group">
                                   <button type="button" className="btn btn-primary" onClick={this._startGame}>Submit</button>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
          </div>
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
