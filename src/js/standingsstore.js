/**
 * Created by OBrien on 5/11/2015.
 */
var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    dispatcher = require('./FoosballDispatcher'),
    constants = require('./NotificationConstants'),
    actionCreator = require('./StandingsActionCreator');

var CHANGE_EVENT = 'change';

var standings;

function getWinPct(wins, losses) {
    return wins / (wins + losses);
}

function getStandings() {
    if (standings) {
        return standings.sort(function (a, b) {
            var diff = getWinPct(a.wins, a.losses) - getWinPct(a.wins, b.losses);
            return diff * -1;
        });
    } else {
        actionCreator.loadStandings();
        return [];
    }
}

var StandingsStore = assign({}, EventEmitter.prototype, {
    getStandings: getStandings,
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    }
});

dispatcher.register(function (action) {
    switch (action.type) {
        case constants.STANDINGS_UPDATED:
            standings = action.data;
            StandingsStore.emitChange();
    }
})

module.exports = StandingsStore;