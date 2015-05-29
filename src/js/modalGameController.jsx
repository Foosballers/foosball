var React = require('react'),
    modalstore = require('./modal-graph-store'),
    ModalGameDisplay = require('./modalGameDisplay.jsx');

module.exports = React.createClass({
    displayName: 'ModalGameController',
    getInitialState: function() {
        return {
            shown:false,
            game:{id:null,player1:'',player2:''}
        };
    },
    componentDidMount: function(){
        modalstore.addChangeListener(this._onChange);
    },
    render: function () {
        return <ModalGameDisplay ref="modal" shown={this.state.shown} game={this.state.game} />
    },
    _onChange: function() {
        var game = modalstore.getModalGame();
        this.setState({shown:true,game:game});
        this.refs.modal.show();
    },
});
