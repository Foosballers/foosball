var React = require('react'),
    HeaderItem = require('./gameHeaderItem.jsx'),
    Modalizer = require('./modal-izer.jsx'),
    GoalGraph = require('./goalGraph.jsx'),
    gameStore = require('./gamestore.js');

var DashboardHeader = React.createClass({
    _closeModal: function () {
        this.refs.lastGameModal.hide();
    }
  , _openModal: function () {
        var that = this;
        return function() {
            that.refs.lastGameModal.show();
        }
    }
  , getInitialState: function () {
        return {games: gameStore.getGames(), queue: gameStore.getQueue()}
    },
    _onChange: function(){
        this.setState({games: gameStore.getGames(), queue: gameStore.getQueue()});
    },
    componentDidMount: function(){
        gameStore.addChangeListener(this._onChange);
    },
    render: function () {
        var last_game = this.state.games[0];
        return <span>
                    <HeaderItem name="Current Game" game={gameStore.getCurrentGame()}/>
                    <HeaderItem name="Last Game" game={this.state.games[0]} clickable={this._openModal()} />
                    <HeaderItem name="Up Next" game={this.state.queue[0]}/>
                    <Modalizer ref="lastGameModal"
                        show={false}
                        header="- game chart -"
                        buttons={[{type:'danger',text:'close',handler:this._closeModal}]}>
                        <GoalGraph gameId={last_game ? last_game.id : null} />
                    </Modalizer>
                </span>; }
});

module.exports = DashboardHeader;