/**
 * Created by OBrien on 5/12/2015.
 */

var eventEmitter = require('events').EventEmitter,
    constants = require('./NotificationConstants'),
    dispatcher = require('./FoosballDispatcher'),
    pusher = require('./pusherConnection');

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

pusher.subscribe('game:ended', function(data){
    dispatcher.dispatch({
       type: constants.GAME_ENDED,
        data: data
    });
});

pusher.subscribe('game:started', function(data){
    dispatcher.dispatch({
        type: constants.GAME_STARTED,
        data: data
    });
});

pusher.subscribe('game:goalscored', function(data){
    dispatcher.dispatch({
        type: constants.GOAL_SCORED,
        data: data
    });
});

module.exports = actionCreator;