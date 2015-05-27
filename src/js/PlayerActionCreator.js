/**
 * Created by OBrien on 5/27/2015.
 */

var eventEmitter = require('events').EventEmitter,
    constants = require('./NotificationConstants'),
    dispatcher = require('./FoosballDispatcher');


var actionCreator = {
    loadPlayers: function() {
        $.ajax('/players').then(function(data) {
            dispatcher.dispatch({
                type: constants.PLAYERS_LOADED,
                data: data
            });
        });
    }
};

module.exports = actionCreator;