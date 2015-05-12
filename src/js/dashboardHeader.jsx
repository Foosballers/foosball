var React = require('react'),
    HeaderItem = require('./gameHeaderItem.jsx'),
    gameStore = require('./gamestore.js');

var DashboardHeader = React.createClass({
    render: function () {
        return <span>
                    <HeaderItem name="Current Game" game={gameStore.getCurrentGame()}/>
                    <HeaderItem name="Last Game" game={gameStore.getGames()[0]}/>
                    <HeaderItem name="Up Next" game={gameStore.getQueue()[0]}/>
                </span>;
    }
});

module.exports = DashboardHeader;