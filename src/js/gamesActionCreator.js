/**
 * Created by OBrien on 5/12/2015.
 */

function s4() {
    return (((1+Math.random())*0x10000|0).toString(16).substring(1));
}
function game_guid() {
    return 'game-' + (s4()+s4()+s4()+s4()).toLowerCase();
}

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
        if (!game.player1Score) { game.player1Score = 0; }
        if (!game.player2Score) { game.player2Score = 0; }
        if (!game.id) { game.id = game_guid(); }
        pusher.publish('game:started', game);
        dispatcher.dispatch({
            type: constants.GAME_STARTED,
            data: game
        });
    },
    queueGame: function(game){
        if (!game.player1Score) { game.player1Score = 0; }
        if (!game.player2Score) { game.player2Score = 0; }
        if (!game.id) { game.id = game_guid(); }
        pusher.publish('game:queued', game);
        dispatcher.dispatch({
            type: constants.GAME_QUEUED,
            data: game
        });
    }
};

pusher.subscribe('client-game:ended', function(data) {
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

pusher.subscribe('client-game:queued', function(data) {
    dispatcher.dispatch({
        type: constants.GAME_QUEUED,
        data: data
    });
});

pusher.subscribe('client-game:goalscored', function(data) {
    dispatcher.dispatch({
        type: constants.GOAL_SCORED,
        data: data
    });
});

module.exports = actionCreator;