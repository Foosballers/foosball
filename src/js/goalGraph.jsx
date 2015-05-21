var React = require('react'),
    goalstore = require('./goalstore');
    Highchart = require('react-highcharts');

Highcharts.setOptions({ colors: ['#337ab7', '#434348'] });

function chartify(seriesData) {
    return {
        chart: { type: 'areaspline' },
        credits: false,
        title: { text: 'goals' },
        tooltip: {
            shared: true,
            formatter: function () {
                var vals = []
                $.each(this.points, function() { vals.push([this.y,this.series.name,this.series.color]); });
                var winnerIdx = $.inArray(10, vals.map(function(obj){return obj[0];}));
                if(winnerIdx !== -1) {
                    return '<span style="color:' + vals[winnerIdx][2] +
                        '">\u25CF</span><b> ' + vals[winnerIdx][1] +
                        '</b> won!<br/>';
                }
                if(vals[0][0] === 0) { return 'game started<br/>'; }
                var response = '';
                vals.forEach(function(val){
                    response += '<span style="color:' + val[2] +
                            '">\u25CF</span><b> ' + val[1] +
                            '</b> scored #' + val[0] + '!<br/>';
                });
                return response;
            }
        },
        yAxis: {
            min: 0, max: 10, tickInterval: 2,
            labels: { enabled: false },
            title: { text: 'score' }
        },
        xAxis: {
            labels: { formatter: function() {
                return pad2(Math.floor(this.value / 60)) + ":" + pad2(this.value % 60);
                }
            }
        },
        plotOptions: {
            areaspline: { 
                pointStart: 0,
                fillOpacity: 0.5,
                marker: {
                    enabled: true,
                    symbol: 'circle',
                    radius: 5,
                    status: { hover: { enabled: true } }
                },
            },
            series: {
                connectNulls: true,
                events: { legendItemClick: function(e) { return false; } }
            },
        },
        series: seriesData
    };
}
function pad2(n) {
    return n < 10 ? '0' + n : n.toString()
}

var defaultChart = chartify([{name: 'awaiting server...', data: [1,1,1]}]);
var defaultSeries = [{name: 'awaiting server...', data: [1,1,1]}];

function seriesify(goalview) {
    if(!(goalview && goalview.goals.length > 0)) return [{name: 'awaiting server...', data: [1,1,1]}];
    var p1cnt = 0, p2cnt = 0;
    var p1goals = [{y: p1cnt++, marker: { enabled: false } }],
        p2goals = [{y: p2cnt++, marker: { enabled: false } }];
    goalview.goals.forEach(function(goal){
        if(goal[1] === 'p1') {
            p1goals.push([goal[0], p1cnt++]);
            p2goals.push(null);
        } else {
            p2goals.push([goal[0], p2cnt++]);
            p1goals.push(null);
        }
    });
    var gcnt_m1 = p1goals.length - 1;
    if(p1goals[gcnt_m1]===null){
        p1goals[gcnt_m1] = {
            x: p2goals[gcnt_m1][0],
            y: p1cnt-1,
            marker: { enabled: false, states: { hover: { enabled: false } } }
        };
    } else {
        p2goals[gcnt_m1] = {
            x: p1goals[gcnt_m1][0],
            y: p2cnt-1,
            marker: { enabled: false, states: { hover: { enabled: false } } }
        };
    }
    return [{name: goalview.players['p1'], data: p1goals},
            {name: goalview.players['p2'], data: p2goals}];
}

function randomData() {
    var rand = [];
    for(var i = 0; i < 10; i++) {
        rand.push(Math.floor(Math.random() * 11));
    }
    return [{name: 'rand', data: rand}];
}

module.exports = React.createClass({
    displayName: 'FoosGoalChart',
    componentDidMount: function(){
        goalstore.addChangeListener(this._onChange);
        if(this.props.gameId) {
            goalstore.getGoals(this.props.gameId);
        }
    },
    render: function () {
        var chart = defaultChart;
        var newData = goalstore.getGoals(this.props.gameId);
        return <Highchart config={chartify(seriesify(newData) || randomData())}></Highchart>
    },
    _onChange: function() {
        console.log('render triggered');
        this.setState({});
    }
});
