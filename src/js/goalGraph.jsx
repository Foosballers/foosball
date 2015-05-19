var React = require('react'),
    goalStore = require('./goalstore');
    Highchart = require('react-highcharts');

Highcharts.setOptions({ colors: ['#337ab7', '#434348'] });
//Highcharts.setOptions({ colors: ['#434348', '#337ab7'] });
var defaultChart = {
    chart: { type: 'areaspline' },
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
                        '</b> scored!<br/>' + val[0] + ' / 10<br/>';
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
    series: [{name: 'awaiting server...', data: [1,1,1]}]
}

function pad2(n) {
    return n < 10 ? '0' + n : n.toString()
}

function formatTime(seconds) {
    return seconds == null ?
        "00:00" :
        pad2(Math.floor(this.value / 60)) + ":" + pad2(this.value % 60);
}

function seriesify(goalview) {
    var p1cnt = 0, p2cnt = 0;
    var p1goals = [[0,p1cnt++]], p2goals = [[0,p2cnt++]];
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
        p1goals[gcnt_m1] = [p2goals[gcnt_m1][0], p1cnt -1];
    } else {
        p2goals[gcnt_m1] = [p1goals[gcnt_m1][0], p2cnt -1];
    }
    return [{name: goalview.players['p1'], data: p1goals},
            {name: goalview.players['p2'], data: p2goals}];
}

module.exports = React.createClass({
    displayName: 'FoosGoalChart',
    getInitialState: function(){
        return { chartData: defaultChart };
    },
    componentDidMount: function(){
        goalStore.addChangeListener(this._onChange);
        goalStore.getGoals(this.props.gameId)
    },
    render: function () {
        return <div id="me"><Highchart config={this.state.chartData}></Highchart></div>
    },
    _onChange: function() {
        var series = seriesify(goalStore.getGoals("game1"));
        var cdata = this.state.chartData;
        cdata.series = series;
        this.setState({chartData: cdata});
    }
});
