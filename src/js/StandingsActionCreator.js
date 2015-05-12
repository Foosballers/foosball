var eventEmitter = require('events').EventEmitter,
    constants = require('./NotificationConstants'),
    dispatcher = require('./FoosballDispatcher');

var actionCreator = {
    loadStandings: function () {
        window.setTimeout(function () {
            dispatcher.dispatch({
                type: constants.STANDINGS_UPDATED,
                data: [
                    {player: 'Keith', wins: 200, losses: 4}, {player: 'Kavin', wins: 145, losses: 70},
                    {player: 'Max', wins: 135, losses: 60}
                ]
            });
        }, 1000);
    }
};

module.exports = actionCreator;