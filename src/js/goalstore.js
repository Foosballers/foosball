/**
 * Created by OBrien on 5/11/2015.
 */
var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    dispatcher = require('./FoosballDispatcher'),
    constants = require('./NotificationConstants'),
    actionCreator = require('./StandingsActionCreator');

var CHANGE_EVENT = 'change';

var goals;

function nonNullLen(data) {
    return data.filter(function(datum) { return datum !== null; }).length;
}
function getGoals(gameId) {
    if (goals) {
        var sorted = goals.sort(function(a,b) {
            return a.epoch_date - b.epoch_date;
        });
        var minEpoch = sorted[0].epoch_date - 1;
        var playerSet = { }
        sorted.forEach(function(goal){ playerSet[goal.player]=[]; })
        var players = Object.keys(playerSet)
        var p1goals = [[0,0]]
        var p2goals = [[0,0]]
        for(var i = 0; i < sorted.length; i++) {
            var player = sorted[i].player
            if(player === players[0]){
                p1goals.push([sorted[i].epoch_date - minEpoch, nonNullLen(p1goals)]);
                p2goals.push(null);
            } else {
                p2goals.push([sorted[i].epoch_date - minEpoch, nonNullLen(p2goals)]);
                p1goals.push(null);
            }
        }
        var lastElm = p1goals.length - 1;
        if(p1goals[lastElm]===null) {
            p1goals[lastElm] = [p2goals[lastElm][0], Math.max.apply(Math, p1goals.map(function(elm){return elm === null ? -1 : elm[1]}))];
        } else {
            p2goals[lastElm] = [p1goals[lastElm][0], Math.max.apply(Math, p2goals.map(function(elm){return elm === null ? -1 : elm[1]}))];
        }
        var series = [{name: players[0], data: p1goals}, {name: players[1], data: p2goals}];
        console.log(series)
        return series;
    } else {
        actionCreator.loadGoals(gameId);
        return [];
    }
}

var goalStore = assign({}, EventEmitter.prototype, {
    getGoals: getGoals,
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    }
});

dispatcher.register(function (action) {
    switch (action.type) {
        case constants.GAME_GOALS_LOADED:
            goals = action.data;
            goalStore.emitChange();
    }
})

module.exports = goalStore;