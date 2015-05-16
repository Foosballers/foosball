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
    }
};

pusherConnection.subscribe('standings', function (data) {
    dispatcher.dispatch({
        type: constants.STANDINGS_UPDATED,
        data: data
    })
});

module.exports = actionCreator;