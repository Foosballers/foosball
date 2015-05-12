/**
 * Created by OBrien on 5/12/2015.
 */

var eventEmitter = require('events').EventEmitter,
    constants = require('./NotificationConstants'),
    dispatcher = require('./FoosballDispatcher');

var actionCreator = {
    loadGames: function () {
        window.setTimeout(function () {
            dispatcher.dispatch({
                type: constants.GAMES_UPDATED,
                data: [
                    {
                        id: Date.now(),
                        player1: 'Kavin',
                        player2: 'Keith',
                        player1Score: '0',
                        player2Score: '10'
                    }, {
                        id: Date.now() + 5,
                        player1: 'Keith',
                        player2: 'Kavin',
                        player1Score: '10',
                        player2Score: '1'
                    }
                ]
            })
        }, 1000);
    },
    loadQueue: function () {
        dispatcher.dispatch({
            type: constants.QUEUE_UPDATED,
            data: [{
                id: Date.now() + 50,
                player1: 'Boguste',
                player2: 'Dimitri'
            },
                {
                    id: Date.now() + 50,
                    player1: 'Boguste',
                    player2: 'Keith'
                }]
        })
    }
    };

module.exports = actionCreator;
