var React = require('react')
    standingsStore = require('./standingsstore');

var standingsTable = React.createClass({
    getInitialState: function(){
        return {standings: standingsStore.getStandings()};
    },
    componentDidMount: function(){
      standingsStore.addChangeListener(this._onChange);
    },
    render: function () {
        var rows = this.state.standings.map(function(row){
            return <tr>
                      <td>{row.player}</td>
                      <td>{row.wins}</td>
                      <td>{row.losses}</td>
                      <td>{(row.wins / (row.wins + row.losses)).toString().substr(0,5)}</td>
                   </tr>
        });
        return <table className='table table-bordered table-striped'>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Winning Percentage</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    },
    _onChange: function(){
        this.setState({standings: standingsStore.getStandings()});
    }
});

module.exports = standingsTable;