var eventEmitter = require('events').EventEmitter,
    constants = require('./NotificationConstants'),
    pusherConnection = require('./pusherConnection'),
    dispatcher = require('./FoosballDispatcher');

var actionCreator = {
    loadStandings: function () {
        $.ajax('/players/standings').then(function (data) {
            dispatcher.dispatch({
                type: constants.STANDINGS_UPDATED,
                data: data
            });
        });
    },
    loadGoals: function(gameId) {
        $.ajax('/goals/' + gameId).then(function (data) {
            dispatcher.dispatch({
                type: constants.GAME_GOALS_LOADED,
                data: data
            });
        });
    }
};

pusherConnection.subscribe('standings', function (data) {
    dispatcher.dispatch({
        type: constants.STANDINGS_UPDATED,
        data: data
    })
});

module.exports = actionCreator;