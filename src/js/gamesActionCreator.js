/**
 * Created by OBrien on 5/12/2015.
 */

var eventEmitter = require('events').EventEmitter,
    constants = require('./NotificationConstants'),
    dispatcher = require('./FoosballDispatcher');

var actionCreator = {
    loadGames: function () {
        $.ajax('/games/recent').then(function (data) {
            dispatcher.dispatch({
                type: constants.GAMES_UPDATED,
                data: JSON.parse(data)
            });
        });
    },
    loadQueue: function () {
        $.ajax('/games/queue').then(function (data) {
            dispatcher.dispatch({
                type: constants.QUEUE_UPDATED,
                data: JSON.parse(data)
            });
        });
    }
};

module.exports = actionCreator;