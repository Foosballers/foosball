var React = require('react'),
    goalStore = require('./goalstore');
    Highchart = require('react-highcharts');

module.exports = React.createClass({
    displayName: 'FoosGoalChart',
    getInitialState: function(){
        return { chartData: {
            chart: { type: 'area' },
            title: { text: 'Goals' },
            tooltip: { shared: true, valueSuffix: ' goals' },
            plotOptions: { area: {
                pointStart: 0,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    status: { hover: { enabled: true } }
                },
                series: { connectNulls: true }
            }},
            series: [{name: 'awaiting server...', data: [1,1,1]}]
        }};
    },
    componentDidMount: function(){
        goalStore.addChangeListener(this._onChange);
        goalStore.getGoals(this.props.gameId)
    },
    render: function () {
        return <div id="me"><Highchart config={this.state.chartData}></Highchart></div>
    },
    _graphIt: function(series) {
        var pad2 = function(n) {
            var n = (n || '').toString();
            return n.length >= 2 ? n : new Array(2 - n.length + 1).join('0') + n;
        };
        return {
            chart: { type: 'area' },
            title: { text: 'Goals' },
            yAxis: {
                min: 0, max: 10, tickInterval: 2,
                labels: { enabled: false },
                title: { text: 'goals' }
            },
            xAxis: {
                labels: { formatter: function() {
                    return pad2(Math.floor(this.value / 60)) + ":" + pad2(this.value % 60);
                    }
                }
            },
            tooltip: { shared: true, valueSuffix: ' goals' },
            plotOptions: {
                area: { 
                    pointStart: 0,
                    marker: {
                        enabled: true,
                        symbol: 'circle',
                        radius: 5,
                        status: { hover: { enabled: true } }
                    },
                },
                series: { connectNulls: true }
            },
            series: series
        };
    },
    _onChange: function() {
        this.setState({chartData: this._graphIt(goalStore.getGoals("game1"))});
    }
});
