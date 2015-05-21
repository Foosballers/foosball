/**
 * Created by OBrien on 5/11/2015.
 */
var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    dispatcher = require('./FoosballDispatcher'),
    constants = require('./NotificationConstants'),
    actionCreator = require('./StandingsActionCreator');

var CHANGE_EVENT = 'change';

/* {
 *    players: {p1: 'name', p2: 'name'},
 *    goals: [[12,'p1'],[14,'p2']....] //sorted by time since start of game
}*/
var goals = { };

function goalView(raw_goals) {
    if(raw_goals == null || raw_goals.length < 1) { return null; }
    var x = 123;
    var players = (raw_goals.map(function(obj) { return obj.player; })).
        filter(function(item,i,ar){ return ar.indexOf(item) === i; });
    var player1 = players[0];
    var player2 = players[1];
    var goals_sorted = raw_goals.sort(function(a,b) {
        return a.epoch_date - b.epoch_date;
    });
    //-1 for debug because I don't have offset since first goal
    var minEpoch = goals_sorted[0].epoch_date - 1;
    return {
        players: {p1: player1, p2: player2},
        goals: goals_sorted.map(function(goal) {
            return [goal.epoch_date - minEpoch,
                    goal.player === player1 ? 'p1' : 'p2' ];
        })
    };
}

function getGoals(gameId) {
    if (goals[gameId]!==undefined) {
        return goals[gameId];
    } else {
        if(gameId) {
            actionCreator.loadGoals(gameId);
        }
    }
    return null;
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
            goals[action.data.id] = goalView(action.data.data) || null;
            goalStore.emitChange();
    }
})

module.exports = goalStore;