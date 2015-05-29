var React = require('react'),
    gameActions = require('./gamesActionCreator'),
    GoalGraph = require('./goalGraph.jsx'),
    Modalizer = require('./modal-izer.jsx');

module.exports = React.createClass({
    displayName: 'ModalGameDisplayer',
    propTypes: {
        shown: React.PropTypes.bool.isRequired,
        game: React.PropTypes.object.isRequired
    },
    render: function () {
        return <div>
            <Modalizer ref="game_modal"
                show={this.props.shown}
                handleShown={this._showGraph}
                handleHidden={this._closeGraph}
                header={this.props.game.player1 + " - vs - " + this.props.game.player2}
                buttons={[
                    {type:'primary',text:'rematch',handler:this._openRematch},
                    {type:'danger',text:'close',handler:this._closeModal}]}>
                <GoalGraph ref="rec_g_graph" gameId={this.props.game.id} />
            </Modalizer>
            <Modalizer ref="rematch_modal"
                show={false}
                small={true}
                header="rematch!"
                handleHide={this._closeModal}
                buttons={[
                    {type:'danger',text:'close',handler:this._closeRematch}]}>
                <button type="button" className="btn btn-primary btn-block" onClick={this._rematch_swap_sides} >
                    <i className="fa fa-exchange"></i>&nbsp; swap sides
                </button>
                <button type="button" className="btn btn-primary btn-block" onClick={this._rematch_same_sides} >
                    <i className="fa fa-circle-o"></i>&nbsp; same sides
                </button>
            </Modalizer>
        </div>
    }
    , _showGraph: function() { this.refs.rec_g_graph._show(); }
    , _closeGraph: function() { this.refs.rec_g_graph._hide(); }
    , _closeModal: function () { this.refs.game_modal.hide(); }
    , show: function () { this.refs.game_modal.show(); }
    , _closeRematch: function() { this.refs.rematch_modal.hide(); }
    , _openRematch: function() { this.refs.rematch_modal.show(); }
    , _rematch_same_sides: function() {
        gameActions.startGame({
            player1: this.props.game.player1,
            player2: this.props.game.player2 });
        this.refs.rematch_modal.hide();
    }
    , _rematch_swap_sides: function() {
        gameActions.startGame({
            player1: this.props.game.player2,
            player2: this.props.game.player1 });
        this.refs.rematch_modal.hide();
    }
});
