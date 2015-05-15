/**
 * Created by OBrien on 5/12/2015.
 */

var eventEmitter = require('events').EventEmitter,
    constants = require('./NotificationConstants'),
    dispatcher = require('./FoosballDispatcher'),
    pusher = require('./pusherConnection');

var actionCreator = {
    loadGames: function() {
        $.ajax('/games/recent').then(function(data) {
            dispatcher.dispatch({
                type: constants.GAMES_UPDATED,
                data: data
            });
        });
    },
    loadQueue: function() {
        $.ajax('/games/queue').then(function(data) {
            dispatcher.dispatch({
                type: constants.QUEUE_UPDATED,
                data: data
            });
        });
    },
    startGame: function(game) {
        if (!game.player1Score) {
            game.player1Score = 0;
        }

        if (!game.player2Score) {
            game.player2Score = 0;
        }

        pusher.publish('game:started', game);
        dispatcher.dispatch({
            type: constants.GAME_STARTED,
            data: game
        });
    }
};

pusher.subscribe('game:ended', function(data) {
    dispatcher.dispatch({
        type: constants.GAME_ENDED,
        data: data
    });
});

pusher.subscribe('client-game:started', function(data) {
    dispatcher.dispatch({
        type: constants.GAME_STARTED,
        data: data
    });
});

pusher.subscribe('game:queued', function(data) {
    dispatcher.dispatch({
        type: constants.GAME_QUEUED,
        data: data
    });
});

pusher.subscribe('game:goalscored', function(data) {
    dispatcher.dispatch({
        type: constants.GOAL_SCORED,
        data: data
    });
});

module.exports = actionCreator;